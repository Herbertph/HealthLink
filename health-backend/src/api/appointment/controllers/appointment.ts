import { factories } from '@strapi/strapi';


export default factories.createCoreController('api::appointment.appointment', ({ strapi }) => ({
    async create(ctx) {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('You must be logged in to create an appointment.');
      }
  
      const { data } = ctx.request.body;

      const { nanoid } = await import('nanoid');
  
      const response = await strapi.entityService.create('api::appointment.appointment', {
        data: {
          ...data,
          users_permissions_user: user.id,
          documentIdd: data.documentIdd || nanoid(20) 
        },
      });
  
      return response;
    },

  async update(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in to update an appointment.');
    }
  
    const { id } = ctx.params;
    const { data } = ctx.request.body;
  
    const appointment = await strapi.entityService.findOne('api::appointment.appointment', id, {
      populate: ['users_permissions_user'],
    }) as any;
  
    if (!appointment) {
      return ctx.notFound('Appointment not found.');
    }
  
    if (appointment.users_permissions_user?.id !== user.id && user.role?.name !== 'Admin') {
      return ctx.unauthorized('You are not allowed to update this appointment.');
    }
  
    const updatedAppointment = await strapi.entityService.update('api::appointment.appointment', id, {
      data: {
        doctorName: data.doctorName,
        date: data.date,
        reason: data.reason,
      },
    });
  
    return { data: updatedAppointment };
  },

 
  async find(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in to view appointments.');
    }
  
    console.log('User ID from token:', user.id);
  
    // Admin pode ver tudo
    if (user.role?.name === 'Admin') {
      const data = await strapi.entityService.findMany('api::appointment.appointment', {
        populate: ['users_permissions_user'],
      });
      return { data };
    }
  
    // Usuário comum: só seus próprios
    const data = await strapi.entityService.findMany('api::appointment.appointment', {
      filters: {
        users_permissions_user: {
          id: user.id,
        },
      },
      populate: ['users_permissions_user'],
    });
  
    return { data };
  },

  async delete(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in to delete an appointment.');
    }
  
    const { id } = ctx.params;
  
    const appointment = await strapi.entityService.findOne('api::appointment.appointment', id, {
      populate: ['users_permissions_user'],
    }) as any;
  
    if (!appointment) {
      return ctx.notFound('Appointment not found.');
    }
  
    if (appointment.users_permissions_user?.id !== user.id && user.role?.name !== 'Admin') {
      return ctx.unauthorized('You are not allowed to delete this appointment.');
    }
  
    await strapi.entityService.delete('api::appointment.appointment', id);
  
    return ctx.send({ message: 'Appointment deleted successfully.' }, 200);
  }

  
}));

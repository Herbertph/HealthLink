import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::appointment.appointment', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in to create an appointment.');
    }

    const { data } = ctx.request.body;

    const response = await strapi.entityService.create('api::appointment.appointment', {
      data: {
        ...data,
        user: user.id,
      },
    });

    return response;
  }
}));

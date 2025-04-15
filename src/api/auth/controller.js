const authService = require('../../services/auth/auth.service')

module.exports = {
  /**
   * @openapi
   * /api/auth/login:
   *  post:
   *    tags: [Authentication Endpoints]
   *    description: Login user
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              email:
   *                type: string
   *              password:
   *                type: string
   *    responses:
   *      200:
   *        description: Login successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/loginResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  login: async (req, res, next) => {
    try {
      return next(await authService.login({ ...req.body }));
    } catch (error) { return next({ error }); }
  },
  /**
   * @openapi
   * /api/auth/register:
   *  post:
   *    tags: [Authentication Endpoints]
   *    description: Register user
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/register'
   *    responses:
   *      200:
   *        description: Login successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/loginResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  register: async (req, res, next) => {
    try {
      return next(await authService.registerUser({ ...req.body }));
    } catch (error) { return next({ error }); }
  },
};
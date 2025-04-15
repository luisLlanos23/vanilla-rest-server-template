const usersService = require('../../services/users/auth.service')

module.exports = {
  /**
   * @openapi
   * /api/users:
   *  get:
   *    tags: [Users Endpoints]
   *    description: Get all users
   *    responses:
   *      200:
   *        description: Get all users successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/getAllUsersResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  getAll: async (req, res, next) => {
    try {
      return next(await usersService.findAllUsers());
    } catch (error) {
      return next({ error });
    }
  },
  /**
   * @openapi
   * /api/users/{id}:
   *  get:
   *    tags: [Users Endpoints]
   *    description: Get user by id
   *    parameters:
   *     - in: path
   *       name: id
   *       required: true
   *       description: The user id
   *    responses:
   *      200:
   *        description: Get user by id successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/getUserResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  getById: async (req, res, next) => {
    try {
      return next(await usersService.findUserById(Number(req.params.id)));
    } catch (error) {
      return next({ error });
    }
  },
  /**
   * @openapi
   * /api/users/{id}:
   *  put:
   *    tags: [Users Endpoints]
   *    description: Update user by id
   *    parameters:
   *      - in path:
   *        name: id
   *        required: true
   *        description: The user id
   *        type: integer
   *    requestBody:
   *     content:
   *       application/json:
   *        schema:
   *         $ref: '#/components/schemas/updateUserRequest'
   *    responses:
   *      200:
   *        description: Update user successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/operationSuccessResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  updateUser: async (req, res, next) => {
    try {
      return next(await usersService.updateUser(Number(req.params.id), req.body));
    } catch (error) {
      return next({ error });
    }
  },
  /**
   * @openapi
   * /api/users/{id}:
   *  delete:
   *    tags: [Users Endpoints]
   *    description: Delete user by id
   *    parameters:
   *      - in path:
   *        name: id
   *        required: true
   *        description: The user id
   *        type: integer
   *    responses:
   *      200:
   *        description: Deleted user successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/operationSuccessResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  deleteUser: async (req, res, next) => {
    try {
      return next(await usersService.deleteUser(Number(req.params.id), req.user));
    } catch (error) {
      return next({ error });
    }
  },
  /**
   * @openapi
   * /api/users/{id}:
   *  patch:
   *    tags: [Users Endpoints]
   *    description: Enable user by id
   *    parameters:
   *      - in path:
   *        name: id
   *        required: true
   *        description: The user id
   *        type: integer
   *    responses:
   *      200:
   *        description: Enable user successful
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/operationSuccessResponse'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  enableUser: async (req, res, next) => {
    try {
      return next(await usersService.enableUser(Number(req.params.id), req.user));
    } catch (error) {
      return next({ error });
    }
  }
}
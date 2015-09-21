/**
 * @api {post} /v1/auth/login Log a user in
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiExample Example usage:
 *    POST /v1/auth/login
 *    {
 *      "email": "email@email.com",
 *      "password": "password"
 *    }
 *
 * @apiSuccess {Boolean} success When the request is successful.
 * @apiSuccess {Object} user The user object.
 * @apiSuccess {String} user.id The user's unique id.
 * @apiSuccess {String} user.email The user's email.
 * @apiSuccess {String} user.role The user's role.
 * @apiSuccess {Date} user.createdAt The date the user was created.
 * @apiSuccess {Date} user.updatedAt The date the user was updated.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true,
 *      "user": {
 *        "id": "the-unique-id",
 *        "email": "example@email.com",
 *        "role": "user",
 *        "createdAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),
 *        "updatedAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)
 *      }
 *    }
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "success": false,
 *      "error": "Incorrect Credentials"
 *    }
 *
 *   HTTP/1.1 200 OK
 *    {
 *      "success": false,
 *      "error": "Max Attempts"
 *    }
 */

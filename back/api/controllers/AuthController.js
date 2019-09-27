/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  login: async function(req, res) {

    if(req.query.email && req.query.password) {
      const user = await sails.models.user.findOne({
        email: req.query.email
      });

      if(user) {

        const userDecrypt = await sails.models.user.findOne({
          email: req.query.email
        }).decrypt();

        if(req.query.password === userDecrypt.password || req.query.password === user.password) {
          return res.json(user);
        } else {
          return res.forbidden();
        }

      } else {
        res.notFound();
      }
    } else {
      return res.badRequest();
    }
  },

};

/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  randomUser: async function(req, res) {
    if(req.query.id) {
      const user = await sails.models.user.findOne({
        id: req.query.id
      });

      const a = {
        matches: [ 3, 4 ],
        skip   : [ 6, 7 ]
      };

      var updatedUsers = await sails.models.user.update({ id: req.query.id })
      .set({ ids: a })
      .fetch();

      sails.log(`Updated all ${updatedUsers.length} user${updatedUsers.length===1?'':'s'} named "Finn" to have the name "Jake".  Here they are now:`);
      sails.log(updatedUsers);


      await sails.models.user.update({ id: req.query.id })
      .set({ ids: a });

      const notMatched = await sails.models.user.findOne({
        id: req.query.id
      });

      return res.ok();
    } else {
      return res.badRequest();
    }
  },

};


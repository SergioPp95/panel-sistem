const db = require('../../database/models')

const controller = {

   async list (req, res) {

      try {

         let users = await db.User.findAll({
            attributes: ['id', 'mail', 'name', 'last_name', 'picture']
         })
         users = users.map(user => {
            return {
               detail: `http://127.0.0.1:3000/api/users/${user.dataValues.id}`,
               ...user.dataValues
            }
         })

         res.status(200).json({
            count: users.length,
            users
         })

      } catch(err) {
         console.error(err)
         res.status(500).json({
            status: 500,
            description: 'server error'
         })
      }

   },
}

module.exports = controller
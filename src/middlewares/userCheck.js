const middleware = {
    forUsers: (req, res, next) => {
       
       console.log(req.session)
       if(req.session.userLogged) {
          next()
       } else {
          
          res.redirect("/")
       }
    },
    forGuests: (req, res, next) => {

       console.log(req.session.userLogged)
       if(!req.session.userLogged) {
         
          next()
       } else {

          res.redirect("/profile")
       }
    }
 }
 
 module.exports = middleware
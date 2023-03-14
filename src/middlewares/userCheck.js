const middleware = {
    forUsers: (req, res, next) => {
       // Pregunta si el usuario está en sesión
       if(req.session.cookieLog) {
          // Si está logeado se sigue con el siguiente middleware o controlador
          next()
       } else {
          // Si no está logeado se redirige a login
          res.redirect("/")
       }
    },
    forGuests: (req, res, next) => {
       // Pregunta si el usuario no está en sesión
       if(!req.session.cookieLog) {
          // Si no está logeado se sigue con el siguiente middleware o controlador
          next()
       } else {
          // Si está logeado se redirige a profile
          res.redirect("/profile")
       }
    }
 }
 
 module.exports = middleware
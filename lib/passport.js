const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

// 1ère manière (en utilisant les promises => async/await )

// passport.use(
//   new BearerStrategy(async (token, done) => {
//     const tokenData = await jwt.verify(token, process.env.SECRET_KEY);
//     const user = await User.findOne({ _id: tokenData.userId });
//     if (!user) {
//       return done(null, false);
//     } else {
//       return done(null, user);
//     }
//   })
// );

// 2ème manière ( en utilisant les callback functions)
// méthode utilisé dans la documentation : https://www.npmjs.com/package/passport-http-bearer
passport.use(
  new BearerStrategy(async (token, done) => {
      try{
          const decodedData = await jwt.verify(token, process.env.SECRET_KEY);
          console.log(decodedData);
          const user= await User.findOne({ _id: decodedData.userId });
          console.log(user)
          if (!user) {
            return done(null, false);
          }
          return done(null, user, { scope: "all" });
      }
      catch(error){
        console.log(error);
        return done(null, false);

      }
  })
);

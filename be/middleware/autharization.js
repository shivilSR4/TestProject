const jwt = require('jsonwebtoken')



const userAuth = (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, process.env.JWT_PASSWORD, (err, decodedToken) => {
      if (decodedToken) {
        console.log(decodedToken);
        req.userId = decodedToken._id;
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized user' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};






const adminAuth = (req, res, next) => {
    try {
      const token = req.headers['authorization'].split(' ')[1];
      jwt.verify(token, process.env.JWT_PASSWORD, (err, decodedToken) => {
        if (decodedToken && decodedToken._doc.role===1) {
          req.userId = decodedToken._doc._id;
          next();
        } else {
          res.status(401).json({ message: 'Unauthorized user' });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports={userAuth,adminAuth}
/*const crypto = require('crypto');
console.log(crypto.randomBytes(64).toString('hex'));*/

const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "No token,  authorization denied" });
  }

  try{
  const token = authToken.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = decoded.id;

  next();
  } catch(err) {
    if(err.name === "TokenExpiredError"){
      return res.status(401).json({
        message:'Token is expired'
      })
    }
    return res.status(401).json({
      success:false,
      message:'Invalid Token'
    })
  }
};

module.exports = {
  authenticate,
};


const jwt = require("jsonwebtoken");
const JWT_SECRET = "fitplanhub_secret_key";

module.exports = (request, response, next) => {
     const header = request.headers.authorization;
  if (!header) return response.status(401).json({ message:   
    "Unauthorized" });

  const token= header.split(" ")  [1];



  try {
    const decoded = jwt.verify(token,  JWT_SECRET);
              request.user = decoded;
    next();
  } 
  
  catch {
    
    response.status(401).json({ message:   "Invalid token" });
  }
};

const  verifyJWT = require("../utils/authorization")

async function verifyToken() {

  const token = req?.headers?.authorization?.replace("Bearer ", "")
  
  if(!token){
    throw new Error("Please Sign In")
  }

  try {
    
    const { success , decoded , error } = await verifyJWT(token)

    console.log(decoded)

    if (!success) {
      throw new Error(error || "Invalid or expired token");
    }

    req.adminId = decoded.id

    return decoded;

  } catch (error) {

    throw new Error(error.message || "An error occurred while verifying the token");

  }

}

module.exports = verifyToken
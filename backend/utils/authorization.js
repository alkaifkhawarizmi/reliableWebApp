import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateJWT = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { 
      expiresIn: '240h' 
    });
    return { success: true, token };
  } catch (error) {
    console.error("JWT Generation Error:", error.message);
    return { success: false, error: 'Token generation failed' };
  }
};

export const verifyJWT = async (token) => {  // Added token parameter
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return { success: true, decoded };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error("Expired Token:", error.message);
      return { success: false, error: 'Token expired' };
    }
    console.error("JWT Verification Error:", error.message);
    return { success: false, error: 'Invalid token' };
  }
};
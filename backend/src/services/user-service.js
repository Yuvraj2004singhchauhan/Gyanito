import  UserModel  from "../models/user-model.js";
import { compareHash, encryptPassword } from "../utils/password-hash.js";
import { generateToken } from "../utils/token.js";

export const register = async (userObject)=>{
    try{
        userObject.password = encryptPassword(userObject.password);
    const doc = await UserModel.create(userObject);
    if(doc && doc._id){
        return "User Register SuccessFully";
    }
}
catch(err){
    throw err;
}
}
export const login = async (userObject) => {
  try {
    const doc = await UserModel.findOne({ email: userObject.email }).exec();

    if (doc && doc.email) {
      if (compareHash(userObject.password, doc.password)) {
        const token = generateToken({ id: doc._id, email: doc.email, role: doc.role });
        return {
          success: true,
          message: "Welcome " + doc.name,
          role: doc.role,
          token,
          user: { id: doc._id, name: doc.name, email: doc.email, role: doc.role },
        };
      }
      return { success: false, message: "Invalid Email or Password" };
    }

    return { success: false, message: "Invalid Email or Password" };
  } catch (err) {
    throw new Error("Invalid User Credentials");
  }
}
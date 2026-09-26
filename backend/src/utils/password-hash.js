import bcrypt from 'bcrypt';

const SALT_ROUNDS = parseInt(process.env.SALT) || 10;

export const encryptPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, SALT_ROUNDS);
}
export const compareHash = (plainPassword, dbPassword)=>{
    return bcrypt.compareSync(plainPassword, dbPassword);
}
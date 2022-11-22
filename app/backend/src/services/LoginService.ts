// import * as jwt from 'jsonwebtoken';
// import * as bcrypt from 'bcryptjs';
// import ILogin from '../interfaces/Ilogin';
// import Users from '../database/models/UserModel';
// import HttpException from '../utils/HttpException';

// const { JWT_SECRET } = process.env;
// const secret = JWT_SECRET || 'jwt_secret';

// export default class LoginService {
//   private model = Users;
//   public async login(login: ILogin) {
//     const { email } = login;
//     const user = await this.model.findOne({ where: { email } });
//     if (!user) throw new HttpException(401, 'Incorrect email or password');
//     // verificar se o password que vem no body é o mesmo que o password do banco
//     const validatePassword = await bcrypt.compare(login.password, user?.password); // o que vem no body , o que está no banco
//     if (validatePassword === false) throw new HttpException(401, 'Incorrect email or password');
//     const token = this.generateToken(user);
//     return token;
//   }

//   public validateLogin = (token:string | undefined) => {
//     if (!token) throw new HttpException(404, 'token not found');
//     const validateToken = jwt.verify(token, secret);
//     return validateToken as jwt.JwtPayload;
//   };

//   private generateToken = (login:Users) => {
//     const payload = {
//       id: login.getDataValue('id'),
//       email: login.getDataValue('email'),
//       role: login.getDataValue('role'),
//     };
//     console.log('payload', payload);
//     return jwt.sign(payload, secret);
//   };
// }

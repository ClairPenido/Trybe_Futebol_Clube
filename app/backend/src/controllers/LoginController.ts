import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}
  public enterLogin = async (req:Request, res: Response) => {
    const user = await this.loginService.login(req.body);
    res.status(200).json({ token: user });
  };

  public validateLogin = async (req:Request, res: Response) => {
    const { authorization } = req.headers;
    const { role } = this.loginService.validateLogin(authorization);
    res.status(200).json({ role });
  };
}

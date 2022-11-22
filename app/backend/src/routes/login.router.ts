import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';
import loginValidation from '../middlewares/login.validation';

const loginRouter = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.post('/', loginValidation, loginController.enterLogin);
loginRouter.get('/validate', loginController.validateLogin);

export default loginRouter;

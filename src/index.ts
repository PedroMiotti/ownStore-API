import "express-async-errors";
import App from './infrastructure/server/App';
import BaseController from "./adapter/controllers/base/BaseController";

// Region controllers
import authController from "./adapter/controllers/auth/AuthController";
// End controllers

const controllers: BaseController[] = [authController];

const app = new App(controllers);

app.start();

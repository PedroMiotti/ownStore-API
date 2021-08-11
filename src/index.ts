import "express-async-errors";
import App from '@/infrastructure/server/App';
import BaseController from "@/adapter/controllers/base/BaseController";

// Region controllers
import authController from "@/adapter/controllers/auth/AuthController";
import adminController from "@/adapter/controllers/administrator/AdministratorController";
// End controllers

const controllers: BaseController[] = [authController, adminController];

const app = new App(controllers);

app.start();

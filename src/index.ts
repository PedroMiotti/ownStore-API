import "express-async-errors";
import App from '@/infrastructure/server/App';
import BaseController from "@/adapter/controllers/base/BaseController";

// Region controllers
import authController from "@/adapter/controllers/auth/AuthController";
import adminController from "@/adapter/controllers/administrator/AdministratorController";
import customerController from '@/adapter/controllers/customer/CustomerController';
import addressController from '@/adapter/controllers/address/AddressController'

const controllers: BaseController[] = [authController, adminController, customerController, addressController];

const app = new App(controllers);

app.start();

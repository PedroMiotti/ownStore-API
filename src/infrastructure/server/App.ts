import { Server, Application, BodyParser } from "./core/Modules";
import BaseController from "../../adapter/controllers/base/BaseController";
import * as helmet from "helmet";
import AppSettings from "@/application/shared/settings/AppSettings";
import HandlerErrorMiddleware from "../middleware/handleError";
import config from "../config";
import resources from "@/application/shared/locals";
import SqlPool from "../database/mysql/mysql-connection";
import Sql from "../database/mysql/sql";

export default class App {
    public app: Application;
  
    constructor(controllers: BaseController[]) {
      this.setup();
      this.app = Server();
      this.app.set("trust proxy", true);
      this.loadMiddleware();
      this.loadControllers(controllers);
      this.loadHandleError();
    }
  
    public loadMiddleware(): void {
      this.app.use(helmet());
      this.app.use(BodyParser());
    //   this.app.use(localizationMiddleware.handler);
    //   this.app.use(authorizationMiddleware.handler);
    }
  
    private loadControllers(controllers: BaseController[]): void {
      controllers.forEach((controller) => {
        this.app.use(AppSettings.ServerRoot, controller.router);
      });
    }
  
    private loadHandleError(): void {
      this.app.use(HandlerErrorMiddleware.handler);
    }
  
    private setup(): void {
      AppSettings.init(config);
      resources.setDefaultLanguage(AppSettings.DefaultLang);
    }
  
    public listen(): void {
      this.app.listen(config.server.Port, () => {
        console.log(
          `Server running on ${AppSettings.ServerHost}:${AppSettings.ServerPort}${AppSettings.ServerRoot}`,
        );
      });
    }
  
    private runServices(): void {
      SqlPool.pool.on("connection", (conn) => {
        console.log("Mysql connected ", conn)
      })


      this.listen();
    }
  
    public start(): void {
      this.runServices();
    }
  }
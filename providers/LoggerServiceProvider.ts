import { ApplicationContract } from "@ioc:Adonis/Core/Application";
import Logger from "../app/Services/LoggerService";
import AppProvider from "./AppProvider";

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = (await import('@ioc:Adonis/Lucid/Database')).default
|   const Event = (await import('@ioc:Adonis/Core/Event')).default
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class LoggerServiceProvider extends AppProvider {
  constructor(protected application: ApplicationContract) {
    super(application);
    this.application = application;
  }

  public register() {
    // Register your own bindings
    this.application.container.singleton("Logger", () => {
      return new Logger();
    });
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}

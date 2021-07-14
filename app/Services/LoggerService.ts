// import { info, LoggerContract } from "@ioc:Adonis/Core/Logger";
import Logger from "@ioc:Adonis/Core/Logger";

export default class LoggerService {
  public info(message: string, context: object = {}) {
    Logger.info(`${message} %o`, context);
  }
}

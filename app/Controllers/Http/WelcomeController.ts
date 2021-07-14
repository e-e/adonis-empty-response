import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class WelcomeController {
  public async index({ view }: HttpContextContract) {
    return await view.render("welcome");
  }
}

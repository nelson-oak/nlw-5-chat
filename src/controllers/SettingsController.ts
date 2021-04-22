import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { username, chat } = request.body;

    const settingsService = new SettingsService()
    
    try {
      const setting = await settingsService.create({ username, chat });
    
      return response.json(setting);
    } catch(err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }

  async findByUsername(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const settingsService = new SettingsService()
    
    const setting = await settingsService.findByUsername(username);

    return response.json(setting);
  }
  
  async update(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const { chat } = request.body;

    const settingsService = new SettingsService()

    await settingsService.update(username, chat);

    return response.status(204).send();
  }
}

export { SettingsController };
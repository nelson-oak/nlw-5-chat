import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { SettingsController } from './controllers/SettingsController';
import { SettingsRepository } from './repositories/SettingsRepository';

const settingsController = new SettingsController()

const routes = Router();

routes.post('/settings', settingsController.create);

export { routes };
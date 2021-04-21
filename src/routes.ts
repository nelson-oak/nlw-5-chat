import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { MessagesController } from './controllers/MessagesController';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';

const settingsController = new SettingsController()
const usersController = new UsersController()
const messagesController = new MessagesController()

const routes = Router();

routes.post('/settings', settingsController.create);
routes.post('/users', usersController.create);
routes.post('/messages', messagesController.create);
routes.get('/messages/:user_id', messagesController.showByUser);

export { routes };
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path'

import './database';
import { routes } from './routes';

const app = express();

// Criando protocolo HTTP
const http = createServer(app);

// Criando protocolo WS (Web Socket)
const io = new Server(http);

// Servir arquivos estáticos (HTML)
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// Renderizar tela
app.get('/pages/client', (request, response) => {
  return response.render('html/client.html');
})

app.use(express.json())

app.use(routes);

export { http, io };
import { http } from './http';
import './websocket/client';

// Trocar app.listen() por http.listen para iniciar o servidor
http.listen(3333, () => console.log('🚀️ Server is running on port 3333 🚀️'));
import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';
import { UsersService } from '../services/UsersService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', socket => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on('client_first_access', async params => {
    const socket_id = socket.id;

    let user_id = null;
    const { text, email } = params as IParams;

    const userExists = await usersService.findByEmail(email);

    if (!userExists) {
      const user = await usersService.create(email);

      user_id = user.id;

      await connectionsService.create({
        user_id,
        socket_id,
      });
    } else {
      user_id = userExists.id;

      const connection = await connectionsService.findByUserId(userExists.id);

      if (!connection) {
        await connectionsService.create({
          user_id,
          socket_id,
        });
      } else {
        connection.socket_id = socket_id;

        await connectionsService.create(connection);
      }
    }

    await messagesService.create({
      user_id,
      text,
    })
  })
});
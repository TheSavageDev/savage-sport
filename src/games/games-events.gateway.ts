import { Inject, Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Firestore } from 'firebase-admin/firestore';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class GamesEventsGateway implements OnGatewayConnection {
  private readonly logger = new Logger('GamesGateway');
  @WebSocketServer()
  server: Server;

  constructor(@Inject('FIRESTORE') private firestore: Firestore) {}

  async handleConnection(client: any) {
    // Listen for changes to game events
    const gameId = client.handshake.query.gameId;
    const eventsRef = this.firestore.collection(`games/${gameId}/events`);
    eventsRef.onSnapshot((snapshot) => {
      const events = snapshot.docs.map((doc) => doc.data());
      client.emit('eventsUpdated', events);
    });
  }
}

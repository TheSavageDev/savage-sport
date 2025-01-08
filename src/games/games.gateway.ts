import { Inject, Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Firestore } from 'firebase-admin/firestore';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger('GamesGateway');
  @WebSocketServer()
  server: Server;

  constructor(@Inject('FIRESTORE') private firestore: Firestore) {}

  async handleConnection(client: any) {
    this.logger.log(`Client connected: ${client.id}`);

    // Get gameId from query params (if provided)
    const gameId = client.handshake.query.gameId;

    if (gameId) {
      client.join(gameId); // Join a specific room for the game
      this.listenToGameUpdates(client, gameId);
    } else {
      this.listenToAllGames(client);
    }
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  private listenToAllGames(client: any) {
    const gamesRef = this.firestore.collection('games');
    gamesRef.onSnapshot((snapshot) => {
      const games = snapshot.docs.map((doc) => doc.data());
      client.emit('gamesUpdated', games); // Emit event with all games data
    });
  }

  private listenToGameUpdates(client: any, gameId: string) {
    const gameRef = this.firestore.collection('games').doc(gameId);

    // Join the room for the specific game
    client.join(gameId);

    gameRef.onSnapshot((doc) => {
      if (doc.exists) {
        this.server.to(gameId).emit('gameUpdated', doc.data()); // Emit only to the specific room
      } else {
        this.server.to(gameId).emit('gameDeleted', { gameId });
      }
    });
  }
}

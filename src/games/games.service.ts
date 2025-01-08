import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Firestore } from 'firebase-admin/firestore';
import { Game, GameStatus } from './entities/game.entity';

@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);
  constructor(@Inject('FIRESTORE') private firestore: Firestore) {}

  // Add a new game.
  async create(createGameDto: CreateGameDto): Promise<Game> {
    this.logger.log(`Creating game: ${JSON.stringify(createGameDto)}`);
    const gameRef = this.firestore.collection('games').doc();
    const game: Game = {
      ...createGameDto,
      id: gameRef.id,
      score: { homeTeamScore: 0, awayTeamScore: 0 },
      currentInning: 0,
      status: GameStatus.Scheduled,
      createdAt: new Date(),
    };
    return await gameRef
      .set(game)
      .then(() => {
        this.logger.log(`Game created with ID: ${gameRef.id}`);
        return game;
      })
      .catch((error) => {
        this.logger.error(`Error creating game: ${error}`);
        throw new HttpException(
          'Error creating game',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  // Get all games
  async getGames(): Promise<Game[]> {
    this.logger.log('Getting all games');
    const gamesSnapshot = await this.firestore.collection('games').get();
    if (gamesSnapshot.empty) {
      this.logger.warn('No games found');
      return [];
    }
    return gamesSnapshot.docs.map((doc) => doc.data() as Game);
  }

  // Get a specific game
  async getGameById(gameId: string): Promise<Game> {
    const gameDoc = await this.firestore.collection('games').doc(gameId).get();
    if (!gameDoc.exists) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }
    return gameDoc.data() as Game;
  }

  // Update a game
  async updateGame(
    gameId: string,
    updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    const gameRef = this.firestore.collection('games').doc(gameId);
    await gameRef.update({
      ...updateGameDto,
      updatedAt: new Date(),
    });
    const updatedDoc = await gameRef.get();
    return updatedDoc.data() as Game;
  }

  // Delete a game
  async deleteGame(gameId: string): Promise<void> {
    await this.firestore.collection('games').doc(gameId).delete();
  }
}

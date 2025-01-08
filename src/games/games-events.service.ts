import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { FieldValue, Firestore, Timestamp } from 'firebase-admin/firestore';
import { GameEvent } from './entities/game-event.entity';
import { CreateGameEventDto } from './dto/create-game-event.dto';

@Injectable()
export class GamesEventsService {
  private readonly logger = new Logger(GamesEventsService.name);
  constructor(@Inject('FIRESTORE') private firestore: Firestore) {}

  // Add a new event to a game
  async addEvent(
    gameId: string,
    createEventDto: CreateGameEventDto,
  ): Promise<GameEvent> {
    const eventRef = this.firestore.collection(`games/${gameId}/events`).doc();
    const event: GameEvent = {
      id: eventRef.id,
      ...createEventDto,
      timestamp: Timestamp.now(),
    };
    if (event.details?.rbi) {
      if (
        event.eventType !== 'hit' &&
        event.eventType !== 'error' &&
        event.eventType !== 'walk'
      ) {
        throw new HttpException(
          'RBI can only be set for hit, error, or walk events',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (event.details.rbi < 0) {
        throw new HttpException(
          'RBI must be a positive integer',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Update game score if RBI is set
      const gameRef = this.firestore.collection('games').doc(gameId);
      if (event.details.rbi > 0) {
        const score = (await gameRef.get()).data().score[event.teamId];
        if (score) {
          gameRef.update({
            [`score.${event.teamId}`]: FieldValue.increment(event.details.rbi),
          });
        } else {
          gameRef.update({
            [`score.${event.teamId}`]: event.details.rbi,
          });
        }
      }
    }
    await eventRef.set(event);
    this.logger.log(`Event added to game ${gameId}`);
    return event;
  }

  // Get all events for a game
  async getEvents(gameId: string): Promise<GameEvent[]> {
    const eventsSnapshot = await this.firestore
      .collection(`games/${gameId}/events`)
      .get();
    if (eventsSnapshot.empty) {
      this.logger.warn(`No events found for game ${gameId}`);
      throw new HttpException(
        `No events found for game ${gameId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return eventsSnapshot.docs.map((doc) => doc.data() as GameEvent);
  }
}

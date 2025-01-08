import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { GamesGateway } from './games.gateway';
import { GamesEventsGateway } from './games-events.gateway';
import { GamesEventsController } from './games-events.controller';
import { GamesEventsService } from './games-events.service';

@Module({
  controllers: [GamesController, GamesEventsController],
  providers: [
    GamesService,
    GamesGateway,
    GamesEventsGateway,
    GamesEventsService,
  ],
})
export class GamesModule {}

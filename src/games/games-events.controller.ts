import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateGameEventDto } from './dto/create-game-event.dto';
import { GamesEventsService } from './games-events.service';

@Controller({
  path: 'games',
  version: '1',
})
export class GamesEventsController {
  constructor(private readonly gamesService: GamesEventsService) {}

  @Post(':gameId/events')
  create(
    @Param('gameId') gameId: string,
    @Body() createGameEventDto: CreateGameEventDto,
  ) {
    return this.gamesService.addEvent(gameId, createGameEventDto);
  }

  @Get(':gameId/events')
  findOne(@Param('gameId') gameId: string) {
    return this.gamesService.getEvents(gameId);
  }
}

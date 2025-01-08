import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller({
  path: 'games',
  version: '1',
})
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  async getGames() {
    return this.gamesService.getGames();
  }

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get(':gameId')
  findOne(@Param('gameId') gameId: string) {
    return this.gamesService.getGameById(gameId);
  }

  @Patch(':gameId')
  update(
    @Param('gameId') gameId: string,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return this.gamesService.updateGame(gameId, updateGameDto);
  }

  @Delete(':gameId')
  remove(@Param('gameId') gameId: string) {
    return this.gamesService.deleteGame(gameId);
  }
}

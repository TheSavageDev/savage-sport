import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RulesetsService } from './rulesets.service';
import { CreateRulesetDto } from './dto/create-ruleset.dto';
import { UpdateRulesetDto } from './dto/update-ruleset.dto';

@Controller('rulesets')
export class RulesetsController {
  constructor(private readonly rulesetsService: RulesetsService) {}

  @Post()
  create(@Body() createRulesetDto: CreateRulesetDto) {
    return this.rulesetsService.create(createRulesetDto);
  }

  @Get()
  findAll() {
    return this.rulesetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rulesetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRulesetDto: UpdateRulesetDto) {
    return this.rulesetsService.update(+id, updateRulesetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rulesetsService.remove(+id);
  }
}

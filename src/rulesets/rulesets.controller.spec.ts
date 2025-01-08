import { Test, TestingModule } from '@nestjs/testing';
import { RulesetsController } from './rulesets.controller';
import { RulesetsService } from './rulesets.service';

describe('RulesetsController', () => {
  let controller: RulesetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RulesetsController],
      providers: [RulesetsService],
    }).compile();

    controller = module.get<RulesetsController>(RulesetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

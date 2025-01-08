import { PartialType } from '@nestjs/mapped-types';
import { CreateRulesetDto } from './create-ruleset.dto';

export class UpdateRulesetDto extends PartialType(CreateRulesetDto) {}

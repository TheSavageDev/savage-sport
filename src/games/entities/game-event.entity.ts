import { Timestamp } from 'firebase-admin/firestore';
import { FieldingPositions } from '../../enums/fielding-positions.enum';

export type GameEventDetails = {
  baseReached?: '1' | '2' | '3' | '4';
  pitchCount?: number;
  fielderPosition?: FieldingPositions | FieldingPositions[];
  rbi?: number;
};

export enum GameEventType {
  Hit = 'hit',
  Strike = 'strike',
  Ball = 'ball',
  Run = 'run',
  Out = 'out',
  Walk = 'walk',
  Error = 'error',
  FoulBall = 'foulBall',
  FoulOut = 'foulOut',
  BallInPlay = 'ballInPlay',
}

export enum GameEventResults {
  GroundOut = 'groundOut',
  FlyOut = 'flyOut',
  LineOut = 'lineOut',
  PopOut = 'popOut',
  SacBunt = 'sacBunt',
  SacFly = 'sacFly',
  DoublePlay = 'doublePlay',
  TriplePlay = 'triplePlay',
  FieldersChoice = 'fieldersChoice',
}

export class GameEvent {
  id: string;
  inning: number;
  teamId: string;
  playerId: string | string[];
  eventType: GameEventType;
  details?: GameEventDetails;
  timestamp: Timestamp;
}

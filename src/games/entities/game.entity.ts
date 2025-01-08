export enum GameStatus {
  Scheduled = 'scheduled',
  InProgress = 'in_progress',
  Delayed = 'delayed',
  Postponed = 'postponed',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

export class Game {
  id: string;
  leagueId: string;
  divisionId: string;
  homeTeamId: string;
  awayTeamId: string;
  status: GameStatus;
  score: {
    homeTeamScore: number;
    awayTeamScore: number;
  };
  currentInning: number;
  scheduledStartDatetime: Date;
  createdAt: Date;
}

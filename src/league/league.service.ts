import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CollectionReference,
  DocumentData,
  Firestore,
} from 'firebase-admin/firestore';
import { League } from './entities/league.entity';

@Injectable()
export class LeagueService {
  private readonly logger = new Logger(LeagueService.name);
  private readonly leagues: CollectionReference<DocumentData>;
  constructor(@Inject('FIRESTORE') private firestore: Firestore) {
    this.leagues = this.firestore.collection('leagues');
  }

  async create(createLeagueDto: any): Promise<League> {
    this.logger.log(`Creating league: ${createLeagueDto.name}`);
    const leagueRef = this.firestore.collection('leagues').doc();
    const league: League = {
      ...createLeagueDto,
      id: leagueRef.id,
      createdAt: new Date(),
    };
    return await leagueRef.set(league).then(() => {
      this.logger.log(`League created with ID: ${leagueRef.id}`);
      return league;
    });
  }

  async getLeagues(): Promise<League[]> {
    const snapshot = await this.leagues.get();
    return snapshot.docs.map((doc) => doc.data() as League);
  }

  async getLeagueById(id: string): Promise<League | null> {
    const leagueRef = this.leagues.doc(id);
    const doc = await leagueRef.get();
    return doc.exists ? (doc.data() as League) : null;
  }

  async updateLeague(id: string, league: Partial<League>): Promise<void> {
    const leagueRef = this.leagues.doc(id);
    await leagueRef.update(league);
  }

  async deleteLeague(id: string): Promise<void> {
    const leagueRef = this.leagues.doc(id);
    await leagueRef.delete();
  }
}

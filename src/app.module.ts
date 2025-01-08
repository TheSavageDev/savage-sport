import {
  // MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RulesetsModule } from './rulesets/rulesets.module';
import { TeamsModule } from './teams/teams.module';
import { GamesModule } from './games/games.module';
import { FirebaseModule } from './firebase/firebase.module';
// import { LoggingMiddleware } from './middleware/logging.middleware';
import { LeagueModule } from './league/league.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    RulesetsModule,
    TeamsModule,
    GamesModule,
    FirebaseModule,
    LeagueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggingMiddleware).forRoutes('*');
  // }
}

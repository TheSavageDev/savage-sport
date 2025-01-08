import { Global, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        let app;
        if (process.env.APP_ENV !== 'development') {
          app = admin.initializeApp({
            credential: applicationDefault(),
            projectId: `dev-savage-sport`,
          });
        } else {
          app = admin.initializeApp({
            credential: admin.credential.cert('./dev-savage-sport.json'),
          });
        }
        return app;
      },
    },
    {
      provide: 'FIRESTORE',
      useFactory: (app: admin.app.App) => app.firestore(),
      inject: ['FIREBASE_ADMIN'],
    },
    {
      provide: 'AUTH',
      useFactory: (app: admin.app.App) => app.auth(),
      inject: ['FIREBASE_ADMIN'],
    },
    {
      provide: 'STORAGE',
      useFactory: (app: admin.app.App) => app.storage(),
      inject: ['FIREBASE_ADMIN'],
    },
    {
      provide: 'REMOTE_CONFIG',
      useFactory: (app: admin.app.App) => app.remoteConfig(),
      inject: ['FIREBASE_ADMIN'],
    },
  ],
  exports: ['FIRESTORE', 'AUTH', 'STORAGE', 'REMOTE_CONFIG'],
})
export class FirebaseModule {}

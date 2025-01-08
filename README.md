<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## **1. User Authentication**

Handles user registration, login, and profile management.

### Endpoints:

- `POST /auth/register`  
  **Description**: Register a new user (coach).  
  **Payload**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- `POST /auth/login`  
  **Description**: Authenticate a user and return a token.

- `GET /auth/me`  
  **Description**: Retrieve authenticated user profile.

---

## **2. Leagues Management**

Manage leagues, divisions, and age levels.

### Endpoints:

- `POST /leagues`  
  **Description**: Create a new league.  
  **Payload**:

  ```json
  {
    "name": "Blue Valley Recreation",
    "description": "Recreational softball league",
    "ageLevels": ["U8", "U10", "U12"],
    "ruleSetIds": ["ruleSetID1", "ruleSetID2"],
    "season": "2024 Spring"
  }
  ```

- `GET /leagues`  
  **Description**: Retrieve a list of all leagues.

- `GET /leagues/{leagueId}`  
  **Description**: Retrieve details of a specific league, including divisions and rule sets.

- `PUT /leagues/{leagueId}`  
  **Description**: Update a league's details.

- `DELETE /leagues/{leagueId}`  
  **Description**: Delete a league.

#### Divisions:

- `POST /leagues/{leagueId}/divisions`  
  **Description**: Add a division to a league.  
  **Payload**:

  ```json
  {
    "name": "U10 Division",
    "ageLevel": "U10",
    "ruleSetId": "ruleSetID"
  }
  ```

- `GET /leagues/{leagueId}/divisions`  
  **Description**: List all divisions in a league.

- `DELETE /leagues/{leagueId}/divisions/{divisionId}`  
  **Description**: Remove a division from a league.

---

## **3. Rule Sets Management**

Handles creating, updating, and assigning rule sets to leagues and divisions.

### Endpoints:

- `POST /rulesets`  
  **Description**: Create a new rule set.  
  **Payload**:

  ```json
  {
    "name": "U10 Coach Pitch Rules",
    "innings": 6,
    "maxRunsPerInning": 5,
    "timeLimitMinutes": 90,
    "pitchType": "coach-pitch",
    "stealingAllowed": false
  }
  ```

- `GET /rulesets`  
  **Description**: Retrieve a list of all rule sets.

- `GET /rulesets/{ruleSetId}`  
  **Description**: Retrieve details of a specific rule set.

- `PUT /rulesets/{ruleSetId}`  
  **Description**: Update a rule set.

- `DELETE /rulesets/{ruleSetId}`  
  **Description**: Delete a rule set.

---

## **4. Team Management**

Handle teams, rosters, and their assignments to leagues and divisions.

### Endpoints:

- `POST /teams`  
  **Description**: Create a new team.  
  **Payload**:

  ```json
  {
    "name": "Savage Sluggers",
    "coachId": "userUID",
    "leagueId": "leagueID",
    "divisionId": "divisionID"
  }
  ```

- `GET /teams`  
  **Description**: Retrieve all teams for the authenticated user.

- `GET /teams/{teamId}`  
  **Description**: Retrieve details of a specific team, including roster.

- `PUT /teams/{teamId}`  
  **Description**: Update a team's details.

- `DELETE /teams/{teamId}`  
  **Description**: Delete a team.

#### Players:

- `POST /teams/{teamId}/players`  
  **Description**: Add a player to a team.  
  **Payload**:

  ```json
  {
    "name": "Annabelle Savage",
    "number": 10,
    "position": "Pitcher",
    "age": 9
  }
  ```

- `PUT /teams/{teamId}/players/{playerId}`  
  **Description**: Update player details.

- `DELETE /teams/{teamId}/players/{playerId}`  
  **Description**: Remove a player from a team.

---

## **5. Games Management**

Set up games, manage scores, and track play-by-play events.

### Endpoints:

- `POST /games`  
  **Description**: Schedule a new game.  
  **Payload**:

  ```json
  {
    "leagueId": "leagueID",
    "divisionId": "divisionID",
    "team1Id": "team1ID",
    "team2Id": "team2ID",
    "ruleSetId": "ruleSetID",
    "scheduledDate": "2024-03-01T15:00:00Z"
  }
  ```

- `GET /games`  
  **Description**: Retrieve a list of games for the authenticated user.

- `GET /games/{gameId}`  
  **Description**: Retrieve details of a specific game, including score and events.

- `PUT /games/{gameId}`  
  **Description**: Update game details (e.g., scores, inning).  
  **Payload**:

  ```json
  {
    "currentInning": 3,
    "score": {
      "team1": 5,
      "team2": 3
    }
  }
  ```

- `DELETE /games/{gameId}`  
  **Description**: Delete a game.

#### Events:

- `POST /games/{gameId}/events`  
  **Description**: Add a play-by-play event.  
  **Payload**:

  ```json
  {
    "inning": 3,
    "teamId": "team1ID",
    "playerId": "playerID",
    "eventType": "hit",
    "details": {
      "baseReached": "2nd"
    }
  }
  ```

- `GET /games/{gameId}/events`  
  **Description**: Retrieve all events for a game.

---

## **6. Analytics**

Generate stats and reports for teams, players, and leagues.

### Endpoints:

- `GET /teams/{teamId}/stats`  
  **Description**: Retrieve cumulative stats for a team.

- `GET /players/{playerId}/stats`  
  **Description**: Retrieve cumulative stats for a player.

- `GET /games/{gameId}/report`  
  **Description**: Generate a detailed report for a game.

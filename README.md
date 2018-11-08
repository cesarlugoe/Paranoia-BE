CHECK `.env` variables and rename `.env.sample` to `.env`

# YOUR README

# PARANOIA (Trust No One)

## Description

Paranoia is a real live game that uses this app as its manager, the game consists in a group of persons that are each asigned a random secret target (other participant) and a secret mission. The objective is to induce your target to perform whatever your mission states, your target doesn't know who is out to get him/her, nor the mission that you have to accomplish. If you complete your mission, your target is eliminated and you asume his/her target and mission, but be aware, someone is out to get you too... The last survivor wins, or in case the time runs out, the participant with a bigger number of kills becomes the victor.

## User Stories

-  **404:** As a user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **500** As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
-  **Signup:** As an anon I can sign up in the platform so that I can see my profile and join a game
-  **Login:** As a user I can login to the platform so that I can see my profile and join a game
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Create game** As a user I can add a new game so that I can invite new participants
-  **Join game** As a user I can join a game I've been invited to
-  **Edit profile** As a user I can edit my profile so that I can add a photo or change my killer sentence
-  **Delete game** As a user (game admin) I can delete the game so that I can finish the game
-  **Invite Player** As a user (game admin) I can invite player to the game so that they receive a code and       join the game.
- **Game Detail** As a user I can access the gameroom so that I can use the platform to eliminate other           participants, send a messege and check the state of the game.
- **Start Game** As a game admin (user) I can, once the participants have accepted my invitations, start the      game so that we can start playing and the app starts managing the game.
- **Accomplish Mission** As a user, I can signal that I have completed a mission so that my target gets           notified, eliminated from the game and I can recieve my new mission.
 

## Backlog

Messenger service
- Send anonymous messages to other participants

QR code
- Generate a QR code so that participants can be added to a game through the code

Mails
- Send email to participants for invite them and notified them when they get eliminated, or when the game       ends.

Random missions
- Generate random missions

Alerts
- Show alerts when the creator of the game wants to return to distribute missions or want to end the game

# Server

Routes

- POST /auth/signup
  body :
    - username
    - email
    - password
  $ Required fields $
  User.dataB => createUser
    usertaken?
      res.JSON(422) + User taken
    req.session.currentUser = new User
    newUser.save()
    res.status(200).json + User Data  

- POST/auth/login
  req.session.currentUser?
  res.status(401).json + ERROR
  body :
    - username
    - password
  $ Required fields $
  User.dataB => checkuserInfo 
    userinfo?
      req.session.currentUser = user
      res.status(200).json + User Data  
    : res.status(xxx).json + message user/pass invalid;
    else
    res.status(404).json


- POST /auth/logout
  req.session = null
  res.status(204).send() + OK


- PATCH /user/edit
  userID, profileInfo

  User.db.find(UserID)
    user : user
    res.status.json + user info


- GET /game/:id      
   userID, gameID
   Game.dataB.find(gameID)
    .populate()
   res.status(200).Json + Game data

- POST /game/create
  game info Object (model),
  $ Required fields $
  New Game {game info object}
  adminID = req.currentUser._id
  game.admin = adminID
  Game.dataB.create(game)
    game.save()
      res.status(200).JSON + game Data

- PATCH /game/:id/edit
  gameID, currentUserID, gameInfo,
  
  Game.db.find(gameID)
    if currentUserID = game.admin
      game : gameinfo
      game.save
        res.status.Json + gameinfo

- POST game/:id/join 
  UserID, joinInfo 
  $ Required fields $ (QR || code), (mission || randomM)
  Game.db.find(gameCode)
    game.participant.push(UserID)
    game.mission.push(mission)
    game.save()
      res.status(200) {game data}

- POST /game/:id/invite *backlog
  GameID , Emails
  construir URL con ID      
  conectar servicio email y enviar
    res.status(200).Json. "ok email"

- POST /game/id:/start
  gameID,

  Game.db.find(gameID)
    sort mission and targets
    save game
      res.status(200).Json + game info

- POST /gameplay/:id/kill
   targetID, gameID, killCode

   Game.find(gameID)
    Game.participants.find(targetID)
      participant.killCode = killCode?
        game.participant.delete 
        game.save()
          res.status(200).Json + game Info


- GET /gameplay/over
  gameID, currentUserID

  Game.db.find(gameID)
    if currentUserID = game.admin
      game.delete
      game.save()
        res.status + message



  ## Links

### Trello/Kanban

[Link to trello board](https://trello.com/b/s2J2Vdcr/proyecto-modulo-3) 

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)



# [Male Gaze](https://malegaze.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/752f1a75-cedf-4203-8126-17cc6a19ca09/deploy-status)](https://app.netlify.com/sites/malegaze/deploys)

Comment peut-on faire prendre conscience de l’**impact** qu’a le **male gaze** dans notre perception des **femmes** au quotidien, au travers du **cinéma** ?

## Présentation
**Male Gaze** est une expérience interactive visant à faire prendre coscience l'utilisateur du phénomène de Male Gaze. 

### Concept
Nous souhaitons plonger l’utilisateur en plein coeur d’une une scène de tournage pour qu’il prenne réellement conscience de ce qu’implique le Male gaze dans le monde cinématographique. Il va être confronté à toutes les étapes de la création d’un scénario tourné autour du male gaze. 

Laura Mulvey qui a définit le concept du Male Gaze, distingue 3 types de regards : celui de la caméra sur les acteurs et actrices, celui du public regardant le produit final, et celui des personnages se regardant les uns les autres au sein du film. 

L’expérience se concentrera sur le cinéma et on peut imaginer qu’elle soit la 1ère d’une série qui traite de tous les types de médias sujets au Male Gaze.

### Technos
Le projet est basé sur [three.js](https://threejs.org/) pour la 3D et [socket.io](https://socket.io/) pour la communication en temps réel avec le mobile.

### Prototypes
Voir les prototypes ici : [https://malegaze-prototype.netlify.com](https://malegaze-prototype.netlify.com/)

## Documentation
The code documentation is available here : [Documentation](https://doc-malegaze.netlify.app)

## Installation & setup

### Client
_**Warning:** All of these instructions need to be made in the `client` folder !_

#### Setup the environment variables
1. Copy the `.env.example` file in a new `.env` file.
2. Complete with the ip address of your desktop on your local network (or the alias you want to use to connect with your phone).

```dotenv
# For mobile connexion
VUE_APP_PUBLIC_HOST=yourlocalip

# Server
VUE_APP_SERVER_HOST=yourlocalip
```

#### Install dependencies
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn dev
```

#### Compiles and minifies for production
```
yarn build
```

(Full documentation for client : [here](./client/README.md))

### Server
_**Warning:** All of these instructions need to be made in the `server` folder !_

#### Setup the environment variables
1. Copy the `.env.example` file in a new `.env` file.
2. Complete with the ip address of your desktop on your local network (or the alias you want to use to connect with your phone).
```dotenv
PUBLIC_HOST=yourlocalip
```

#### Install dependencies
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn dev
```

#### Compiles and serve for production
```
yarn start
```

(Full documentation for server : [here](./server/README.md))

## 🔒 HTTPS Configuration for local development
DeviceMotionEvent and Camera access needs HTTPS protocol on some devices(i.e. iOS devices).

See documentation for local HTTPS setup : [here](./HTTPS.md)

## Production

How to deploy on production ?

### Client : Netlify


Merge the `master` branch on `production`, the deploy is automatic.

### Server : Heroku

On your machine, run this command in `master` branch.
```bash
git subtree push --prefix server heroku master
```

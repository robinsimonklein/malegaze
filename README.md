# Male Gaze

[![Netlify Status](https://api.netlify.com/api/v1/badges/752f1a75-cedf-4203-8126-17cc6a19ca09/deploy-status)](https://app.netlify.com/sites/malegaze/deploys)
![Heroku](https://heroku-badge.herokuapp.com/?app=malegaze)

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

## Installation & setup

### Client
Go to `client` folder and run these commands :

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
Go to `server` folder and run these commands :
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

### Client

- Use [mkcert](https://github.com/FiloSottile/mkcert) to generate local certificate in `/cert` folder.
````bash
# Create and go in /cert
mkdir cert && cd cert

# Generate certificate
# Replace [localip] by your machine's ip in your local netwotk
mkcert localhost 127.0.0.1 [localip] ::1
````

- Install the certificate on your machine.
````bash
mkcert -install
````

- Add the *key* and *pem* in `vue.config.js`
```js
https = {
    key: fs.readFileSync('./cert/localhost+4-key.pem'),
    cert: fs.readFileSync('./cert/localhost+4.pem'),
}
```

- Set HTTPS to `true` in `.env` file.
````dotenv
HTTPS=true
````

- Run the project in dev mode
```bash
yarn serve
```

- (Optionnal) Mobile connection :
    
    - Transfer the `localhost.pem` file on your mobile (i.e. via AirDrop)
    - Install the profile

- Enjoy ! 🎉


### Server

- Copy the `/cert` folder from `client` and past it in `server`

⋅⋅⋅See [here](#client-1) how to create the certificate.

- Add the *key* and *pem* in `app.js`
```js
server = https.createServer({
    key: fs.readFileSync(`${__dirname}/cert/localhost+4-key.pem`, 'utf8'),
    cert: fs.readFileSync(`${__dirname}/cert/localhost+4.pem`, 'utf8')
}, app)
```

- Set HTTPS to `true` in `.env` file.
````dotenv
HTTPS=true
````

- Enjoy ! 🎉

## Production

How to deploy on production ?

### Client : Netlify

Merge the `master` branch on `production`, the deploy is automatic.

### Server : Heroku
On your machine, run this command in `master` branch.
```bash
git subtree push --prefix server heroku master
```

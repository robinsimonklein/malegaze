# Male Gaze - Prototype

[![Netlify Status](https://api.netlify.com/api/v1/badges/c40231ef-2a8d-488f-bdb8-0cefcd55602e/deploy-status)](https://app.netlify.com/sites/malegaze-prototype/deploys)

Demo here : [https://malegaze-prototype.netlify.com](https://malegaze-prototype.netlify.com/)

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

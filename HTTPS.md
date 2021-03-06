# HTTPS Configuration for local development

- Use [mkcert](https://github.com/FiloSottile/mkcert) to generate local certificate in `/cert` folder, in root of project.
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

## Client

- Add the *key* and *pem* in `client/vue.config.js`
```js
https = {
    key: fs.readFileSync('./cert/localhost+4-key.pem'),
    cert: fs.readFileSync('./cert/localhost+4.pem'),
}
```

- Set VUE_APP_HTTPS to `true` in `.env` file.
````dotenv
VUE_APP_HTTPS=true
````

- Run the project in dev mode
```bash
yarn serve
```

- (Optionnal) Mobile connection :
    
    - Transfer the `localhost.pem` file on your mobile (i.e. via AirDrop)
    - Install the profile

- Enjoy ! 🎉


## Server

- Add the *key* and *pem* in `server/app.js`
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

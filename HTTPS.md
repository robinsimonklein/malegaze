# HTTPS Configuration for local development
## Client

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


## Server

- Copy the `/cert` folder from `client` and past it in `server`

⋅⋅⋅See [here](#client) how to create the certificate.

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

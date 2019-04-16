'use strict';

const {google} = require('googleapis');
const plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;


module.exports = function (app) {
    function getOAuthClient () {
        return new OAuth2(process.env.GOOGLE_CLIENT_ID ,  process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URL);
    }
 
    function getAuthUrl () {
        var oauth2Client = getOAuthClient();
        // generate a url that asks permissions for Google+ and Google Calendar scopes
        var scopes = [
            'https://www.googleapis.com/auth/plus.me',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ];
     
        var url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes // If you only need one scope you can pass it as string
        });
     
        return url;
    }
 
    app.use("/oauthCallback", function (req, res, next) {
        var oauth2Client = getOAuthClient();
        var code = req.query.code;
        oauth2Client.getToken(code, function(err, tokens) {
          // Now tokens contains an access_token and an optional refresh_token. Save them.
          if(!err) {
            oauth2Client.setCredentials(tokens);
            req.session.tokens = tokens;
            
            var p = new Promise(function (resolve, reject) {
                plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
                    resolve(response || err);
                });
            }).then(function (data) {
                // img: data.data.image.url
                // Name: data.data.name.givenName
                // Apellidos: data.data.name.familyName
                // email: data.data.emails[0].value
                var familyName = data.data.name.familyName.split(' ');
                req.session.userData = {
                    email: data.data.emails[0].value,
                    avatar: data.data.image.url,
                    name: data.data.name.givenName,
                    firstFamilyName: familyName[0],
                    secondFamilyName: familyName[1]
                };
                /*res.send(`
                   <img src=${data.data.image.url} />
                    <h3>Hello ${data.data.displayName}</h3>
                    <br>
                    Name: ${data.data.name.givenName}
                    <br>
                    Surnames: ${data.data.name.familyName}
                `);*/
                return res.redirect(301, '/index.html')
            })

            
            //return res.end();
          }
          else{
            /*res.send(`
                <h3>Login failed!!</h3>
            `);*/
            console.error("No login!")
            return res.redirect(301, '/login');
          }
        });
    });
 
    app.use("/details", function (req, res, next) {
        var oauth2Client = getOAuthClient();
        oauth2Client.setCredentials(req.session.tokens);
     
        var p = new Promise(function (resolve, reject) {
            plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
                resolve(response || err);
            });
        }).then(function (data) {
            res.send(`
               <img src=${data.data.image.url} />
                <h3>Hello ${data.data.displayName}</h3>
			    <br>
			    Name: ${data.data.name.givenName}
			    <br>
			    Surnames: ${data.data.name.familyName}
            `);
        })
    });
 
    app.use("/login", function (req, res, next) {
        
        var url = getAuthUrl();
        return res.redirect(301, url);
        //res.send(`<h1>Authentication using google oAuth</h1><a href=${url}>Login</a>`)
        //return res.end();
    });

    app.use('/logout', function (req, res, next) {
        req.session.destroy()
        return res.redirect(301, "https://mail.google.com/mail/u/0/?logout&hl=en");
    })
};

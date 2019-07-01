const express = require('express');
const routes = require('./routes/index');
const accountRoutes = require('./routes/accounting');

const authRoute = require('./routes/auth');
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const authCheckMiddleware  = require('./middleware/authCheck');

require('dotenv').config({path:'./.env' })

let app = express();
const PORT = process.env.PORT || 3000;
const dbURL = process.env.MONGO_DB_URL

let ff = encodeURIComponent('<zack0831@>@myaccounting')
mongoose.connect(`mongodb+srv://zackou:zack0831@myaccounting-xzlks.mongodb.net/myAccountings?retryWrites=true`,{useNewUrlParser: true}).then(() => {
    console.log('Connection to the Atlas Cluster is successful!')
  }).catch( (err) => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
  
var whitelist = ['http://localhost:8080','http://localhost:8089', 'http://00bfdf78.ngrok.io','https://zachriel-accounting-client.herokuapp.com']
var corsOptions = {
  origin: function (origin, callback) {

    //console.log('origin ' + origin);
    //console.log('whitelist ' + whitelist);
    console.log(whitelist.includes(origin));
    console.log(whitelist.indexOf(origin));

    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// app.use('/',function(req, res, next){
//   console.log("A new request received at " + Date.now());
//   console.log(req.body);
//   next();
// });

app.use('/home', authCheckMiddleware,routes);
app.use('/account', authCheckMiddleware,accountRoutes);
app.use('/user', authRoute);


app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);

});

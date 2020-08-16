const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const currencyRoute = require('./routes/currency');
const stocksRoute = require('./routes/stocks');

require('dotenv').config({path:'./.env' });

let app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/currency',currencyRoute);
app.use('/stocks',stocksRoute);

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);

});

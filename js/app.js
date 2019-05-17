const express = require('express');
const routes = require('./routes/index');

let app = express();
const PORT = process.env.PORT || 5000;

app.use('/', routes);

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});

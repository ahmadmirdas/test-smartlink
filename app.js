let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { serve: swaggerServe, setup: swaggerSetup } = require('swagger-ui-express');

// Initialize Swagger Document
const swaggerDocs = require('./documentation');
app.use('/docs', swaggerServe, swaggerSetup(swaggerDocs));

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('Bismillah lancar, API server started on: ' + port);
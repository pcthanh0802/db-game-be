require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const api = require('./api');
const routes = require('./routes');

// middlewares
app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', ejs);

// API
app.use('/api/game', api.game);
app.use('/api/dlc', api.dlc);

// Admin page
app.use('/admin/game', routes.game);
app.use('/admin/dlc', routes.dlc);
app.use('/admin/sale', routes.sale);

// start up the server
const port = process.env.PORT || 3281;
app.listen(port, () => {
    console.log(`Server is listening to port ${port}...`);
})
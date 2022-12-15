require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');

// middlewares
app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: true }));


app.use('/api/game', routes.game);

// start up the server
const port = process.env.PORT || 3281;
app.listen(port, () => {
    console.log(`Server is listening to port ${port}...`);
})
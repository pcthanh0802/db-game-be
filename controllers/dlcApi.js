const conn = require('../db/conn');
const query = require('../db/query');


async function getDlcsOfGame(req, res) {
    try {
        const page = req.query.page || 0;
        const gameId = req.query.gameId;
        const result = await query(
            conn,   
            `
                SELECT dlcId, dlcName, price, getDlcTruePrice(dlcId) AS priceWithDiscount 
                FROM dlc
                WHERE gameId = ${gameId}
                LIMIT 10 OFFSET ${10 * page}
            `
        );
        res.send(result);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function getDlc(req, res) {
    try {
        const result = await query(
            conn, 
            `
                SELECT dlc.dlcId, dlc.dlcName, dlc.description, dlc.releaseDate, dlc.price, getDlcTruePrice(dlc.dlcId) AS priceWithDiscount, g.gameName, d.devName, d.country
                FROM dlc, developer d, game g
                WHERE dlc.devId = d.devId AND dlc.dlcId = ${req.params.id} AND g.gameId = dlc.gameId
            `
        );
        res.send(result);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getDlcsOfGame,
    getDlc
}
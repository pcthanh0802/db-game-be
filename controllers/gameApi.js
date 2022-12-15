const conn = require('../db/conn');
const query = require('../db/query');

async function getGames(req, res) {
    try {
        let result;

        if(req.query.id){
            const id = req.query.id;
            result = await query(
                conn,
                `
                    SELECT g.gameId, g.gameName, g.description, g.releaseDate, g.price, getGameTruePrice(g.gameId) AS priceWithDiscount, d.devName, d.country
                    FROM game g, developer d 
                    WHERE g.gameId = '${id}' AND g.devID = d.devId
                `
            );
            const requirements = await query(
                conn,
                `
                    SELECT reqType, ram, os, gpu, cpu, minStorage
                    FROM game_sys_req 
                    WHERE gameId = '${id}';
                `
            )
            result[0]['sys_req'] = requirements;
        }
        else if(req.query.genre) {
            const genre = req.query.genre;
            result = (await query(conn, `CALL getGamesOfGenre('${genre}')`))[0];
        }
        else if(req.query.onSalePromo) {
            result = (await query(conn, `CALL getGameOnSale()`))[0];
        }

        res.send(result);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function getAllGames(req, res) {
    try {
        const page = req.query.page || 0;
        const result = await query(
            conn,   
            `
                SELECT gameId, gameName, price, getGameTruePrice(gameId) AS priceWithDiscount 
                FROM game
                LIMIT 10 OFFSET ${10 * page};
            `
        );
        res.send(result);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getGames,
    getAllGames
}
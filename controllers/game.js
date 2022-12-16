const conn = require('../db/conn');
const query = require('../db/query');

const baseRoute = '/admin/game'

async function renderMainView(req, res) {
    try {
        const result = await query(
            conn, 
            `
                SELECT g.gameId, g.gameName, g.description, g.releaseDate, g.price, d.devName, d.country 
                FROM game g, developer d
                WHERE d.devId = g.devID;
            `
        );
        res.render('game/index.ejs', { games: result });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function renderAddGame(req, res) {
    try {
        const result = await query(conn, "SELECT * FROM developer");
        res.render('game/add.ejs', { devs: result });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function addGame(req, res) {
    try {
        const data = {
            gameId: req.body.gameId,
            gameName: req.body.gameName,
            description: req.body.description,
            releaseDate: req.body.releaseDate,
            price: req.body.price,
            devID: req.body.developer
        };
        await query(conn, "INSERT INTO game SET ?", data);
        res.redirect(`${baseRoute}`)
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function renderEditGame(req, res) {
    try {
        const devs = await query(conn, "SELECT * FROM developer");
        const game = (await query(conn, "SELECT * FROM game WHERE gameId = ?", [req.params.id]))[0];
        res.render('game/edit.ejs', { game, devs });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function editGame(req, res) {
    try {
        const data = {
            gameId: req.body.gameId,
            gameName: req.body.gameName,
            description: req.body.description,
            releaseDate: req.body.releaseDate,
            price: req.body.price,
            devID: req.body.developer
        }
        await query(conn, `UPDATE game SET ? WHERE gameId = '${req.body.gameId}'`, data);
        res.redirect(`${baseRoute}`)
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function deleteGame(req, res) {
    try {
        await query(conn, `DELETE FROM game WHERE gameId = '${req.params.id}'`);
        res.redirect(baseRoute);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    renderMainView,
    renderAddGame,
    addGame,
    renderEditGame,
    editGame,
    deleteGame
}
const conn = require('../db/conn');
const query = require('../db/query');

let baseRoute;

async function renderMainView(req, res) {
    try {
        const gameId = req.params.gameId;
        const result = await query(
            conn, 
            `
                SELECT dlc.dlcId, dlc.dlcName, dlc.description, dlc.releaseDate, dlc.price, d.devName, d.country 
                FROM dlc, developer d
                WHERE d.devId = dlc.devId AND dlc.gameId = '${gameId}';
            `
        );
        baseRoute = `/admin/dlc/${gameId}`;
        const gameName = (await query(conn, "SELECT gameName FROM game WHERE ?", { gameId }))[0].gameName;
        res.render('dlc/index.ejs', { gameName, gameId, dlcs: result });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function renderAddDlc(req, res) {
    try {
        const result = await query(conn, "SELECT * FROM developer");
        res.render('dlc/add.ejs', { gameId: req.params.gameId, devs: result });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function addDlc(req, res) {
    try {
        const data = {
            dlcId: req.body.dlcId,
            dlcName: req.body.dlcName,
            description: req.body.description,
            releaseDate: req.body.releaseDate,
            price: req.body.price,
            devID: req.body.developer,
            gameId: req.params.gameId
        };
        await query(conn, "INSERT INTO dlc SET ?", data);
        res.redirect(baseRoute)
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function renderEditDlc(req, res) {
    try {
        const devs = await query(conn, "SELECT * FROM developer");
        const dlc = (await query(conn, "SELECT * FROM dlc WHERE dlcId = ?", [req.params.id]))[0];
        res.render('dlc/edit.ejs', { dlc, devs });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function editDlc(req, res) {
    try {
        const data = {
            dlcId: req.body.dlcId,
            dlcName: req.body.dlcName,
            description: req.body.description,
            releaseDate: req.body.releaseDate,
            price: req.body.price,
            devID: req.body.developer
        }
        await query(conn, `UPDATE dlc SET ? WHERE dlcId = '${req.body.dlcId}'`, data);
        res.redirect(`${baseRoute}`)
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function deleteDlc(req, res) {
    try {
        await query(conn, `DELETE FROM dlc WHERE dlcId = '${req.params.id}'`);
        res.redirect(baseRoute);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    renderMainView,
    renderAddDlc,
    addDlc,
    renderEditDlc,
    editDlc,
    deleteDlc
}
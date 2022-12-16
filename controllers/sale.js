const conn = require('../db/conn');
const query = require('../db/query');

const baseRoute = '/admin/sale'

// ===== SALE PROMOTION ==============
async function renderMainView(req, res) {
    try {
        const result = await query(conn, "SELECT * FROM sale_promotion");
        res.render('sale/index.ejs', { sales: result });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function renderAddSale(req, res) {
    try {
        res.render('sale/addSale.ejs');
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function addSale(req, res) {
    try {
        const data = {
            saleName: req.body.saleName
        };
        await query(conn, "INSERT INTO sale_promotion SET ?", data);
        res.redirect(`${baseRoute}`)
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function renderEditSale(req, res) {
    try {
        const sale = (await query(conn, "SELECT * FROM sale_promotion WHERE saleId = ?", [req.params.id]))[0];
        res.render('sale/editSale.ejs', { sale });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function editSale(req, res) {
    try {
        const data = {
            saleId: req.body.saleId,
            saleName: req.body.saleName
        }
        await query(conn, `UPDATE sale_promotion SET ? WHERE saleId = '${req.body.saleId}'`, data);
        res.redirect(`${baseRoute}`)
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function deleteSale(req, res) {
    try {
        await query(conn, `DELETE FROM sale_promotion WHERE saleId = '${req.params.id}'`);
        res.redirect(baseRoute);
    } catch(err) {
        res.status(500).send(err.message);
    }
}



// ======= SALE PERIOD ===============
async function renderPeriodView(req, res) {
    try {
        const saleId = req.params.saleId;
        const result = await query(conn, "SELECT * FROM sale_period WHERE ?", {saleId: req.params.saleId});
        const saleName = (await query(conn, "SELECT saleName FROM sale_promotion WHERE ?",  { saleId }))[0].saleName;
        res.render('sale/period.ejs', { saleId, saleName, periods: result });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function renderAddSalePeriod(req, res) {
    try {
        res.render('sale/addPeriod.ejs', { saleId: req.params.saleId });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function addSalePeriod(req, res) {
    try {
        const data = {
            periodId: req.body.periodId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            saleId: req.params.saleId
        };
        await query(conn, "INSERT INTO sale_period SET ?", data);
        res.redirect(`${baseRoute}/${req.params.saleId}`)
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function renderEditSalePeriod(req, res) {
    try {
        const period = (await query(conn, "SELECT * FROM sale_period WHERE periodId = ?", [req.params.id]))[0];
        res.render('sale/editPeriod.ejs', { saleId: req.params.saleId, period });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function editSalePeriod(req, res) {
    try {
        const data = {
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        }
        await query(conn, `UPDATE sale_period SET ? WHERE periodId = '${req.params.id}'`, data);
        res.redirect(`${baseRoute}/${req.params.saleId}`)
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function deleteSalePeriod(req, res) {
    try {
        await query(conn, `DELETE FROM sale_period WHERE periodId = '${req.params.id}'`);
        res.redirect(`${baseRoute}/${req.params.saleId}`);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    renderMainView,
    renderAddSale,
    addSale,
    renderEditSale,
    editSale,
    deleteSale,
    renderPeriodView,
    renderAddSalePeriod,
    addSalePeriod,
    renderEditSalePeriod,
    editSalePeriod,
    deleteSalePeriod
}
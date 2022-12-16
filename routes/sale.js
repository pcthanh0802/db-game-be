const router = require('express').Router();
const Sale = require('../controllers/sale');

router.get('/', Sale.renderMainView);
router.get('/add', Sale.renderAddSale);
router.post('/add', Sale.addSale);
router.get('/edit/:id', Sale.renderEditSale);
router.post('/edit/:id', Sale.editSale);
router.get('/delete/:id', Sale.deleteSale);

// ========== period ============
router.get('/:saleId', Sale.renderPeriodView);
router.get('/:saleId/add', Sale.renderAddSalePeriod);
router.post('/:saleId/add', Sale.addSalePeriod);
router.get('/:saleId/edit/:id', Sale.renderEditSalePeriod);
router.post('/:saleId/edit/:id', Sale.editSalePeriod);
router.get('/:saleId/delete/:id', Sale.deleteSalePeriod);

module.exports = router;
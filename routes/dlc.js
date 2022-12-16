const router = require('express').Router();
const Dlc = require('../controllers/dlc');

router.get('/:gameId', Dlc.renderMainView);
router.get('/:gameId/add', Dlc.renderAddDlc);
router.post('/:gameId/add', Dlc.addDlc);
router.get('/:gameId/edit/:id', Dlc.renderEditDlc);
router.post('/:gameId/edit/:id', Dlc.editDlc);
router.get('/:gameId/delete/:id', Dlc.deleteDlc);

module.exports = router;
const router = require('express').Router();
const Dlc = require('../controllers/dlcApi');

router.get('/', Dlc.getDlcsOfGame);
router.get('/:id', Dlc.getDlc);

module.exports = router;
const express = require('express');
const router = express.Router();
const transaksi = require('../controllers/transaksi.controller.js');

router.get('/', transaksi.getAllTransaksi);
router.get('/:id', transaksi.getOneTransaksi);
router.get('/kas', transaksi.getKas);

module.exports = router;
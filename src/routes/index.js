const express = require('express');
const CatalogoController = require('../controllers/CatalogoController');
const SolicitacaoController = require('../controllers/SolicitacaoController');
const StatusController = require('../controllers/StatusController');
const UnidadeController = require('../controllers/UnidadeController');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/ping', (req, res) => {
    res.json({pong: true});
});

router.post('/signin', UserController.signin);
router.post('/signup', UserController.signup);

router.post('/catalogo', CatalogoController.add);
router.get('/catalogo/all', CatalogoController.findAll);
router.put('/catalogo/:id', CatalogoController.update);
router.get('/catalogo/:id', CatalogoController.findById);
router.get('/catalogo/:id/secao', CatalogoController.findAllSecoesById);

router.post('/solicitacao', SolicitacaoController.add);
router.put('/solicitacao/:id', SolicitacaoController.update);
router.get('/solicitacao/:id', SolicitacaoController.findById);

router.post('/unidade', UnidadeController.add);
router.get('/unidade/all', UnidadeController.findAll);
router.put('/unidade/:id', UnidadeController.update);
router.get('/unidade/:id', UnidadeController.findById);

router.post('/status', StatusController.add);
router.get('/status/all', StatusController.findAll);
router.put('/status/:id', StatusController.update);
router.get('/status/:id', StatusController.findById);

module.exports = router;
const express = require('express')
const router = express.Router();
const auth = require('../middlewares/authMiddleware')

// controllers
const HomeController = require('../controllers/HomeController');
const LoginController = require('../controllers/auth/LoginController');
const PasswordResetController = require('../controllers/auth/PasswordResetController');
const ProductController = require('../controllers/ProductController');
const upload = require('../middlewares/multerConfig');
const CustomerController = require('../controllers/CustomerController');
const SaleController = require('../controllers/SaleController');
const ProfileController = require('../controllers/ProfileController');

/* rotas */
router.get('/login', LoginController.form);
router.post('/login', LoginController.login);
router.get('/logout', LoginController.logout);
router.get('/redefinir-senha', PasswordResetController.formEmail);
router.post('/redefinir-senha', PasswordResetController.sendResetEmail);
router.get('/redefinir-senha/:token', PasswordResetController.formResetPassword);
router.post('/redefinir-senha/:token', PasswordResetController.resetPassword);
// router.get('/teste', PasswordResetController.sendResetEmail);

router.use(auth); // Adiciona o middleware 'auth' em todas as rotas seguintes

router.get('/', HomeController.index);
// produtos
router.get('/produtos', ProductController.index);
router.get('/produtos/novo', ProductController.create);
router.post('/produtos', upload.single('img'), ProductController.store);
router.get('/produtos/editar/:id', ProductController.edit);
router.post('/produtos/editar/:id', upload.single('img'), ProductController.update);
router.post('/produtos/deletar/:id', ProductController.destroy);
// clientes
router.get('/clientes', CustomerController.index);
router.get('/clientes/novo', CustomerController.create);
router.post('/clientes', CustomerController.store);
router.get('/clientes/editar/:id', CustomerController.edit);
router.post('/clientes/editar/:id', CustomerController.update);
router.post('/clientes/deletar/:id', CustomerController.destroy);
// vendas
router.get('/vendas', SaleController.index);
router.get('/vendas/novo', SaleController.create);
router.post('/vendas', SaleController.store);
router.post('/vendas/deletar/:id', SaleController.destroy);
// meus dados
router.get('/meus-dados', ProfileController.index);
router.post('/meus-dados', ProfileController.update);
router.post('/meus-dados/alterar-senha', ProfileController.updatePassword);

module.exports = router;
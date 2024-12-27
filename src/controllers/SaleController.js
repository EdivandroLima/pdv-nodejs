const { Sale, Customer, Product } = require('../database/models');
const PaginateTrait = require('../traits/PaginateTrait')

class SaleController {
    constructor() {
    }

    async index(req, res) {

        const sales = await PaginateTrait.paginate(Sale, req.query, 10, {
            include: [
                { model: Customer, as: 'customer', paranoid: false }, // necessário que o alias seja o mesmo do model sales
                { model: Product, as: 'product', paranoid: false }
            ],
        });

        res.render('pages/sales/index', { sales, msgs: req.flash() })
    }

    async create(req, res) {
        const customers = await Customer.findAll({
            where: { status: true },
        });
        const products = await Product.findAll();

        res.render('pages/sales/create', { customers, products })
    }

    async store(req, res) {
        try {

            let { customerId, productId, total } = req.body
            const product = await Product.findByPk(productId)
            const price = total * product.price;

            await Sale.create({ customerId, productId, total, price })

            req.flash('success', 'Venda realizadoa com sucesso.')
            res.redirect('/vendas')
        } catch (error) {
            this.formError(req)
            res.redirect('/vendas/novo');
        }
    }

    async destroy(req, res) {
        let sale = await Sale.findByPk(req.params.id);

        if (sale == null) {
            req.flash('error', 'Registro não encontrado.')
            res.redirect('/vendas')
        } else {
            await sale.destroy();
            req.flash('success', 'Registro excluído com sucesso.')
            res.redirect('/vendas')
        }
    }
}

module.exports = new SaleController();
const { Customer } = require('../database/models');
const PaginateTrait = require('../traits/PaginateTrait')

class CustomerController {
    constructor() {
        this.store = this.store.bind(this)
        this.update = this.update.bind(this)
    }

    async index(req, res) {
        const customers = await PaginateTrait.paginate(Customer, req.query, 10);
        res.render('pages/customers/index', { customers, msgs: req.flash() })
    }

    create(req, res) {
        res.render('pages/customers/create', { errors: req.flash() })
    }

    async store(req, res) {
        try {
            const { name, email, status, phone } = req.body
            await Customer.create({ name, email, status, phone })

            req.flash('success', 'Registro salvo com sucesso')
            res.redirect('/clientes')
        } catch (error) {
            this.formError(req)
            res.redirect('/clientes/novo');
        }
    }

    async edit(req, res) {
        let customer = await Customer.findByPk(req.params.id)
        res.render('pages/customers/edit', { customer, errors: req.flash() })
    }

    async update(req, res) {

        try {
            const { name, email, status, phone } = req.body
            await Customer.update(
                { name, email, status, phone },
                { where: { id: req.params.id } },
            );

            req.flash('success', 'Registro atualizado com sucesso')
            res.redirect('/clientes/editar/' + req.params.id)
        } catch (error) {
            this.formError(req)
            console.error(error);
            res.redirect('/clientes/editar/' + req.params.id);
        }
    }

    formError(req) {
        req.flash('form', 'Ouve um erro ao salvar os dados.')
        req.flash('oldName', req.body.name)
        req.flash('oldEmail', req.body.email)
        req.flash('oldStatus', req.body.status)
        req.flash('oldPhone', req.body.phone)
    }

    async destroy(req, res) {
        let customer = await Customer.findByPk(req.params.id);

        if (customer == null) {
            req.flash('error', 'Registro não encontrado.')
            res.redirect('/clientes')
        } else {
            await customer.destroy();
            req.flash('success', 'Registro excluído com sucesso.')
            res.redirect('/clientes')
        }
    }
}

module.exports = new CustomerController();
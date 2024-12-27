const { Product } = require('../database/models');
const PaginateTrait = require('../traits/PaginateTrait')
const fs = require('fs');
const path = require('path');

class ProductController {
    constructor() {
        this.store = this.store.bind(this)
        this.update = this.update.bind(this)
        this.edit = this.edit.bind(this)
        this.destroy = this.destroy.bind(this)
    }

    async index(req, res) {
        const products = await PaginateTrait.paginate(Product, req.query, 16);
        res.render('pages/products/index', { products, msgs: req.flash() })
    }

    create(req, res) {
        res.render('pages/products/create', { errors: req.flash() })
    }

    async store(req, res) {
        try {
            let { name, total_stock } = req.body
            const price = this.convertCurrencyToNumber(req.body.price)
            const img = `/assets/uploads/${req.file.filename}`;

            await Product.create({ name, total_stock, price, img })

            req.flash('success', 'Registro salvo com sucesso')
            res.redirect('/produtos')
        } catch (error) {
            this.formError(req)
            res.redirect('/produtos/novo');
        }
    }

    convertCurrencyToNumber(currencyString) {

        const cleanedString = currencyString.replace(/R\$\s?/, '');
        const removeDot = cleanedString.replace('.', '');
        const removeComma = removeDot.replace(',', '.');
        const number = parseFloat(removeComma);

        // Verifica se a conversão foi bem-sucedida
        if (isNaN(number)) {
            throw new Error('String inválida para conversão em número.');
        }

        return number;
    }

    async edit(req, res) {
        let product = await Product.findByPk(req.params.id)
        const price = Number(product.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        res.render('pages/products/edit', { product, price, errors: req.flash() })
    }

    async update(req, res) {

        try {

            let { name, total_stock } = req.body
            const price = this.convertCurrencyToNumber(req.body.price)

            // atualizar imagem
            let product = await Product.findByPk(req.params.id)
            let newFile = product.img

            if (req.file) { // se selecionou nova img
                console.log('xxxxxxxxxxxxxxxxxxxxxx');
                this.deleteFile(product.img)
                newFile = `/assets/uploads/${req.file.filename}`;
            }

            // atualizar produto
            await Product.update(
                { name, total_stock, price, img: newFile },
                { where: { id: req.params.id } },
            );

            req.flash('success', 'Registro atualizado com sucesso')
            res.redirect('/produtos/editar/' + req.params.id)
        } catch (error) {
            this.formError(req)
            console.error(error);
            res.redirect('/produtos/editar/' + req.params.id);
        }
    }

    deleteFile(filePath) {

        if (filePath != null) {
            const fullPath = path.join(__dirname, '..', 'public', filePath);

            if (fs.existsSync(fullPath)) {
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error(`Erro ao deletar o arquivo: ${err}`);
                    } else {
                        console.log('Arquivo deletado com sucesso!');
                    }
                });
            } else {
                console.log('Arquivo não foi encontrado');
            }
        } else {
            console.log('Arquivo não foi encontrado');
        }
    }

    formError(req) {
        req.flash('form', 'Ouve um erro ao salvar os dados.')
        req.flash('oldName', req.body.name)
        req.flash('oldTotalStock', req.body.total_stock)
        req.flash('oldPrice', req.body.price)
    }

    async destroy(req, res) {
        let product = await Product.findByPk(req.params.id);

        if (product == null) {
            req.flash('error', 'Registro não encontrado.')
            res.redirect('/produtos')
        } else {
            await product.destroy();
            this.deleteFile(product.img)

            req.flash('success', 'Registro excluído com sucesso.')
            res.redirect('/produtos')
        }
    }
}

module.exports = new ProductController();
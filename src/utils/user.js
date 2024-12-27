const { User } = require('../database/models');

async function user(req) {

    let u = null
    try {
        u = await User.findByPk(req.session.user.id);
    } catch (err) {
        // console.log('Erro ao obter usuário');
    }

    return u;
};

module.exports = user;
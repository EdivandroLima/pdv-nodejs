require('dotenv').config();
const express = require('express');
const app = express();
const router = require("./routes/routes")
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const path = require('path');
const formatDate = require('./utils/formatDate');
const getUser = require('./utils/user');

//
app.use(express.static('src/public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// disponibilizar helpers
app.locals.formatDate = formatDate;

// config bodyparser agora nativo do express (middleware para bodyparser)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// cookieParser
app.use(cookieParser(process.env.COOKIE_PARSER_KEY))

// express-flash
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // Reduz a criação de sessões desnecessárias
    cookie: {
        maxAge: 3600000, // 1 hora
        httpOnly: true, // Protege contra ataques XSS
        secure: process.env.APP_NODE_ENV === 'production', // Somente HTTPS em produção
    },
}))
app.use(flash());

// getUser
app.use(async (req, res, next) => {
    app.locals.user = await getUser(req);
    next();
});

// rotas
app.use('/', router)

app.listen(process.env.APP_PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.APP_PORT}: http://localhost:${process.env.APP_PORT}`);
})
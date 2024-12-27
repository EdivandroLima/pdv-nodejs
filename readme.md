# PDV NODE.JS
Sistema simples com Express para demonstração de CRUD de produtos, clientes e vendas, incluindo relacionamentos entre tabelas e login de usuário para acesso a todas as funcionalidades.

## Requisitos do servidor
- NPM v10^
- MySQL v5.7^

## Pacotes Utilizados
- [x] npm install express
- [x] npm install sequelize
- [x] npm install sequelize-cli
- [x] npm install mysql2
- [x] npm install ejs
- [x] npm install express-session 
- [x] npm install express-flash 
- [x] npm install cookie-parser
- [x] npm install dotenv
- [x] npm install @faker-js/faker
- [x] npm install dayjs
- [x] npm install multer
- [x] npm install bcrypt
- [x] npm install nodemailer
- [x] npm install crypto

## Instalação

#### Configure o *.env*
Copie o arquivo ``.env.example`` para ``.env`` e, em seguida, preencha as variáveis de configuração do banco de dados e do e-mail.
```
copy .env.example .env
```

#### Instale as dependências
```
npm install
```

#### Execute os migrations
```
npx sequelize-cli db:migrate
```
#### Execute os seeders para criar o usuário administrador e gerar dados fakes de registros de produtos, clientes e vendas.
```
npx sequelize-cli db:seed:all
```

#### Inicie o servidor em *http://localhost:8080*
```
node src/app.js
```

#### Login de acesso
```env
email: adm@email.com
senha: password
```
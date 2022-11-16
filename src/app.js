const express = require('express');
const bodyParser = require('body-parser');
const { saleRoutes, productRoutes } = require('./routers');

const app = express();

app.use(bodyParser.json());
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
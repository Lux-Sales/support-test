const bodyParser = require('body-parser');
const cors = require('cors');
const static = require('../view/static');
const notification = require('../view/notification');

const initialize = (app) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json()).all('*', cors());

  app.use('/', static);
  app.use('/notification', notification);
}

module.exports = {
  initialize
};

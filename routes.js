let Router = require('express-promise-router');
let { Chart } = require('./models/chart');
let router = new Router();
let papaparse = require("papaparse");


// GET /
router.get('/', async(request, response) => {
  // let messages = await Message.query().select('*').orderBy('created_at', 'DESC');

  let data = await Chart.query().select('data').from('csvdata')
  let chartcontent = papaparse.parse(data)

  response.render('index', {csv: chartcontent })
})

module.exports = router;

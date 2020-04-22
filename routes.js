let Router = require('express-promise-router');

let router = new Router();

// GET /
router.get('/', async(request, response) => {
  // let messages = await Message.query().select('*').orderBy('created_at', 'DESC');
  let data = await Chart.query().select('*')
  let labels = await Chart.query().select('*').from('header')

  response.render('index', { labels: labels, data: data})
})

module.exports = router;

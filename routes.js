let Router = require('express-promise-router');
let Chart  = require('./models/chart');
let router = new Router();
let papaparse = require("papaparse");
let upload = require('express-fileupload');

router.use(upload());

router.get('/', (request, response) => {

  response.render("index")
})

router.post('/', (request, response) => {
  if(request.files) {
    console.log(request.files)
    let file = request.files.file;
    let filename = file.name;
    console.log(filename);

    file.mv("./uploads/" + filename, function(err) {
      if(err) {
        response.send(err);
      } else {
        response.redirect('/graph');
      }
    })
  }
})

// GET /
router.get('/graph', async(request, response) => {
  // let messages = await Message.query().select('*').orderBy('created_at', 'DESC');

  let chart = await Chart.query().first()
  console.log("the data is:", chart)
  papaparse.parse(chart.data.trimRight(), {
    complete: function(results) {
      console.log("Parsing complete:", results)
      let [headers, ...csv] = results.data;
      let xAxis = [];
      let yAxis = [];
      for(let i = 1; i < results.data.length-1; i++) {
        for(let j = 0; j < 1; j++) {
          xAxis.push(results.data[i][j]);
        }
        for(let k = 1; k < 2; k++) {
          yAxis.push(parseInt(results.data[i][k]));
        }
        console.log("so far", xAxis, yAxis)
      }
      response.render('graph', { headers, csv, xAxis, yAxis });
    },
  })
})

module.exports = router;

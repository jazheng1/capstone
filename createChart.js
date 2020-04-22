let Knex = require('knex');
let { Model } = require('objection');
let dbConfig = require('./knexfile');
let fs = require('fs')

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}

let knex = Knex(dbConfig[process.env.NODE_ENV]);

Model.knex(knex);
let Chart = require('./models/chart');

async function importData(userFile) {
  let text = fs.readFileSync(userFile, 'utf-8')
  let arr = text.split('\n');
    let dataObj = [];
    let headers = arr[0].split(',');
    for(let i = 1; i < arr.length; i++) {
      let rowData = arr[i].split(',');
      let obj = {};
      for(let j = 0; j < rowData.length; j++) {
         obj[headers[j].trim()] = rowData[j].trim();
      }
      dataObj.push(obj);
    }
    let chartData = { data: dataObj, labels: headers };

  return await Chart.query().insertGraph(chartData.map((info) => {
    return {
      handle: info.labels,
      data: info.data,
    };
  }));

    await knex.destroy();
}


importData("./test.csv");

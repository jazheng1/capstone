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
  let content = fs.readFileSync(userFile, 'utf-8')

  return await Chart.query().insertGraph({
    data: content
  })

    await knex.destroy();
}



importData("./test.csv");

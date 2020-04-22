let { Model, snakeCaseMappers } = require('objection');

class Chart extends Model {
  static get columnNameMappers() {
    /*
      In JavaScript we want camel case (e.g., createdAt), but
      in SQL we want snake case (e.g., created_at).

      snakeCaseMappers tells Objection to translate between
      the two.
    */
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'chart';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'data',
      ],
      properties: {
        id: { type: 'integer' },
        data: { type: 'string', minLength: 1 },
        header: {type: 'string', minLength: 1}
      }
    };
  }
}

module.exports = Chart;

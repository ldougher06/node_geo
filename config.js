'use strict';

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todos';

console.log(connectionString)

module.exports = connectionString;

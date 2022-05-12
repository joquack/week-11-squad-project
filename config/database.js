const {
  db: { username, password, database, host },
} = require('./index');

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'postgres://mgznlatooiphfw:9c27cadf0eeca644cf78cfc09391d30d334a036290617da12a2ecb558571dac6@ec2-54-164-40-66.compute-1.amazonaws.com:5432/dclitbbthlnu36',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  }
};

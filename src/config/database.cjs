module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'admin',
  password: '123456',
  database: 'dev-burger-db',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

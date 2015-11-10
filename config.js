module.exports = {
  production: {
    database: {
      host: '',
      port: 28015,
      db: ''
    },
    secret: "My Production Secret",
    port: 443
  },
  development: {
    database: {
        host: 'localhost',
        port: 28015,
        db: 'EEKTest'
      },
    secret: "My Development Secret",
    port: 4021
    }
};

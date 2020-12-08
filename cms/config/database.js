module.exports = ({env}) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
	    database: 'my-database-name',
        uri: `mongodb+srv://play-marin:${env('DATABASE_PASSWORD', process.env.DATABASE_PASSWORD)}@cluster0.yrono.mongodb.net/play-marin-cms?retryWrites=true&w=majority`
      },
      options: {
        ssl: true
      }
    }
  }
});

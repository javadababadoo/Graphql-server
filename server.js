// server.js

/*  
    Required modules {express and express-graphql} 
    will be imported along with the schema object
    from the schema.js file in src/schema.js 
*/

const {createServer} = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
// const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema.js');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const {subscribe, execute} = require('graphql');
mongoose = require('mongoose');
Device = require('./src/api/models/deviceListModel'); //created model loading here

mongoose.connect('mongodb://localhost:27017/DeviceDB'); 


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Success connection');
});


let PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlExpress({
  schema: schema
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));

const server = createServer(app);

// app.use('/', graphqlHTTP({
//   schema: schema,
//   graphiql: true //set to false if you don't want graphiql enabled
// }));

server.listen(PORT, err => {
  if(err) throw err

  new SubscriptionServer({
    schema,
    execute,
    subscribe,
    onConnect: () => console.log('Client connected')
  },{
    server: server,
    path: '/subscriptions'
  });
  console.log('GraphQL API server running at localhost:'+ PORT);
});

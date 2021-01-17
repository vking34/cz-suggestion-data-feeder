import monogoose from 'mongoose';

// db
monogoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true , autoIndex: true });
monogoose.Promise = global.Promise;
monogoose.connection.once('open', () => {
    console.log('Connected to mongoDB!');
});

// tasks
import feedData from './tasks/index';
feedData()


// handle uncaught exceptions
process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err);
    // process.exit(1) //mandatory (as per the Node.js docs)
})
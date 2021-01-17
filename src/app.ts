import monogoose from 'mongoose';

// db
monogoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true , autoIndex: true });
monogoose.Promise = global.Promise;
monogoose.connection.once('open', () => {
    console.log('Connected to mongoDB!');
});

// tasks
// import convertCategories from './tasks/categoryConvertor';
// convertCategories()

import mongoose from "mongoose";

mongoose.connect('mongodb+srv://valentinaJimenez0:Valentina123@clustervj.7lk17ev.mongodb.net/login?retryWrites=true&w=majority&appName=ClusterVJ')

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export default db;
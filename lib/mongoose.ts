import mongoose from 'mongoose';

let isConnected = false; // variable to track connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) {
        return console.log('MONGODB_URI is not set');
    }

    if(isConnected) {
        console.log('=> using existing database connection');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected = true;
        console.log('mongoDB connected')
    } catch(error) {
        console.log('=> error connecting to database:', error);
    }
}
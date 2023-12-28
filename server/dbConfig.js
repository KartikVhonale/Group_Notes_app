const mongoose = require('mongoose');

const url = 'mongodb+srv://vhonalekm:9175499766k11@cluster0.asbsm1p.mongodb.net/?retryWrites=true&w=majority';
// RpRVlUg1kujCbidk

const dbConnect = async ()=>{
    try {
        await mongoose.connect(url);
        console.log('Mongodb connect succesfully')
    } catch (error) {
        console.log(error)
    } 
}

module.exports = dbConnect
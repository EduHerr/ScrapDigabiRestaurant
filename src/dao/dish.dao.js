require('../../config/database');
const Dish = require('../model/Dish');

const crear = async (data) => {
    try{
        const dish = new Dish(data);

        await dish.save();
        return true;
    }
    catch(e){
        throw e;
    }
}

const leer = async() => {
    try{
        const _Dishes = await Dish.find().populate('Source').exec();
        return _Dishes;
    }
    catch(e){
        throw e;
    }
}

module.exports = { crear, leer };
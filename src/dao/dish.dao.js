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

const leer = async (data) => {
    try{
        const _Dishes = await Dish.find().exec();
        return _Dishes;
    }
    catch(e){
        throw e;
    }
}

module.exports = { crear, leer };
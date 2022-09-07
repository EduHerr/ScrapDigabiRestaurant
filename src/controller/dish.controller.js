const { crear, leer } = require('../controller/dish.dao');

/*#region CRUD*/
const create = async(data) => {
    try{
        const result = await crear(data);
        return result;
    }
    catch(e){
        throw e;
    }
}

const read = async() => {
    try{
        const _dishes = await leer();
        return _dishes;
    }
    catch(e){
        throw e;
    }
}
/*#endregion*/

module.exports = { create, read };
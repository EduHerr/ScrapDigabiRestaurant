const { crear } = require('../dao/source.dao');

const create = async(data) => {
    try{
        const _idSource = await crear(data);
        return _idSource;
    }
    catch(e){
        throw e;
    }
}

module.exports = { create }
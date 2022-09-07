require('../../config/database');
const Source = require('../model/Source');

const crear = (data) => {
    return new Promise((resolve, reject) => {
        const source = new Source(data);

        //Save
        source.save()
        .then(Source => { resolve(Source.id) })
        .catch(err => reject(err));
    });
}

module.exports = { crear };
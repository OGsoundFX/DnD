require('dotenv').config();

module.exports = {

    getDbConnectionString: function() {
        return `${process.env.CONNECTLINK}`;
    }

}

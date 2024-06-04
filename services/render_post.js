const dotenv     = require('dotenv');
dotenv.config( {path: '.env/config.env'} );
const response = require('./response');
const httpRequest = require('./httpRequest');

const render_post_data = async (path, authToken) => {
    try {

        /**
         * @detail
         * Process
         */
        let url = process.env.BACKEND_DOMAIN + path;
        let result = await httpRequest.post(url, {}, authToken);
        if (!result.status) {
            return ( result );
        } else {
            return ( result.data );
        }

    } catch (err) {
        return {
            status: false
        };
    }
}

module.exports = {
    render_post_data
}
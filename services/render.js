const dotenv     = require('dotenv');
dotenv.config( {path: '.env/config.env'} );
const response = require('./../services/response');
const httpRequest = require('./../services/httpRequest');

const render_data = async (path, authToken) => {
    try {

        /**
         * @detail
         * Process
         */
        let url = process.env.BACKEND_DOMAIN + path;
        console.log("🚀 ~ constrender_data= ~ url:", url)
        
        let result = await httpRequest.get(url, authToken);
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


const render_data_post = async (path, authToken, data ={}) => {
    try {

        /**
         * @detail
         * Process
         */
        let url = process.env.BACKEND_DOMAIN + path;
        let result = await httpRequest.post(url, data, authToken);
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
    render_data,
    render_data_post
}
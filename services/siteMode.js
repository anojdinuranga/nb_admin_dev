const express   = require("express")
const app       = express()
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const dotenv     = require('dotenv');
dotenv.config( {path: '.env/config.env'} );

var global = __dirname + "/../views/global/"; // global folder path

const mode = async ( req, res, next ) => {

    /**
     * @Modes
     * 0 - none
     * 1 - Development mode
     * 2 - Comming soon
    **/
    let mode = 0;
    if ( mode === 0 ) {
        next();
    } else if ( mode === 1 ) {
        let dev = await dev_mode(req.headers.cookie);
        if ( !dev ) {
            res.render(
                global + "development.html"
            );
            return;
        } else {
            next();
        }
    } else if ( mode === 2 ) {
        res.render(
            global + "comming-soon.html"
        );
        return;
    } else {
        next();
    }
}

const dev_mode = async ( cookie ) => {

    return new Promise (resolve => {
        let result = getCookie( process.env.DEV_COOKIE, cookie );
        if ( !result.status ) {
            resolve(false);
            return;
        } else {
            resolve(true);
            return;
        }
    })
}

// Get cookie value
const getCookie = (cookie_name, cookie) => {
    const re = new RegExp(`(?<=${cookie_name}=)[^;]*`);
    try {
        return {
            "status": true,
            "data": cookie.match(re)[0]
        }
    } catch {
        return {
            "status": false
        }
    }
};

module.exports = {mode}
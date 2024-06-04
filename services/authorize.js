
const {render_data} = require("./../services/render");
const auth = require("./../json/auth.json");

const authorize = async ( req, res, next ) => {
    
    req.data = {}
    req.authToken =  "";
    req.data.user_name = "";
    req.data.first_name = "";
    req.data.last_name = "";
    req.data.email = "";
    req.data.company = "";
    req.data.address = "";
    req.data.mobile_code = "";
    req.data.mobile = "";
    req.data.image_url = "";

    if ( req.headers.cookie === undefined ) {
        next();
        return;
    }

    let result = getCookie( 'auth', req.headers.cookie );
    

    if ( !result.status ) {
        next();
        return;
    }

    if(result.data === "") {
        next();
        return;
    }
    req.authToken = result.data;

    next();

};

function findKeyContainingString(searchString) {
    let data = auth;
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const array = data[key];
            if (Array.isArray(array)) {
                if (array.some(item => {
                    if (item.includes(":key")) {
                        const regex = new RegExp(item.replace(":key", "(.+)"));
                        return regex.test(searchString);
                    } else {
                        return item === searchString;
                    }
                })) {
                    return key;
                }
            }
        }
    }
    return null; // Return null if not found
}

const authorize2 = async ( req, res, next ) => {

    if ( req.headers.cookie === undefined ) {
        res.redirect("/");
        next();
        return;
    }

    let result = getCookie( 'auth', req.headers.cookie );

    if ( !result.status ) {
        res.redirect("/");
        next();
        return;
    }

    let check = await render_data('/api/v1/user/check', result.data);
    if(!check.status || (check.data.role !== 1 && check.data.role !== 4)){
        res.redirect("/");
        return;
    }

    req.data = {}

    req.authToken = result.data;
    req.data.user_name = check.data.user_name;
    req.data.first_name = check.data.first_name;
    req.data.last_name = check.data.last_name;
    req.data.email = check.data.email;
    req.data.company = check.data.company;
    req.data.address = check.data.address;
    req.data.mobile_code = check.data.mobile_code;
    req.data.mobile = check.data.mobile;
    req.data.image_url = check.data.image_url;
    req.data.role = check.data.role;
    req.data.permissionList = check.data.permissionList.map(obj => obj.key_name);

    let authKey = (findKeyContainingString(req.path.substring(1, req.path.length))); // Get auth key related to the path
    if(!req.data.permissionList.includes(authKey) && req.path !== "/home" && req.data.role !== 1) {
        res.redirect("/");
        return;
    }

    next();

};

const authorize3 = async ( req, res, next ) => {

    if ( req.headers.cookie === undefined ) {
        res.redirect("/");
        return;
    }

    let result = getCookie( 'auth', req.headers.cookie );

    if ( !result.status ) {
        res.redirect("/");
        return;
    }

    let check = await render_data('/api/v1/user/check', result.data);
    if(!check.status || check.data.role !== 1){
        res.redirect("/");
        return;
    }

    req.data = {}

    req.authToken = result.data;
    req.data.user_name = check.data.user_name;
    req.data.first_name = check.data.first_name;
    req.data.last_name = check.data.last_name;
    req.data.email = check.data.email;
    req.data.company = check.data.company;
    req.data.address = check.data.address;
    req.data.mobile_code = check.data.mobile_code;
    req.data.mobile = check.data.mobile;
    req.data.image_url = check.data.image_url;
    return req.authToken;

};

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

module.exports = {
    authorize,
    authorize2,
    authorize3
};
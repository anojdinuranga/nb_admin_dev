const express = require("express");
const router = express.Router();
const dotenv     = require('dotenv');
dotenv.config( {path: '.env/config.env'} );
const response = require('./../services/response');
const httpRequest = require('./../services/httpRequest');
const {authorize, authorize3} = require('./../services/authorize');
const validate      = require('./../validation/api.validate'); // Input validations
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');


// Set up Multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/api/v1/user/login", authorize, async (req, res) => {

    try {

        try {

            const data = await validate.data_validate.validateAsync(req.body);
            
            try{
    
                /**
                 * @detail
                 * Process
                 */
                let url = process.env.BACKEND_DOMAIN + req.path;
                let result = await httpRequest.post(url, data, req.authToken)
                if (!result.status) {
                    res.status(200).send( result );
                } else {
                    if (!result.data.status) {
                        res.status(200).send( result.data );
                    } else {
                        res.cookie("auth", result.data.data.accessToken, { 
                            httpOnly: true,
                            maxAge: process.env.JWTAMAXAGE,
                        });
                        res.status(200).send( response.success( "0200" ) );
                    }
                }
    
            } catch (err){
                res.status(200).send( response.error( "0500" ) );
            }
            
        } catch (err) {
            console.error( err );
            res.status(200).send( response.error( "0000", err.details[0].message ) );
        }

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/logout", authorize, async (req, res) => {

    try {

        /**
         * @detail
         * Process
         */
        res.cookie("auth", req.authToken, { 
            httpOnly: true,
            maxAge: 0,
        });

        res.redirect("/");
        

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.post("/api/v1/*", authorize, async (req, res) => {

    try {

        try {
            
            const data = await validate.data_validate.validateAsync(req.body);
            
            try{
    
                /**
                 * @detail
                 * Process
                 */
                let url = process.env.BACKEND_DOMAIN + req.path;
                let result = await httpRequest.post(url, data, req.authToken);
                console.log("🚀 ~ router.post ~ req.authToken:", req.authToken)
                if (!result.status) {
                    res.status(200).send( result );
                } else {
                    res.status(200).send( result.data );
                }
    
            } catch (err){
                res.status(200).send( response.error( "0500" ) );
            }
            
        } catch (err) {
            console.error( err );
            res.status(200).send( response.error( "0000", err.details[0].message ) );
        }

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});

router.get("/api/v1/*", authorize, async (req, res) => {

    try {

        /**
         * @detail
         * Process
         */
        let url = process.env.BACKEND_DOMAIN + req.path;
        let result = await httpRequest.get(url, req.authToken);
        if (!result.status) {
            res.status(200).send( result );
        } else {
            res.status(200).send( result.data );
        }

    } catch (err) {
        console.log(err);
        res.render(
            global + "500.html"
        );
    }

});


// Endpoint to handle the file upload and send it to another server
router.post("/api/upload", upload.single('image'), async (req, res) => {
    let t = await authorize3(req, res);
    try {
        // Get the file data and other parameters from the request
        const file = req.file;
        const data = await validate.data_validate.validateAsync(req.body);

        // Check if a file was uploaded
        if (!file) {
            return res.status(400).send("No file uploaded.");
        }

        // Prepare the FormData for the Axios request
        const formData = new FormData();
        // const blob = new Blob([file.buffer], { type: file.mimetype });

        formData.append('imageId', data.imageId);
        formData.append('resultId', data.resultId);
        formData.append('image', file.buffer, { filename: file.originalname });

        // formData.append('imageId', imageId);
        // formData.append('resultId', resultId);

        // Make the Axios request to another server
        const response = await axios.post(process.env.BACKEND_DOMAIN+'/api/v1/image/upload', formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${t}`
            },
        });

        // Handle the response from the other server
        console.log(response.data);
        res.status(200).send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;

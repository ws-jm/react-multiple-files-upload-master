let express = require('express'),
    mongoose = require('mongoose'),
    AWS = require('aws-sdk'),
    fs = require('fs');
    router = express.Router();

// User model
let User = require('../models/User');

router.post('/upload-images', (req, res) => {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name,
        phonenumber : req.body.phonenumber,
        imgCollection: req.body.imageurl
    });

    let imageurl = [], awsURL = [];

    imageurl.push(req.body.imageurl.normal);
    imageurl.push(req.body.imageurl.large);
    imageurl.push(req.body.imageurl.thumb);


    const ID = "AKIAVQKCIT5NB6QDUEUH";
    const SECRET = "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";
    const BUCKET_NAME = 'test-bucket';

    const s3 = new AWS.S3({
        accessKeyId: ID,
        secretAccessKey: SECRET
    })

    imageurl.map((urls) =>{
        // Read content from the file
        const fileContent = fs.readFileSync(urls);

        // Setting up S3 upload parameters
        const params = {
            Bucket: BUCKET_NAME,
            Key: urls, // File name you want to save as in S3
            Body: fileContent
        };

        // Uploading files to the bucket
        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
        });

        awsURL.push(data.Location);

    })
    
    user.save().then(result => {
        res.status(201).json({
            message: "Donee upload!",
            userCreated: {
                _id: result._id,
                name : result.name,
                phonenumber : result.phonenumber,
                imgCollection: result.awsURL
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })

})

module.exports = router;
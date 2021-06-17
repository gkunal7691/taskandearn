const AWS = require('aws-sdk');
const Files = require('../models').Files;
const fs = require('fs');


AWS.config.update({
    accessKeyId: "AKIA25JSAUFAOCGAYC6N",
    secretAccessKey: "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",
    region: 'ap-south-1'
});


module.exports = {

    email: function (toEmail, templateData, subject, callback) {

        // Create sendEmail params 
        var params = {
            Destination: { /* required */
                ToAddresses: [
                    toEmail,
                    /* more items */
                ]
            },
            Message: { /* required */
                Body: { /* required */
                    Html: {
                        Charset: "UTF-8",
                        Data: templateData
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: "TEXT_FORMAT_BODY"
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject
                }
            },
            Source: 'notification@taskandearn.com', /* required */
        };

        // Create the promise and SES service object
        var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
        sendPromise.then(
            function (data) {
                callback({ success: true, data: data });
            }).catch(
                function (err) {
                    callback({ success: false, data: err });
                });
        // snippet-end:[ses.JavaScript.email.sendEmail]
    },


    uploadFile: function (file, Bucket, ACL, callback) {
        let timeStamp = new Date().getTime();
        let splitFile = file.originalname.split(".");
        let uniqueFile = splitFile[0] + "_" + timeStamp + "." + splitFile[1]
        let fileType = file.mimetype;

        const params = {
            Bucket: Bucket,
            Key: uniqueFile, //filename on aws
            ACL: ACL,
            ContentType: file.mimetype,

            Body: fs.createReadStream(file.path)      //image content
        };
        let s3 = new AWS.S3();
        s3.upload(params, function (err, data) {
            if (err) {
                throw err;
            }
            // console.log(`File uploaded successfully. ${data.Location}`);

            Files.create({
                fileName: uniqueFile, downloadLink: data.Location, bucket: Bucket, ACL: ACL,
                fileType: fileType.split("/")[1]
            }).then((createdFile) => {
                console.log(`File uploaded successfully. ${createdFile}`);
                callback(createdFile.fileId);
            })
        });
    },

    deleteFile: function (fileId, callback) {
        Files.findOne({ where: { fileId: fileId } }).then((fileData) => {
            if (fileData.bucket) {
                let s3 = new AWS.S3();
                var deleteParams = {
                    Bucket: fileData.bucket,
                    Key: fileData.fileName
                };
                s3.deleteObject(deleteParams, function (err, data) {
                    if (err);  // console.log(err, err.stack); // an error occurred
                    else  // console.log(data);           // successful response
                        Files.destroy({ where: { fileId: fileData.fileId } }).then((deletedFile) => {
                            callback(deletedFile)
                        })
                });
            } else {
                Files.destroy({ where: { fileId: fileData.fileId } }).then((deletedFile) => {
                    callback(deletedFile)
                })
            }
        })

    },


}
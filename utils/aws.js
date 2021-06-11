const AWS = require('aws-sdk');

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
    }



}
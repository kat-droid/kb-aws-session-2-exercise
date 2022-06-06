// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/

// Load the AWS SDK
var AWS = require('aws-sdk'),
    region = "ap-southeast-1",
    secretName = "arn:aws:secretsmanager:ap-southeast-1:113272194541:secret:kb_contact_app_creds-RRkoJF",
    secret,
    decodedBinarySecret;

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    region: region
});

module.exports.getSecrets = async (secretName) => {
    return new Promise ((resolve, reject) => {
        client.getSecretValue({SecretId: secretName}, function(err, data) {
            if (err) {
                reject(err)
            }
            else {
                // Decrypts secret using the associated KMS key.
                // Depending on whether the secret is a string or binary, one of these fields will be populated.
                if ('SecretString' in data) {
                    secret = data.SecretString;
                    resolve(JSON.parse(secret))
                } else {
                    let buff = new Buffer(data.SecretBinary, 'base64');
                    decodedBinarySecret = buff.toString('ascii');
                    resolve(JSON.parse(decodedBinarySecret));
                }
            }
            
            // Your code goes here. 
        });
    })
}

// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.


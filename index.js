const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// libray responsible for encrypt body data + event type
var crypto = require('crypto');

// Example of how the express library handles the request.
app.post('/', (req, res) => {
     
    // Key that will be used to encrypt JSON body data and event type.
    // Make sure the key used is the same key for the event type that is being handled.
    var key = 'rr_IdR1vKXxqurQpVSuWW9b';
    var webhook_event = "MemberAdd";
    

    // Get the JSON body raw data
    var payload = req

    // Concatenate payload JSON body raw data with webhook event to match 
    // the content that was used before encrypting the signature.
    var content = `${payload}.${webhook_event}`;

    // Encrypt content using the SHA12 algorithm and convert it to a base 64 string.
    var hmacSignature = crypto.createHmac('SHA512', key).update(content).digest('base64');
    var headers = req.headers['rr-signature'] 
    // Compare the encrypted data against the RR-Signature header. 
    if(hmacSignature === headers){
        console.log("valid signature")
    }
    else{
        console.log("invalid");
        console.log("payload: ",payload)
        console.log("content: ",content)
        console.log("headers: ",req.headers)
        console.log("sign: ",headers)
        console.log("hmac: ",hmacSignature);
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
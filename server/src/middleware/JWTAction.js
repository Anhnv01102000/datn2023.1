var jwt = require('jsonwebtoken');
require('dotenv').config()


const CreateJWT = (payload) => {
    const key = process.env.JWT_SECRET
    let token = jwt.sign(payload, key);
    // console.log({ token })
    return token
}

const veryfiToken = (token) => {
    const key = process.env.JWT_SECRET
    const validate = jwt.verify(token, key, function (err, decoded) {
        if (err) {
            console.log({ err })
            return null
        }
        // console.log(decoded) // bar
        return decoded
    });

    return validate


}
module.exports = {
    CreateJWT, veryfiToken
};
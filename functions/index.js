const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();


/**
 * Here we are using Gmail to send
 */

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alfredemmanuelinyang@gmail.com',
        pass: '@comet2020'
    }
});


exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        
        // getting dest email by query string
        const dest = req.query.dest;

        const mailOptions = {
            from: "Alfred Emmanuel <alfredemmanuelinyang@gmail.com>",
            to: dest,
            subject: "Thank You",
            html: `
                <p style="fot-size: 18px">Thank you for visiting my website.</p>
                <br />
                <p>Please stay connected through any of the social media platforms, I will be glad to have you see more of what I am capable of. I look forward to working for you!</p>
                <br />
                <br />
                <p>Best Regards, Codefred<p>
            `
        }

        // returning result
        return transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                return res.send(error.toString());
            }
            return res.send("Message Sent!")
        });
    });
});




exports.onMessageCreate = functions.database.ref('/messages').onCreate((snapshot, context) => {
    // const messageId = context.params.messageId;

    // console.log(`New contact - ${messageId}`);

    const messageData = snapshot.val();
    console.log(messageData.text);
});
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//



exports.sendHttpPushNotificationtoALL = functions.https.onRequest((req, res)  =>{
    const notTitle = req.body.notTitle;
    const notBody = req.body.notBody;
    const notContent = req.body.notContent;
    console.log("Req Siva: " + req.body.notTitle);

    const payload = {
        notification: {
            title: notTitle + '',
            body: notBody + '',
            sound: "default"
        },
        data: {
            body: notContent + '',
        }
    };
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    return admin.messaging().sendToTopic("pushNotifications", payload, options).then( response =>{
        res.status(200).send("Notification sent successfully");
    }).catch(error =>{
        res.status(400).send("Error: "+ error);
    });
});

exports.sendHttpPushNotificationtoID = functions.https.onRequest((req, res)  =>{
    const deviceID = req.body.deviceID;
    const notTitle = req.body.notTitle;
    const notBody = req.body.notBody;
    const notContent = req.body.notContent;
    console.log("Req Siva: " + req.body.notTitle);

    const payload = {
        notification: {
            title: notTitle + '',
            body: notBody + '',
            sound: "default"
        },
        data: {
            body: notContent + '',
        }
    };
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    return admin.messaging().sendToDevice(deviceID, payload, options).then( response =>{
        res.status(200).send(deviceID + "Notification sent successfully");
    }).catch(error =>{
        res.status(400).send("Error: "+ error);
    });
});

/*exports.helloWorld = functions.https.onRequest((request, response) => {
    //   functions.logger.info("Hello logs!", {structuredData: true});
    const d = new Date();
    let ms = d.getMilliseconds();
    response.send("Hello Elvis bro from Siva! on " + ms);
});*/

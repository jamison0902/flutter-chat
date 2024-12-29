const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');

admin.initializeApp();

exports.myFunction = onDocumentCreated('chat/{messageId}', async (event) => {
  const messageData = event.data;
  
  if (!messageData) return;

  await admin.messaging().send({
    notification: {
      title: messageData.username,
      body: messageData.text,
    },
    data: {
      click_action: 'FLUTTER_NOTIFICATION_CLICK',
    },
    topic: 'chat',
  });
});

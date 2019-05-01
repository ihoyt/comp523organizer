const express = require('express');
const app = express();
var admin = require("firebase-admin");

var serviceAccount = require("./selo-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://selo-c10fc.firebaseio.com"
});
const accepted_arr = []
const rejected_arr = []
const maybe_arr = []
const requested_arr = []

const emailBody = ''
const emailSubject = ''


async function getEmail(type) {
  
    var db = admin.firestore();
    var collection = db.collection('emails');
    const query = collection
    const snapshot = await query.get();
    return snapshot.docs.map((doc) => {
      // console.log(doc._fieldsProto.type.stringValue)
      if (doc._fieldsProto.type.stringValue == type) {
        arr = [doc._fieldsProto.subject.stringValue, doc._fieldsProto.body.stringValue]
        return arr
      }
    }

  )
 }
 
 getEmail()
async function getProposals(){

  var db = admin.firestore();

  var collection = db.collection('proposals');

  const query = collection

  const snapshot = await query.get();
count = 0
  return snapshot.docs.map((doc) => {
    // console.log(doc._fieldsProto.category.integerValue)
    
    value = doc._fieldsProto.category.integerValue
    email = doc._fieldsProto.proposeeEmail.stringValue
    // console.log(doc._fieldsProto.proposeeEmail.stringValue)
    
    if (value == 1 && email) {
      accepted_arr.indexOf(email) === -1 ? accepted_arr.push(email) : console.log('already exists')
      // console.log(accepted_arr)
    }
    if (value == 2 && email) {
      maybe_arr.indexOf(email) === -1 ? maybe_arr.push(email) : console.log('already exists')
      // console.log('maybe')

    }
    if (value == 3 && email) {
      rejected_arr.indexOf(email) === -1 ? rejected_arr.push(email) : console.log('already exists')
    }
}

)


}

getProposals()







const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');






app.get('/send-email-template-accepted', (req, res) => {
  
  arr = getEmail('accepted').then((arr) => {
    


    const msg = {
      to: accepted_arr,
      from: 'stotts@cs.unc.edu',
      subject: arr[2][0],
      text: arr[2][1],
      html: '<strong>' + arr[1] + '</strong>'
    };
    
    
    sgMail.send(msg).then((msg) => {
      res.send('Email Successfully Sent')
      res.redirect('/')

    }).catch((err) => {
      res.send('Email Failed to Send ' + err)
    });
  })
  
  


})

app.get('/send-email-template-rejected', (req, res) => {


    arr = getEmail('rejected').then((arr) => {
    
  

    const msg = {
      to: rejected_arr,
      from: 'stotts@cs.unc.edu',
      subject: arr[0][0],
      text: arr[0][1],
      html: '<strong>' + arr[0][1] + '</strong>'
    };
    console.log('rejected array' + rejected_arr)

    
    
    sgMail.send(msg).then((msg) => {

      res.send('Email Successfully Sent')
      res.redirect('/')

    }).catch((err) => {
      res.send('Email Failed to Send ' + err)
    });
  })
  
  

})

app.get('/send-email-template-maybe', (req, res) => {
    arr = getEmail('maybe').then((arr) => {
    
  

    const msg = {
      to: maybe_arr,
      from: 'stotts@cs.unc.edu',
      subject: arr[3][0],
      text: arr[3][1],
      html: '<strong>' + arr[3][1] + '</strong>'
    };
    
    
    sgMail.send(msg).then((msg) => {
      res.send('Email Successfully Sent')
      res.redirect('/')

    }).catch((err) => {
      res.send('Email Failed to Send ' + err)
    });
  })


})







if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));



  const path = require('path')

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

const PORT = process.env.PORT || 5000
app.listen(PORT)

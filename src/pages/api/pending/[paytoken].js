import admin from 'firebase-admin';
console.log('trying to initialize...')
admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.GOOGLE_CLOUD_KEY_JSON))
    })


export default function handler(req, res) {
    const {
      query: { paytoken },
    } = req;
    console.log('req body: ', req.body);
    console.log(`paytoken: ${paytoken}`);

    const db = admin.firestore();

    //check existing pending entry:
    db.collection('pending').doc(paytoken).get().then(
      (doc) => {
        if (doc.exists) {
          res.end('pending entry already exists')
        } else {
        //create pending payment entry:
          db.collection('pending').doc(paytoken).set({
            total: req.body.total,
            user: req.body.user,
            cart: req.body.cart,
          }).then(() => {
            console.log('pending payment entry created with id: ', paytoken);
            res.end(`pending entry created successfullywith paytoken: ${paytoken}`)
          }).catch(error => console.log(error))
      
        }
      }
    ).catch(error => {console.log(error)});
}
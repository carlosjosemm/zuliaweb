import mercadopago from 'mercadopago';
import {v4} from 'uuid';
console.log('trying to require admin...')
const admin = require('firebase-admin');
// admin.app().delete().then(() => console.log('Firebase app deleted successfully')).catch((error) => console.log(error));
// const serviceAccount = require('../../../data/tiendazuliaweb-c2d6d6398f0e.json');
// console.log('trying to initialize...')
    // admin.initializeApp({
    // credential: admin.credential.cert(JSON.parse(process.env.GOOGLE_CLOUD_KEY_JSON))
    // })

if (admin.app.length==1) { 
    console.log('trying to initialize...')
    admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.GOOGLE_CLOUD_KEY_JSON))
    })
    console.log('lenght after init: ', admin.app.length)
};
// console.log('trying to create db...')
// const db = admin.firestore();
//  console.log('ENV: ', process.env.NODE_ENV);

export default (req, res) => {
    const configAccess_token = process.env.ENV_ML_ACCESSKEY;
    mercadopago.configurations.setAccessToken(configAccess_token);

    const token = req.body.token
    const payment_method_id = req.body.payment_method_id;
    const installments = req.body.installments;
    const issuer_id = req.body.issuer_id;

    var payment_data = {
        transaction_amount: 100,
        token: token,
        description: 'Payment description',
        installments: parseInt(installments),
        payment_method_id: payment_method_id,
        issuer_id: issuer_id,
        payer: {
        email: 'payer@email.com'
        }
    };
    console.log('trying to create db...')
    const db = admin.firestore();

    // Guarda y postea el pago
    mercadopago.payment.save(payment_data).then((data) => {
        // ...    
        // Imprime el estado del pago
        console.log('response data: ', data.body.status);
        if (data.status=='201') {
            const token = v4();
            console.log('token: ', token);
            db.collection('data store').doc(token).set({
                outcome: data.body.status,
                detail: data.body.status_detail,
            });
            res.redirect(`${(process.env.NODE_ENV=='production')? 'https://zuliaweb.vercel.app/transaction' : '/transaction' }/${token}`);
        } else {
            const badtoken = v4();
            console.log('badtoken: ', badtoken);
            res.redirect(`${(process.env.NODE_ENV=='production')? 'https://zuliaweb.vercel.app/transaction' : '/transaction' }/${badtoken}`);
        }
    }).catch( (error) => {
        // ...
        console.error(error)
        const badtoken = v4();
        res.redirect(`https://zuliaweb.vercel.app/transaction/${badtoken}`);
    });
}
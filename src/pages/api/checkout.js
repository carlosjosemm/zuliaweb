import mercadopago from 'mercadopago';
import {v4} from 'uuid';
const admin = require('firebase-admin');
const serviceAccount = require('../../../data/tiendazuliaweb-c2d6d6398f0e.json');

console.log('FIREBASE INSTANCE ID: ', admin.app().instanceId);
if(!admin.app().instanceId) { 
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    })
};
const db = admin.firestore();

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

    // Guarda y postea el pago
    mercadopago.payment.save(payment_data).then((data) => {
        // ...    
        // Imprime el estado del pago
        console.log('response data: ', data);
        if (data.status=='201') {
            const token = v4();
            db.collection('data store').doc(token).set({
                outcome: data.body.status,
                detail: data.body.status_detail,
            });
            res.redirect(`/transaction/${token}`);
        } else {
            const badtoken = v4();
            res.redirect(`/transaction/${badtoken}`);
        }
    }).catch( (error) => {
        // ...
        console.error(error)
        const badtoken = v4();
        res.redirect(`/transaction/${badtoken}`);
    });
}
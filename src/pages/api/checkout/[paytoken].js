//CHECKOUT 
import admin from 'firebase-admin';
import mercadopago from 'mercadopago';

// console.log('trying to initialize...')
// admin.initializeApp({
//     credential: admin.credential.cert(JSON.parse(process.env.GOOGLE_CLOUD_KEY_JSON))
//     })

const outcomeType = {
    accredited: "accredited",
    pending_contingency: "pending_contingency",
    cc_rejected_other_reason: "cc_rejected_other_reason",
    cc_rejected_call_for_authorize: "cc_rejected_call_for_authorize",
    cc_rejected_insufficient_amount: "cc_rejected_insufficient_amount",
    cc_rejected_bad_filled_security_code: "cc_rejected_bad_filled_security_code",
    cc_rejected_bad_filled_date: "cc_rejected_bad_filled_date",
    cc_rejected_bad_filled_other: "cc_rejected_bad_filled_other",
    none: "none",
} 


export default function handler(req, res) {
    const {
      query: { paytoken },
    } = req;
    console.log(`paytoken from checkout: ${paytoken}`);

    const configAccess_token = process.env.ENV_ML_ACCESSKEY;
    mercadopago.configurations.setAccessToken(configAccess_token);

    const db = admin.firestore();

    db.collection('pending').doc(paytoken).get().then(
        (doc) => {
            if (doc.exists) {
                const pendingPayment = doc.data();
                const token = req.body.token;
                const payment_method_id = req.body.payment_method_id;
                const installments = req.body.installments;
                const issuer_id = req.body.issuer_id;
                var payment_data = {
                    transaction_amount: parseInt(pendingPayment.total),
                    token: token,
                    description: 'Checkout',
                    installments: parseInt(installments),
                    payment_method_id: payment_method_id,
                    issuer_id: issuer_id,
                    payer: {
                    email: pendingPayment.user
                    }
                };
                mercadopago.payment.save(payment_data).then(
                    (data) => {
                        console.log('response data from ML: ', data.body.status_detail);
                        console.log('response data from ML: ', data.body.status)
                        if (data.status=='201') {
                            db.collection('data store').doc(paytoken).set({
                                outcome: data.body.status,
                                detail: data.body.status_detail,
                                total: pendingPayment.total,
                                user: pendingPayment.user,
                                cart: pendingPayment.cart,
                            }).then(() => {
                                res.redirect(`${(process.env.NODE_ENV=='production')? 'https://zuliaweb.vercel.app/transaction' : '/transaction'}/${paytoken}`);
                            }).catch((error) => console.log(error));
                        } else {
                            const badtoken = v4();
                            console.log('payment failed, badtoken: ', badtoken);
                            res.redirect(`${(process.env.NODE_ENV=='production')? 'https://zuliaweb.vercel.app/transaction' : '/transaction' }/${badtoken}`);
                        }
                    }
                )
            } else {
                console.log('pending payment doesnt exists, paytoken tried: ', paytoken);
                const badtoken = v4();
                res.redirect(`${(process.env.NODE_ENV=='production')? 'https://zuliaweb.vercel.app/transaction' : '/transaction' }/${badtoken}`);

            }
        }
    )
}
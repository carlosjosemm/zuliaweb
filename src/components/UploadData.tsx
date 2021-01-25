import db from '../firebase';
import * as ProductDataRaw from '../../data/product-data.json';


const UploadData = () => {

    const products = Object.entries(ProductDataRaw)[0][1]; //object with parsed data of products from the json file
    const upQuery = Object.keys(products); // array of all products ids
    console.log(upQuery);
    upQuery.forEach((id) => {
            db.collection('products').doc(id).set({
              availability: (products[id][0].price == 'N/A')? false : true,
              discount: products[id][0].discount,
              ofert: products[id][0].ofert,
              price: parseFloat(products[id][0].price),
              unit: products[id][0].unity? 'Kg' : 'unidad', 
              unity: products[id][0].unity,
              name: products[id][0].name,
              photoURL:products[id][0].photoURL,
              hot: products[id][0].hot,
              new: products[id][0].new,
            }).then((id) => {
              console.log(`producto creado con id: ${id}`);
            }).catch((error) => {
              console.error("Error writing document: ", error); 
            });
    })
  

    return (
        <>
            <div></div>
        </>
    );
}

export default UploadData;
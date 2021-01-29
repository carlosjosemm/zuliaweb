export type ProductData = {
    new?: boolean;
    photoURL: string;
    price: number;
    unity: boolean;
    availability: boolean;
    discount: number;
    hot?: boolean;
    ofert: boolean;
    name: string;
    unit: string;
    category?: string;
}

export interface CartItem {
    product: ProductData
    quantity: number;
    finalprice: number;
}
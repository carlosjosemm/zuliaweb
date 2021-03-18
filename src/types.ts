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

export type outcomeTypes = "accredited" | "pending_contingency" | "cc_rejected_other_reason" | "cc_rejected_call_for_authorize" | "cc_rejected_insufficient_amount" | "cc_rejected_bad_filled_security_code" | "cc_rejected_bad_filled_date" | "cc_rejected_bad_filled_other" | "none";

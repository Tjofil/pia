import { Product } from "./product";

export class Receipt {
    items: Item[] = new Array<Item>();
    closingDate: Date;
    payementMethod: string = '';
    value: number; //taxIncluded
    tax: number;

    cashGiven: number;
    cashChange: number;

    slypReceipt: number;

    virmanTaxId: number;

    buyerId: number;
    buyerName: string = '';
    buyerSurname: string = '';

    location: string = '';
    department: string = '';
    tableId: string = '';
}

export class Item {
    product: Product = new Product()
    amount: number;
    sellingPrice: number;
}
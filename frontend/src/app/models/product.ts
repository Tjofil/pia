import { Category } from "./category";

export class WarehouseStat {
    warehouseName: string = '';
    purchasePrice: number = 0;
    sellingPrice: number = 0;
    currAmount: number = 0;
    minAmount: number = 0;
    maxAmount: number = 0;
}
export class Product {
    code: number = 0;
    name: string = '';
    unit: string = '';
    taxRate: number = 0;
    producer: string = '';
    prodType: string = '';
    countryOrigin: string = '';
    foreignName: string = '';
    barcode: number = 0;
    customsTariff: number = 0;
    enforceTax: boolean = false;
    enforceExcise: boolean = false;
    minAmountGlobal: number = 0;
    maxAmountGlobal: number = 0;
    description: string = '';
    declaration: string = '';
    warehouseStats: WarehouseStat[];
    categoryName : string = '';
}

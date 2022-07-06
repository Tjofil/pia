export class Customer {
    constructor(taxId, daysForPaying, rebate, name) {
        this.taxId = taxId;
        this.daysForPaying = daysForPaying;
        this.rebate = rebate;
        this.name = name;
    }
    taxId : number;
    name: string;
    daysForPaying: number;
    rebate: number;
}
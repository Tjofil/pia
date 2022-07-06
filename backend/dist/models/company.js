"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Company = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    companyName: {
        type: String
    },
    companyAdress: {
        type: String
    },
    mail: {
        type: String
    },
    phone: {
        type: String
    },
    taxId: {
        type: Number
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    regId: {
        type: Number
    },
    logo: {
        type: String
    },
    loginDone: {
        type: Boolean
    },
    approval: {
        type: String
    },
    category: {
        type: String
    },
    activityCode: {
        type: String
    },
    inTaxSystem: {
        type: Boolean
    },
    bankAccounts: {
        type: [{ bankName: String, accountId: String }]
    },
    warehouses: {
        type: [{ name: String, id: String }]
    },
    cashRegs: {
        type: [{
                location: String,
                cgType: String,
                departments: [{
                        name: String,
                        tables: [{
                                id: Number,
                                pos: { x: Number, y: Number },
                                lastOk: { x: Number, y: Number },
                                radius: Number,
                                round: Boolean
                            }]
                    }]
            }]
    },
    products: {
        type: [{
                code: Number,
                name: String,
                unit: String,
                taxRate: Number,
                producer: String,
                prodType: String,
                countryOrigin: String,
                foreignName: String,
                barcode: Number,
                customsTariff: Number,
                enforceTax: Boolean,
                enforceExcise: Boolean,
                minAmountGlobal: Number,
                maxAmountGlobal: Number,
                description: String,
                declaration: String,
                warehouseStats: [{
                        warehouseName: String,
                        purchasePrice: Number,
                        sellingPrice: Number,
                        currAmount: Number,
                        minAmount: Number,
                        maxAmount: Number,
                    }],
                categoryName: String
            }]
    },
    customers: [{
            taxId: Number,
            name: String,
            daysForPaying: Number,
            rebate: Number
        }],
    categories: [{
            parent: String,
            name: String
        }],
    pendingReceipts: [{
            items: [{
                    name: String,
                    amount: Number,
                }],
            closingDate: Date,
            payementMethod: String,
            cashGiven: Number,
            cashChange: Number,
            slypReceipt: Number,
            virmanTaxId: String,
            buyerId: Number,
            buyerName: String,
            buyerSurname: String,
            location: String,
            department: String,
            tableId: Number
        }],
    closedReceipts: [{
            items: [{
                    name: String,
                    amount: Number,
                }],
            closingDate: Date,
            payementMethod: String,
            value: Number,
            tax: Number,
            cashGiven: Number,
            cashChange: Number,
            slypReceipt: Number,
            virmanTaxId: String,
            buyerId: Number,
            buyerName: String,
            buyerSurname: String,
            location: String,
            department: String,
            tableId: Number
        }]
});
exports.default = mongoose_1.default.model('CompanyModel', Company, 'companies');
//# sourceMappingURL=company.js.map
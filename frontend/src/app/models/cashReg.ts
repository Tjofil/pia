import { Table } from "./table";

export class CashReg {
    location: string = '';
    cgType: string = '';
    departments : Department[] = new Array<Department>();

}

export class Department {
    name: string;
    tables: Table[] = new Array<Table>();
}
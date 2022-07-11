export class Table {
    id: string = '';
    pos: { x: number, y: number };
    lastOk : { x: number, y: number };
    radius: number;
    round: boolean;
    constructor(id, radius, round) {
        this.id = id;
        this.pos = { x: 0, y: 0 }
        this.lastOk = { x: 0, y: 0 }
        this.radius = radius;
        this.round = round;
    }
}


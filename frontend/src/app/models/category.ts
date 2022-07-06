export class Category {
    constructor(parent, name) {
        this.parent = parent;
        this.name = name;
    }
    parent : string;
    name : string;
}

export class EditCategory {
    constructor(parent, oldName) {
        this.parent = parent;
        this.oldName = oldName;
        this.name = oldName;
    }
    parent : string;
    oldName : string;
    name : string;
}
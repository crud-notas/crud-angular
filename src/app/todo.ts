export class Todo {
    completed: Boolean;
    editing: Boolean;
    id: Number;

    private _title: String;
    get title() {
        return this._title;
    }
    set title(value: String) {
        this._title = value.trim();
    }

    constructor(id: Number, title: String) {
        this.id = id;
        this.completed = false;
        this.editing = false;
        this.title = title.trim();
    }
}

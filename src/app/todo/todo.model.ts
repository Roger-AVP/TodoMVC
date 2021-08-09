export class Todo {
    title: string;
    completed: boolean;
    todoId ? : number;

    constructor(title: string, completed ? : boolean, todoId: number = 0) {
        this.todoId = todoId;
        this.title = title;
        this.completed = completed ? completed : false;
    }
}

export class TodoUtils {

    static copy(todo: Todo) {
        const copy = new Todo(null, null);
        this.copyProperties(todo, copy);
        return copy;
    }

    static copyProperties(src: Todo, dest: Todo) {
        dest.todoId = src.todoId;
        dest.title = src.title;
        dest.completed = src.completed;
    }
}
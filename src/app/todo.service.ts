import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TOKEN, URL_AUTHORIZATION, URL_AUTHORIZATION_OPT, URL_TASKS_SERVICES } from './config/config';

import { Todo } from './todo/todo.model';

@Injectable()
export class TodoService {

    private lastInsertId = 0;
    private todos: Todo[] = [];
    token = "";

    todosResource = "/api/todos";
    constructor(private http: HttpClient) {
        this.token = localStorage.getItem(TOKEN);
        this.getAll();
        if (this.todos.length > 0) {
            this.lastInsertId = this.todos[this.todos.length - 1].todoId;
        }
    }

    create(title: string): void {
        const todo: Todo = new Todo(title, false);
        this.todos.push(todo);
        this.save(todo);
    }

    findAll() {
        return this.todos;
    }

    update(todo: Todo) {
        todo.title = todo.title.trim();
        if (todo.title.length === 0) {
            this.delete(todo);
        } else {
            this.save(todo);
        }
    }

    delete(todo: Todo): void {
        this.todos = this.todos.filter((t) => t !== todo);
        this.http.delete(`${URL_TASKS_SERVICES}${this.todosResource}/delete?todoId=${todo.todoId}${URL_AUTHORIZATION}${this.token}`)
            .subscribe(res => {}, (error) => {});
    }

    toggle(todo: Todo): void {
        todo.completed = !todo.completed;
        this.save(todo);
    }

    toggleAll(completed: boolean): void {
        this.todos.forEach((t) => t.completed = completed);

        this.http.put(`${URL_TASKS_SERVICES}${this.todosResource}/updatePerList${URL_AUTHORIZATION_OPT}${this.token}`, this.todos)
            .subscribe((todos: Todo[]) => {}, (error) => {});
    }

    clearCompleted(): void {
        const todos = this.todos.filter((t) => t.completed);
        this.todos = this.todos.filter((t) => !t.completed);
        this.http.put(`${URL_TASKS_SERVICES}${this.todosResource}/deletePerList${URL_AUTHORIZATION_OPT}${this.token}`, todos)
            .subscribe(status => {}, (error) => {});

    }

    remaining() {
        return this.todos
            .filter(t => !t.completed)
            .length;
    }

    completed() {
        return this.todos
            .filter(t => t.completed)
            .length;
    }

    getAll() {
        this.fetch().subscribe((todos: Todo[]) => {
            this.todos = todos;
        }, (error) => {

        });

    }


    private fetch(): Observable < any > {
        return this.http.get(`${URL_TASKS_SERVICES}${this.todosResource}/getAll${URL_AUTHORIZATION_OPT}${this.token}`);
    }

    private save(todo: Todo): void {
        this.http.post(`${URL_TASKS_SERVICES}${this.todosResource}/create${URL_AUTHORIZATION_OPT}${this.token}`, todo).subscribe((todo: Todo) => {}, (error) => {});

    }

    getByCompleted(isCompleted: boolean) {
        return this.http.get(`${URL_TASKS_SERVICES}${this.todosResource}/getByCompleted?completed=${isCompleted}${URL_AUTHORIZATION}${this.token}`);
    }


}
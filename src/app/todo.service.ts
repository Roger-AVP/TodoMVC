import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_AUTHORIZATION, URL_AUTHORIZATION_OPT, URL_TASKS_SERVICES } from './config/config';

import { Todo } from './todo/todo.model';

@Injectable()
export class TodoService {

    private static STORAGE_KEY = 'todos-angular-5';
    private lastInsertId = 0;
    private todos: Todo[] = [];
    token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2dlcjJAZ21haWwuY29tIiwiZXhwIjo4ODI4NTQyNDYwLCJpYXQiOjE2Mjg1NDI1MzJ9.p9mmhD0Jgtq201LGJ1EDcnqogoUyHtlObhwe1gTgGl4";


    todosResource = "/api/todos";
    constructor(private http: HttpClient) {

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
        .subscribe(res => { }, (error) => {
            console.log("error" + JSON.stringify(error));
        });
    }

    toggle(todo: Todo): void {
        todo.completed = !todo.completed;
        this.save(todo);
    }

    toggleAll(completed: boolean): void {
        this.todos.forEach((t) => t.completed = completed);

        this.http.put(`${URL_TASKS_SERVICES}${this.todosResource}/updateToggleAll${URL_AUTHORIZATION_OPT}${this.token}`, this.todos)
        .subscribe((todos: Todo[]) => {
            console.log("toggleAll: ", todos);
        }, (error) => {
            console.log("error" + JSON.stringify(error));
        });

        //    this.save(todo);
    }

    clearCompleted(): void {
        this.todos = this.todos.filter((t) => !t.completed);
        //  this.save(todo);
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

    private getAll() {
        /*  const persistedValue = localStorage.getItem(TodoService.STORAGE_KEY);
         try {
             this.todos = JSON.parse(persistedValue || '[]');


         } catch (ignore) {
             this.todos = [];
         } */
        this.fetch().subscribe((todos: Todo[]) => {
            this.todos = todos;
        }, (error) => {
            console.log("error" + JSON.stringify(error));
        });

    }


    private fetch(): Observable<any> {
        return this.http.get(`${URL_TASKS_SERVICES}${this.todosResource}/getAll${URL_AUTHORIZATION_OPT}${this.token}`);
    }

    private save(todo: Todo): void {
        console.log("aca: ", todo);
        this.http.post(`${URL_TASKS_SERVICES}${this.todosResource}/create${URL_AUTHORIZATION_OPT}${this.token}`, todo).subscribe((todo: Todo) => {
        }, (error) => {
            console.log("error" + JSON.stringify(error));
        });

    }


}
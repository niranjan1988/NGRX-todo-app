import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ITodoState } from './todo.reducers';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  isFirstVisit = true;
  
  constructor() { }

  saveToServer(todo: ITodoState) {
    localStorage.setItem('todo', JSON.stringify(todo));
    console.log(todo);
    return of({});
  }

  fetchDatafromServer() {
    const todoItems = localStorage.getItem('todo');
    if (todoItems) {
      return of(JSON.parse(todoItems));
    } else {
      return of({
        todos: [],
        todoSelected: null,
        todoSelectedIndex: -1
      })
    }
  }
}

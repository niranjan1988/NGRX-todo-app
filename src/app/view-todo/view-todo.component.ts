import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { noop } from 'rxjs';
import { DeleteItem, FetchDataFromServer, SaveToServer, SetSelectedItem } from '../todo.actions';
import { Itodo, ITodoState } from '../todo.reducers';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.css']
})
export class ViewTodoComponent implements OnInit {
todoList:Itodo[];
  constructor(public store: Store<{ todo: ITodoState }>,
    public router:Router,
    private todoService:TodoService) { }

  ngOnInit(): void {
    this.store.select('todo')
     .subscribe(res => this.todoList = res.todos);

     this.todoService.isFirstVisit ?this.store.dispatch(new FetchDataFromServer()) : noop;
     this.todoService.isFirstVisit=false;
  }

  deleteTodo(index:number) {
    this.store.dispatch(new DeleteItem(index));
  }

  editTodo(index:number) {
    this.store.dispatch(new SetSelectedItem(index));
    this.router.navigate(['create']);
  }

  saveToServer() {
    this.store.dispatch(new SaveToServer());
  }

}

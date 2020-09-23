import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { empty, noop, pipe } from 'rxjs';
import { delay, map, take, tap } from 'rxjs/operators';
import { AddItem, FetchDataFromServer, UpdateItem } from '../todo.actions';
import { Itodo, ITodoState } from '../todo.reducers';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  todoForm: FormGroup;
  isCreateNew = true;
  

  constructor(private fb: FormBuilder,
    public store: Store<{ todo: ITodoState }>,
    public router: Router,
    private todoService: TodoService) { }

  ngOnInit(): void {

    this.todoForm = this.fb.group({
      task: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.store.select('todo')
      .pipe(
        take(1),
        tap(res => console.log(res)
        ))
      .subscribe(res => {
        if (res.todoSelectedIndex != -1) {
          this.isCreateNew = false;
          this.todoForm.patchValue({ task: res.todoSelected.task, description: res.todoSelected.description })
        }
      });

      this.todoService.isFirstVisit ?this.store.dispatch(new FetchDataFromServer()) : noop;
      this.todoService.isFirstVisit=false;
  }

  resetForm() {
    this.todoForm.reset();
  }

  onSubmit() {
    if (this.isCreateNew) {
      this.store.dispatch(new AddItem({ task: this.todoForm.value.task, description: this.todoForm.value.description }));
      this.todoForm.reset();
    } else {
      this.store.dispatch(new UpdateItem({ task: this.todoForm.value.task, description: this.todoForm.value.description }));
      this.router.navigate(['view']);
    }
  }

}

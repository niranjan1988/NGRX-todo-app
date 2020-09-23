import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { FETCH_DATA_FROM_SERVER, SAVE_TO_SERVER, SetInitialData } from './todo.actions';
import { ITodoState } from './todo.reducers';
import { TodoService } from './todo.service';

@Injectable({ providedIn: 'root' })
export class TodoEffects {

    constructor(
        private actions$: Actions,
        public store: Store<{ todo: ITodoState }>,
        public todoService:TodoService) { }

    @Effect({dispatch : false})
    saveToServer = this.actions$.pipe(
        ofType(SAVE_TO_SERVER),
        withLatestFrom(this.store.select('todo')),
        switchMap(([actionData,res]) =>{ return this.todoService.saveToServer(res)
        })
    )

    @Effect()
    fetchDataFromServer = this.actions$.pipe(
        ofType(FETCH_DATA_FROM_SERVER),
        switchMap(() => { return this.todoService.fetchDatafromServer() }),      
        map((res) => {
            return new SetInitialData(res);
        })
    ) 

}
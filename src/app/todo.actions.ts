import { Action } from '@ngrx/store';
import { ITodoState } from './todo.reducers';

export const ADD_ITEM = "ADD_ITEM";
export const SET_SELECTED_ITEM = "SET_SELECTED_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const SET_UPDATE_ITEM = "SET_UPDATE_ITEM";
export const SAVE_TO_SERVER = "SAVE_TO_SERVER";
export const FETCH_DATA_FROM_SERVER = "FETCH_DATA_FROM_SERVER";
export const SET_INITIAL_DATA = "SET_INITIAL_DATA";

export class AddItem implements Action {
    readonly type = ADD_ITEM;
    constructor(public payload: { task: string, description: string }) { }
}

export class SetSelectedItem implements Action {
    readonly type = SET_SELECTED_ITEM;
    constructor(public payload: number) { }
}

export class DeleteItem implements Action {
    readonly type = DELETE_ITEM;
    constructor(public payload: number) { }
}

export class UpdateItem implements Action {
    readonly type = UPDATE_ITEM;
    constructor(public payload: { task: string, description: string }) { }
}

export class SaveToServer implements Action {
    readonly type = SAVE_TO_SERVER;
}

export class FetchDataFromServer implements Action {
    readonly type = FETCH_DATA_FROM_SERVER;
}

export class SetInitialData implements Action {
    readonly type = SET_INITIAL_DATA;
    constructor(public payload:ITodoState) {}
}

export type todoActionTypes = AddItem | SetSelectedItem | DeleteItem | UpdateItem
| SaveToServer |FetchDataFromServer | SetInitialData;

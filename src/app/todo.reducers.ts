import * as todoActions from './todo.actions';

export interface Itodo {
    task: string,
    description: string
}

export interface ITodoState {
    todos: Itodo[],
    todoSelected: Itodo,
    todoSelectedIndex: number
}

const initialState: ITodoState = {
    todos: [],
    todoSelected: null,
    todoSelectedIndex: -1
};

export function todoReducer(state = initialState, action: todoActions.todoActionTypes) {
    switch (action.type) {
        case todoActions.SET_INITIAL_DATA:
            return { ...state, ...action.payload };

        case todoActions.ADD_ITEM:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };

        case todoActions.SET_SELECTED_ITEM:
            const selectedItem = state.todos.find((item: Itodo, index) => index == action.payload);
            return { ...state, todoSelected: selectedItem, todoSelectedIndex: action.payload };

        case todoActions.UPDATE_ITEM:
            const updatedTodo = { ...state.todoSelected, ...action.payload };
            const prevTodos = [...state.todos];
            prevTodos[state.todoSelectedIndex] = updatedTodo;
            return {
                ...state,
                todos: prevTodos,
                todoSelected: null,
                todoSelectedIndex: -1
            };

        case todoActions.DELETE_ITEM:
            return { ...state, todos: state.todos.filter((item, index) => { return index !== action.payload; }) };

        default:
            return state;
    }
}
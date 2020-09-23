import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { ViewTodoComponent } from './view-todo/view-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './todo.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './todo.effects';
import { TodoService } from './todo.service';

const routes:Routes = [
  {path:'', redirectTo:'create', pathMatch:'full'},
  {path:'create', component:CreateTodoComponent},
  {path:'view', component:ViewTodoComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateTodoComponent,
    ViewTodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({todo:todoReducer}),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

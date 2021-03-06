import { Injectable, OnInit } from '@angular/core';
import { Todo } from './todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  todos: Array<Todo>;
  urlAPI = 'https://pacific-sea-93717.herokuapp.com/note';
  // urlAPI = 'http://localhost:8080/note';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

// export ANDROID_HOME=/Users/marcelosantos/sdk/android-sdk-macosx
// export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
// export PATH=$PATH:"/Users/marcelosantos/sdk"/tools:"/marcelosantos/sdk"/platform-tools

  constructor(private http: HttpClient) {
    this.updateNotes();
  }

  private updateNotes() {
    this.http.get<any>(this.urlAPI).subscribe(
      resp => {
        this.todos = resp.map(r => new Todo(r.id, r.name));
      }
    );
  }

  setAllTo(completed: Boolean) {
    this.todos.forEach((t: Todo) => t.completed = completed);
    this.updateNotes();
  }

  remove(todo: Todo) {
    this.http.delete(this.urlAPI + '/' + todo.id)
      .subscribe(() => this.updateNotes());
  }

  add(title: String) {
    this.http.post(this.urlAPI, JSON.stringify({name: title}), this.httpOptions)
      .subscribe(() => this.updateNotes());
  }

  update(todo: Todo) {
    this.http.put(this.urlAPI, JSON.stringify({id: todo.id, name: todo.title}), this.httpOptions)
      .subscribe(() => this.updateNotes());
  }
}

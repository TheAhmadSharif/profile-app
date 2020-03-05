import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'profile-app';
  data$;
  dataset:any = [];

  constructor(public db: AngularFireDatabase) {
    db.list('/').valueChanges()
      .subscribe(object => {
          //Object.keys(object[0]).forEach(e=>{

          // console.log(e);
          // console.log(object[0][e].name);
          // this.dataset.push({"key": e, "name": object[0][e].name});
        //});
        this.data$ = object;
        console.log(this.data$[0]);
    })
    
    console.log(this.data$);

    

  }

  removeItem(item) {
    console.log(item);
    this.db.object('/name/'+ item).remove();
  }
  editItem(i) {
    console.log('edititem');
  }
  addItem(name) {
    this.db.list('/name').push({"name": name});
    console.log(name);
  }
}

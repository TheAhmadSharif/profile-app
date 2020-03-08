import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'profile-app';
  data;
  newname;
  dataset:any = [];
  editDiv:boolean  = false;
  editMember: any;
  id;



  constructor(public firestore: AngularFirestore) {
    firestore.collection('user').snapshotChanges()
      .subscribe(object => {

        let arr = Array.from(object);
        let arr1=[{}]

        for(let i=0; i<arr.length;i++)
        {
          arr1[i] = arr[i].payload.doc;
        }

        this.data = arr1;
        
    })
  }

  addItem(name:string) {
   
    let addDoc = this.firestore.collection('user').add({
      name: name,
    }).then(ref => {
      this.newname = null;
      console.log('Added document with ID: ', ref.id);
    });

  }

  removeItem(item) {
    let deleteDoc = this.firestore.collection('user').doc(item.id).delete();
  }

  editItem(item, name) {
    this.editMember = item.data().name;
    this.id = item.id;
    this.editDiv =! this.editDiv;
    console.log(item);
  }

  updateItem(id, editMember) {
    let setDoc = this.firestore.collection('user').doc(id).set({
      name: editMember,
    });
  }

  closeUpdate(editDiv) {
    this.editDiv =! this.editDiv;
  }
  
}

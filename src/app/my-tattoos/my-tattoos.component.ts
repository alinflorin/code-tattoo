import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tattoo } from '../models/tattoo';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-tattoos',
  templateUrl: './my-tattoos.component.html',
  styleUrls: ['./my-tattoos.component.scss']
})
export class MyTattoosComponent implements OnInit {
  myTattoos: Tattoo[];

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.user.pipe(
      switchMap(u => this.db.collection<Tattoo>('users/' + u.email + '/tattoos').valueChanges())
    ).subscribe(res => {
      this.myTattoos = res;
    });
  }

}
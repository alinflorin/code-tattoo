import { Component, OnInit } from '@angular/core';
import { Tattoo } from '../models/tattoo';
import { AngularFirestore } from '@angular/fire/firestore';
import { QrService } from '../services/qr.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  tattoo: Tattoo;

  constructor(private db: AngularFirestore, private qrService: QrService) { 
    
  }

  ngOnInit() {
    this.tattoo = {
      name: null,
      code: null,
      url: 'https://yahoo.com',
      base64Qr: this.qrService.getBase64Svg('https://yahoo.com')
    };
  }

}
import { Component, OnInit } from "@angular/core";
import { Tattoo } from "../models/tattoo";
import { AngularFirestore } from "@angular/fire/firestore";
import { QrService } from "../services/qr.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  tattoo: Tattoo;
  newTattooForm: FormGroup;

  constructor(private db: AngularFirestore, private qrService: QrService) {}

  ngOnInit() {
    this.tattoo = {
      name: 'New Tattoo',
      code: null,
      url: "https://yahoo.com",
      base64Qr: this.qrService.getBase64Svg("https://yahoo.com")
    };
    this.newTattooForm = new FormGroup({
      name: new FormControl(this.tattoo.name, [Validators.required]),
      content: new FormControl(this.tattoo.url, [Validators.required])
    });
  }
}

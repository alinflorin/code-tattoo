import { Component, OnInit, NgZone } from "@angular/core";
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

  constructor(
    private db: AngularFirestore,
    private qrService: QrService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.tattoo = {
      name: "New Tattoo",
      code: null,
      url: "https://yahoo.com",
      base64Qr: null,
      base64Image: null,
      imageSizePercent: 20
    };

    this.newTattooForm = new FormGroup({
      name: new FormControl(this.tattoo.name, [Validators.required]),
      content: new FormControl(this.tattoo.url, [Validators.required]),
      base64Image: new FormControl(this.tattoo.base64Image),
      imageSizePercent: new FormControl({disabled: true, value: this.tattoo.imageSizePercent}, [
        Validators.min(1),
        Validators.max(100)
      ])
    });

    this.tattoo.base64Qr = this.qrService.getBase64Svg(this.tattoo.url);

    this.newTattooForm.controls.content.valueChanges.subscribe((x: string) => {
      if (x == null || x.length === 0) {
        this.tattoo.base64Qr = "/assets/images/question-mark.svg";
        return;
      }
      this.tattoo.base64Qr = this.qrService.getBase64Svg(
        x,
        this.newTattooForm.controls.base64Image.value,
        +this.newTattooForm.controls.imageSizePercent.value
      );
    });

    this.newTattooForm.controls.base64Image.valueChanges.subscribe(
      (x: string) => {
        if (x == null || x.length === 0) {
          this.newTattooForm.controls.imageSizePercent.disable();
        } else {
          this.newTattooForm.controls.imageSizePercent.enable();
        }
        if (this.tattoo.url == null || this.tattoo.url.length === 0) {
          this.tattoo.base64Qr = "/assets/images/question-mark.svg";
          return;
        }
        this.tattoo.base64Qr = this.qrService.getBase64Svg(
          this.tattoo.url,
          x,
          +this.newTattooForm.controls.imageSizePercent.value
        );
      }
    );

    this.newTattooForm.controls.imageSizePercent.valueChanges.subscribe(
      (x: number) => {
        if (this.tattoo.url == null || this.tattoo.url.length === 0) {
          this.tattoo.base64Qr = "/assets/images/question-mark.svg";
          return;
        }
        this.tattoo.base64Qr = this.qrService.getBase64Svg(
          this.tattoo.url,
          this.newTattooForm.controls.base64Image.value,
          x
        );
      }
    );
  }

  onImageUploaded(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (input.files != null && input.files.length === 1) {
      const file = input.files[0];
      const fr = new FileReader();
      fr.onload = () => {
        this.zone.run(() => {
          this.newTattooForm.controls.base64Image.setValue(fr.result);
        });
      };
      fr.onerror = () => {
        this.zone.run(() => {
          this.newTattooForm.controls.base64Image.setValue(null);
        });
      };
      fr.readAsDataURL(file);
    } else {
      this.newTattooForm.controls.base64Image.setValue(null);
    }
  }

  removeImage(input: HTMLInputElement): void {
    input.value = null;
    this.tattoo.base64Image = null;
    this.newTattooForm.controls.base64Image.setValue(null);
  }
}

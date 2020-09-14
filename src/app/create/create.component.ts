import { Component, OnInit, NgZone } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { QrService } from "../services/qr.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Color } from "@angular-material-components/color-picker";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  tattoo: AnalyserNode;
  newTattooForm: FormGroup;

  constructor(
    private db: AngularFirestore,
    private qrService: QrService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.tattoo = {
      name: "New Tattoo",
      code: "asd",
      content: "https://yahoo.com",
      base64Qr: null,
      base64Image: null,
      imageSizePercent: 20,
      fgColor: new Color(0, 0, 0, 1),
      bgColor: new Color(255, 255, 255, 1)
    };

    this.newTattooForm = new FormGroup({
      name: new FormControl(this.tattoo.name, [Validators.required]),
      code: new FormControl({ disabled: true, value: this.tattoo.code }, [
        Validators.required
      ]),
      content: new FormControl(this.tattoo.content, [Validators.required]),
      base64Image: new FormControl(this.tattoo.base64Image),
      imageSizePercent: new FormControl(
        { disabled: true, value: this.tattoo.imageSizePercent },
        [Validators.min(1), Validators.max(100)]
      ),
      fgColor: new FormControl(this.tattoo.fgColor),
      bgColor: new FormControl(this.tattoo.bgColor)
    });

    this.tattoo.base64Qr = this.qrService.getBase64Svg(
      this.tattoo.content,
      "#" + this.tattoo.fgColor.hex,
      "#" + this.tattoo.bgColor.hex,
      this.tattoo.base64Image,
      this.tattoo.imageSizePercent
    );

    this.newTattooForm.valueChanges.subscribe(x => {
      if (
        x.content == null ||
        x.content.length === 0 ||
        !this.newTattooForm.valid
      ) {
        this.tattoo.base64Qr = "/assets/images/question-mark.svg";
        return;
      }
      this.tattoo.base64Qr = this.qrService.getBase64Svg(
        x.content,
        "#" + x.fgColor.hex,
        "#" + x.bgColor.hex,
        x.base64Image,
        x.imageSizePercent
      );
    });

    this.newTattooForm.controls.base64Image.valueChanges.subscribe(x => {
      if (x == null || x.length === 0) {
        this.newTattooForm.controls.imageSizePercent.disable({
          emitEvent: false
        });
      } else {
        this.newTattooForm.controls.imageSizePercent.enable({
          emitEvent: false
        });
      }
    });
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

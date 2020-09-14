import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { from } from "rxjs";
import { auth } from "firebase/app";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.minLength(6)
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
  });
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {}

  loginWithEmail(): void {
    from(
      this.afAuth.signInWithEmailAndPassword(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
    ).subscribe(
      () => {
        this.router.navigate(["/my-tattoos"]);
      },
      e => {
        this.loginForm.setErrors({
          failed: {
            message: e.message,
            code: e.code
          }
        });
      }
    );
  }

  signup(): void {
    from(
      this.afAuth.createUserWithEmailAndPassword(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
    ).subscribe(
      () => {
        this.router.navigate(["/my-tattoos"]);
      },
      e => {
        this.loginForm.setErrors({
          failed: {
            message: e.message,
            code: e.code
          }
        });
      }
    );
  }

  loginWithGoogle(): void {
    from(this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())).subscribe(
      () => {
        this.router.navigate(["/my-tattoos"]);
      },
      e => {
        this.loginForm.setErrors({
          failed: {
            message: e.message,
            code: e.code
          }
        });
      }
    );
  }

  loginWithFacebook(): void {
    from(
      this.afAuth.signInWithPopup(new auth.FacebookAuthProvider())
    ).subscribe(
      () => {
        this.router.navigate(["/my-tattoos"]);
      },
      e => {
        this.loginForm.setErrors({
          failed: {
            message: e.message,
            code: e.code
          }
        });
      }
    );
  }

  loginWithGithub(): void {
    from(this.afAuth.signInWithPopup(new auth.GithubAuthProvider())).subscribe(
      () => {
        this.router.navigate(["/my-tattoos"]);
      },
      e => {
        this.loginForm.setErrors({
          failed: {
            message: e.message,
            code: e.code
          }
        });
      }
    );
  }
}

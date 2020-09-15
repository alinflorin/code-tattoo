import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  fpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)])
  })
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  sendEmail(): void {
    from(this.afAuth.sendPasswordResetEmail(this.fpForm.controls.email.value)).subscribe(() => {
      this.router.navigate(['email-sent']);
    }, e => {
      this.fpForm.setErrors({
          failed: {
            message: e.message,
            code: e.code
          }
        });
    });
  }

}
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: [
    'header.component.scss'
  ]
})
export class HeaderComponent implements OnInit {

  constructor(public translateService: TranslateService,
    private storageService: StorageService, public auth: AngularFireAuth,
    private router: Router) { }

  ngOnInit(): void {
  }

  changeLanguage(lang: string): void {
    setTimeout(() => {
      this.translateService.use(lang);
      this.storageService.set('lang', lang);
    }, 250);
  }

  logout(): void {
    from(this.auth.signOut()).subscribe(() => {
      this.router.navigate(['login'])
    });
  }
}

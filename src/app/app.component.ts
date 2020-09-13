import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage.service';
import { PwaService } from './services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    private storageService: StorageService,
    private pwaService: PwaService
  ) {}

  ngOnInit(): void {
    this.pwaService.checkForUpdate().subscribe(() => {
      this.pwaService.promptToInstall();
    });
    this.initTranslate();
  }

  private initTranslate(): void {
    let usedLang = 'en';
    const preferredLang = this.storageService.get('lang');
    if (preferredLang != null) {
      usedLang = preferredLang;
    }
    this.translateService.setDefaultLang('en');
    this.translateService.addLangs(['en', 'ro']);
    this.translateService.use(usedLang);
  }
}

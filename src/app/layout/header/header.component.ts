import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: [
    'header.component.scss'
  ]
})
export class HeaderComponent implements OnInit {

  constructor(public translateService: TranslateService,
    private storageService: StorageService) { }

  ngOnInit(): void {
  }

  changeLanguage(lang: string): void {
    setTimeout(() => {
      this.translateService.use(lang);
      this.storageService.set('lang', lang);
    }, 250);
  }
}

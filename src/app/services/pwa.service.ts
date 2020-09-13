import { Injectable, NgZone } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PwaService {
  constructor(
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar,
    private translateService: TranslateService,
    private zone: NgZone
  ) {}

  checkForUpdate(): Observable<void> {
    return this.swUpdate.available.pipe(
      switchMap(() => {
        const snack = this.snackbar.open(
          this.translateService.instant('ui.pwa.update_available'),
          this.translateService.instant('ui.pwa.reload'),
          {
            duration: 10000
          }
        );
        snack.onAction().subscribe(() => {
          this.swUpdate.activateUpdate().then(() => {
            document.location.reload();
          });
        });
        return snack.afterDismissed();
      }),
      map(() => {})
    );
  }

  promptToInstall(): Observable<void> {
    const subj = new Subject<void>();
    window.addEventListener('beforeinstallprompt', (evt) => {
      this.zone.run(() => {
        const snack = this.snackbar.open(
          this.translateService.instant('ui.pwa.install_pwa'),
          this.translateService.instant('ui.pwa.install'),
          {
            duration: 10000
          }
        );
        snack.onAction().subscribe(() => {
          this.swUpdate.activateUpdate().then(() => {
            (evt as any).prompt();
          });
        });
        snack.afterDismissed().subscribe(() => {
          subj.next();
          subj.complete();
        });
      });
    });
    return subj.asObservable();
  }
}

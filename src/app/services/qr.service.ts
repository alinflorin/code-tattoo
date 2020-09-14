import { Injectable } from "@angular/core";
import { QRCodeSVG } from '@cheprasov/qrcode';

@Injectable({providedIn: 'root'})
export class QrService {
  getBase64Svg(content: string, image: string = null): string {
    const opts: any = {};
    if (image) {
      opts.image = {
        source: image,
        width: '20%',
        height: '20%',
        x: 'center',
        y: 'center'
      };
    }
    const qrSvgSvc = new QRCodeSVG(content, opts);
    return qrSvgSvc.toDataUrl();
  }
}
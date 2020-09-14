import { Injectable } from "@angular/core";
import { QRCodeSVG } from '@cheprasov/qrcode';

@Injectable({providedIn: 'root'})
export class QrService {
  getBase64Svg(content: string, fgColor: string = '#000000', bgColor: string = '#ffffff', image: string = null, imageSizePercent: number = null): string {
    const opts: any = {
      level: 'H',
      fgColor,
      bgColor
    };
    if (image) {
      opts.image = {
        source: image,
        width:  imageSizePercent + '%',
        height: imageSizePercent + '%',
        x: 'center',
        y: 'center'
      };
    }
    const qrSvgSvc = new QRCodeSVG(content, opts);
    return qrSvgSvc.toDataUrl();
  }
}
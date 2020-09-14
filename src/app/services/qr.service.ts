import { Injectable } from "@angular/core";
import { QRCodeSVG } from '@cheprasov/qrcode';

@Injectable({providedIn: 'root'})
export class QrService {
  getBase64Svg(content: string): string {
    const qrSvgSvc = new QRCodeSVG(content);
    return qrSvgSvc.toDataUrl();
  }
}
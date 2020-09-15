import { ContentType } from "./content-type";

export interface Tattoo {
  name: string;
  contentType: ContentType;
  code: string;
  base64Qr?: string;
  base64Image?: string;
  imageSizePercent?: number;
  content: string;
  fgColor?: string;
  bgColor?: string;
}

declare type TemplateType = "text" | "image" | "qrcode" | "japanpost" | "ean13" | "ean8" | "code39" | "code128" | "nw7" | "itf14";
export declare type BarCodeType = Exclude<TemplateType, "text" | "image">;
interface TemplateSchema {
    type: TemplateType;
    position: {
        x: number;
        y: number;
    };
    width: number;
    height: number;
    rotate?: number;
    alignment?: "left" | "right" | "center";
    fontSize?: number;
    fontName?: string;
    fontColor?: string;
    characterSpacing?: number;
    lineHeight?: number;
}
interface PageSize {
    height: number;
    width: number;
}
export declare const isPageSize: (args: string | PageSize | Uint8Array | ArrayBuffer) => args is PageSize;
export interface Template {
    schemas: {
        [key: string]: TemplateSchema;
    }[];
    basePdf: PageSize | string | Uint8Array | ArrayBuffer;
    fontName?: string;
}
export declare type _Template = Template & {
    sampledata: {
        [key: string]: string;
    }[];
};
export {};

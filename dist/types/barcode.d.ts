/// <reference types="node" />
export declare const validateBarcodeInput: (type: "qrcode" | "japanpost" | "ean13" | "ean8" | "code39" | "code128" | "nw7" | "itf14", input: string) => boolean;
export declare const createBarCode: ({ type, input, width, height, }: {
    type: "qrcode" | "japanpost" | "ean13" | "ean8" | "code39" | "code128" | "nw7" | "itf14";
    input: string | null;
    width: number;
    height: number;
}) => Promise<Buffer | null>;

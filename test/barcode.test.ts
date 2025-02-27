import { validateBarcodeInput } from "../src/barcode";

describe("validateBarcodeInput", () => {
  test("qrcode", () => {
    // 漢字を含まない500文字以下
    const type = "qrcode";
    const valid = "https://www.google.com/";
    const invalid1 = "漢字を含む文字列";
    const invalid2 =
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYIIiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQ";
    const blank = "";
    expect(validateBarcodeInput(type, valid)).toEqual(true);
    expect(validateBarcodeInput(type, invalid1)).toEqual(false);
    expect(validateBarcodeInput(type, invalid2)).toEqual(false);
    expect(validateBarcodeInput(type, blank)).toEqual(false);
  });
  test("japanpost", () => {
    // https://barcode-place.azurewebsites.net/Barcode/zip
    // 郵便番号は数字(0-9)のみ、住所表示番号は英数字(0-9,A-Z)とハイフン(-)が使用可能です。
    const type = "japanpost";
    const valid1 = "10000131-3-2-503";
    const valid2 = "10000131-3-2-B503";
    const invalid1 = "invalid";
    const invalid2 = "10000131=3=2-503";
    const invalid3 = "10000131=3=2-503";
    const invalid4 = "10000131-3-2-b503";
    const blank = "";
    expect(validateBarcodeInput(type, valid1)).toEqual(true);
    expect(validateBarcodeInput(type, valid2)).toEqual(true);
    expect(validateBarcodeInput(type, invalid1)).toEqual(false);
    expect(validateBarcodeInput(type, invalid2)).toEqual(false);
    expect(validateBarcodeInput(type, invalid3)).toEqual(false);
    expect(validateBarcodeInput(type, invalid4)).toEqual(false);
    expect(validateBarcodeInput(type, blank)).toEqual(false);
  });
  test("ean13", () => {
    // https://barcode-place.azurewebsites.net/Barcode/jan
    // 有効文字は数値(0-9)のみ。標準タイプはチェックデジットを含まない12桁
    const type = "ean13";
    const valid = "111111111111";
    const invalid1 = "1111111111111";
    const invalid2 = "111";
    const invalid3 = "111111111111111111111111";
    const invalid4 = "invalid";
    const invalid5 = "11111a111111";
    const blank = "";
    expect(validateBarcodeInput(type, valid)).toEqual(true);
    expect(validateBarcodeInput(type, invalid1)).toEqual(false);
    expect(validateBarcodeInput(type, invalid2)).toEqual(false);
    expect(validateBarcodeInput(type, invalid3)).toEqual(false);
    expect(validateBarcodeInput(type, invalid4)).toEqual(false);
    expect(validateBarcodeInput(type, invalid5)).toEqual(false);
    expect(validateBarcodeInput(type, blank)).toEqual(false);
  });
  test("ean8", () => {
    // https://barcode-place.azurewebsites.net/Barcode/jan
    // 有効文字は数値(0-9)のみ。短縮タイプはチェックデジットを含まない7桁
    const type = "ean8";
    const valid = "1111111";
    const invalid1 = "11111111";
    const invalid2 = "111";
    const invalid3 = "11111111111111111111";
    const invalid4 = "invalid";
    const invalid5 = "111a111";
    const blank = "";
    expect(validateBarcodeInput(type, valid)).toEqual(true);
    expect(validateBarcodeInput(type, invalid1)).toEqual(false);
    expect(validateBarcodeInput(type, invalid2)).toEqual(false);
    expect(validateBarcodeInput(type, invalid3)).toEqual(false);
    expect(validateBarcodeInput(type, invalid4)).toEqual(false);
    expect(validateBarcodeInput(type, invalid5)).toEqual(false);
    expect(validateBarcodeInput(type, blank)).toEqual(false);
  });
  test("code39", () => {
    // https://barcode-place.azurewebsites.net/Barcode/code39
    // CODE39は数字(0-9)、アルファベット大文字(A-Z)、記号(-.$/+%)、半角スペースに対応しています。
    const type = "code39";
    const valid1 = "12345";
    const valid2 = "ABCDE";
    const valid3 = "1A2B3C4D5G";
    const valid4 = "1-A $2/B+3%C4D5G";
    const invalid1 = "123a45";
    const invalid2 = "1-A$2/B+3%C4=D5G";
    const blank = "";
    expect(validateBarcodeInput(type, valid1)).toEqual(true);
    expect(validateBarcodeInput(type, valid2)).toEqual(true);
    expect(validateBarcodeInput(type, valid3)).toEqual(true);
    expect(validateBarcodeInput(type, valid4)).toEqual(true);
    expect(validateBarcodeInput(type, invalid1)).toEqual(false);
    expect(validateBarcodeInput(type, invalid2)).toEqual(false);
    expect(validateBarcodeInput(type, blank)).toEqual(false);
  });
  test("code128", () => {
    // https://www.keyence.co.jp/ss/products/autoid/codereader/basic_code128.jsp
    // コンピュータのキーボードから打てる文字（漢字、ひらがな、カタカナ以外）可能
    const type = "code128";
    const valid1 = "12345";
    const valid2 = "1-A$2/B+3%C4=D5G";
    const valid3 = "1-A$2/B+3%C4=D5Ga~";
    const invalid1 = "1-A$2/B+3%C4=D5Gひらがな";
    const invalid2 = "1-A$2/B+3%C4=D5G〜";
    const invalid3 = "1ーA$2・B＋3%C4=D5G〜";
    const blank = "";
    expect(validateBarcodeInput(type, valid1)).toEqual(true);
    expect(validateBarcodeInput(type, valid2)).toEqual(true);
    expect(validateBarcodeInput(type, valid3)).toEqual(true);
    expect(validateBarcodeInput(type, invalid1)).toEqual(false);
    expect(validateBarcodeInput(type, invalid2)).toEqual(false);
    expect(validateBarcodeInput(type, invalid3)).toEqual(false);
    expect(validateBarcodeInput(type, blank)).toEqual(false);
  });
  test("nw7", () => {
    // https://barcode-place.azurewebsites.net/Barcode/nw7
    // https://en.wikipedia.org/wiki/Codabar
    // NW-7は数字(0-9)と記号(-.$:/+)に対応しています。
    // スタートコード／ストップコードとして、コードの始まりと終わりはアルファベット(A-D)のいずれかを使用してください。
    const type = "nw7";
    const valid1 = "A12345D";
    const valid2 = "A$2/+345D";
    const valid3 = "a4321D";
    const invalid1 = "A12345G";
    const invalid2 = "A12a45D";
    const blank = "";
    expect(validateBarcodeInput(type, valid1)).toEqual(true);
    expect(validateBarcodeInput(type, valid2)).toEqual(true);
    expect(validateBarcodeInput(type, valid3)).toEqual(true);
    expect(validateBarcodeInput(type, invalid1)).toEqual(false);
    expect(validateBarcodeInput(type, invalid2)).toEqual(false);
    expect(validateBarcodeInput(type, blank)).toEqual(false);
  });
  test("itf14", () => {
    // https://barcode-place.azurewebsites.net/Barcode/itf
    // 有効文字は数値(0-9)のみ。 チェックデジットを含まない13桁です。
    const type = "itf14";
    const valid = "1111111111111";
    const invalid1 = "111";
    const invalid2 = "11111111111111";
    const invalid3 = "11111111111111111111111111111";
    const blank = "";
    expect(validateBarcodeInput(type, valid)).toEqual(true);
    expect(validateBarcodeInput(type, invalid1)).toEqual(false);
    expect(validateBarcodeInput(type, invalid2)).toEqual(false);
    expect(validateBarcodeInput(type, invalid3)).toEqual(false);
    expect(validateBarcodeInput(type, blank)).toEqual(false);
  });
});

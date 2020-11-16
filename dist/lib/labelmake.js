"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pdf_lib_1 = require("pdf-lib");
var fontkit_1 = __importDefault(require("@pdf-lib/fontkit"));
var barcode_1 = require("./barcode");
var type_1 = require("./type");
var barcodes = [
    "qrcode",
    "ean13",
    "ean8",
    "japanpost",
    "code39",
    "code128",
    "nw7",
    "itf14",
];
var uniq = function (array) { return Array.from(new Set(array)); };
var hex2rgb = function (hex) {
    if (hex.slice(0, 1) == "#")
        hex = hex.slice(1);
    if (hex.length == 3)
        hex =
            hex.slice(0, 1) +
                hex.slice(0, 1) +
                hex.slice(1, 2) +
                hex.slice(1, 2) +
                hex.slice(2, 3) +
                hex.slice(2, 3);
    return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(function (str) {
        return parseInt(str, 16);
    });
};
var mm2pt = function (mm) {
    // https://www.ddc.co.jp/words/archives/20090701114500.html
    var ptRatio = 2.8346;
    return parseFloat(String(mm)) * ptRatio;
};
var calcX = function (x, alignment, boxWidth, textWidth) {
    var addition = 0;
    if (alignment === "center") {
        addition = (boxWidth - textWidth) / 2;
    }
    else if (alignment === "right") {
        addition = boxWidth - textWidth;
    }
    return mm2pt(x) + addition;
};
var calcY = function (y, height, itemHeight) {
    return height - mm2pt(y) - itemHeight;
};
var labelmake = function (_a) {
    var inputs = _a.inputs, template = _a.template, font = _a.font;
    return __awaiter(void 0, void 0, void 0, function () {
        var fontNamesInSchemas, fontNames_1, pdfDoc, isUseMyfont, fontValues, _b, fontObj, _c, _d, inputImageCache, basePdf, schemas, isBlank, embeddedPages, embedPdf, i, inputObj, keys, _loop_1, j;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (inputs.length < 1) {
                        throw Error("inputs should be more than one length");
                    }
                    fontNamesInSchemas = uniq(template.schemas
                        .map(function (s) { return Object.values(s).map(function (v) { return v.fontName; }); })
                        .reduce(function (acc, val) { return acc.concat(val); }, [])
                        .filter(Boolean));
                    if (font) {
                        fontNames_1 = Object.keys(font);
                        if (template.fontName && !fontNames_1.includes(template.fontName)) {
                            throw Error(template.fontName + " of template.fontName is not found in font");
                        }
                        if (fontNamesInSchemas.some(function (f) { return !fontNames_1.includes(f); })) {
                            throw Error(fontNamesInSchemas
                                .filter(function (f) { return !fontNames_1.includes(f); })
                                .join() + " of template.schemas is not found in font");
                        }
                    }
                    return [4 /*yield*/, pdf_lib_1.PDFDocument.create()];
                case 1:
                    pdfDoc = _f.sent();
                    pdfDoc.registerFontkit(fontkit_1.default);
                    isUseMyfont = font && (template.fontName || fontNamesInSchemas.length > 0);
                    if (!isUseMyfont) return [3 /*break*/, 3];
                    return [4 /*yield*/, Promise.all(Object.values(font).map(function (v) { return pdfDoc.embedFont(v, { subset: false }); }))];
                case 2:
                    _b = _f.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _b = [];
                    _f.label = 4;
                case 4:
                    fontValues = _b;
                    if (!isUseMyfont) return [3 /*break*/, 5];
                    _c = Object.keys(font).reduce(function (acc, cur, i) {
                        var _a;
                        return Object.assign(acc, (_a = {}, _a[cur] = fontValues[i], _a));
                    }, {});
                    return [3 /*break*/, 7];
                case 5:
                    _e = {};
                    _d = pdf_lib_1.StandardFonts.Helvetica;
                    return [4 /*yield*/, pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica)];
                case 6:
                    _c = (_e[_d] = _f.sent(),
                        _e);
                    _f.label = 7;
                case 7:
                    fontObj = _c;
                    inputImageCache = {};
                    basePdf = template.basePdf, schemas = template.schemas;
                    isBlank = type_1.isPageSize(basePdf);
                    embeddedPages = [];
                    if (!!type_1.isPageSize(basePdf)) return [3 /*break*/, 10];
                    return [4 /*yield*/, pdf_lib_1.PDFDocument.load(basePdf)];
                case 8:
                    embedPdf = _f.sent();
                    return [4 /*yield*/, pdfDoc.embedPdf(embedPdf, embedPdf.getPageIndices())];
                case 9:
                    embeddedPages = _f.sent();
                    _f.label = 10;
                case 10:
                    i = 0;
                    _f.label = 11;
                case 11:
                    if (!(i < inputs.length)) return [3 /*break*/, 16];
                    inputObj = inputs[i];
                    keys = Object.keys(inputObj);
                    _loop_1 = function (j) {
                        var pageWidth, pageHeight, page, _loop_2, l;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    pageWidth = type_1.isPageSize(basePdf)
                                        ? mm2pt(basePdf.width)
                                        : embeddedPages[j].width;
                                    pageHeight = type_1.isPageSize(basePdf)
                                        ? mm2pt(basePdf.height)
                                        : embeddedPages[j].height;
                                    page = pdfDoc.addPage([pageWidth, pageHeight]);
                                    if (!isBlank)
                                        page.drawPage(embeddedPages[j]);
                                    if (!schemas[j])
                                        return [2 /*return*/, "continue"];
                                    _loop_2 = function (l) {
                                        var key, schema, input, rotate, boxWidth, boxHeight, fontValue_1, _a, r_1, g_1, b_1, fontSize_1, alignment_1, lineHeight_1, characterSpacing, beforeLineOver_1, opt, inputImageCacheKey, image, isPng, imageBuf;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    key = keys[l];
                                                    schema = schemas[j][key];
                                                    input = inputObj[key];
                                                    if (!schema || !input)
                                                        return [2 /*return*/, "continue"];
                                                    rotate = pdf_lib_1.degrees(schema.rotate ? schema.rotate : 0);
                                                    boxWidth = mm2pt(schema.width);
                                                    boxHeight = mm2pt(schema.height);
                                                    if (!(schema.type === "text")) return [3 /*break*/, 1];
                                                    fontValue_1 = isUseMyfont
                                                        ? fontObj[schema.fontName ? schema.fontName : template.fontName]
                                                        : fontObj[pdf_lib_1.StandardFonts.Helvetica];
                                                    _a = __read(hex2rgb(schema.fontColor ? schema.fontColor : "#000"), 3), r_1 = _a[0], g_1 = _a[1], b_1 = _a[2];
                                                    fontSize_1 = schema.fontSize ? schema.fontSize : 13;
                                                    alignment_1 = schema.alignment ? schema.alignment : "left";
                                                    lineHeight_1 = schema.lineHeight ? schema.lineHeight : 1;
                                                    characterSpacing = schema.characterSpacing
                                                        ? schema.characterSpacing
                                                        : 0;
                                                    page.pushOperators(pdf_lib_1.setCharacterSpacing(characterSpacing));
                                                    beforeLineOver_1 = 0;
                                                    input.split(/\r|\n|\r\n/g).forEach(function (inputLine, index) {
                                                        var getSplit = function (il, stack) {
                                                            if (stack === void 0) { stack = []; }
                                                            var splited = il
                                                                .split("")
                                                                .reduce(function (acc, cur) {
                                                                return fontValue_1.widthOfTextAtSize(acc + cur, fontSize_1) > boxWidth
                                                                    ? acc
                                                                    : acc + cur;
                                                            }, "");
                                                            if (splited.length === 0)
                                                                return stack;
                                                            var next = stack.concat(splited);
                                                            var nextLength = next.join("").length;
                                                            return getSplit(inputLine.substring(nextLength), next);
                                                        };
                                                        var splitedLine = getSplit(inputLine);
                                                        splitedLine.forEach(function (inputLine2, index2) {
                                                            var textWidth = fontValue_1.widthOfTextAtSize(inputLine2, fontSize_1);
                                                            page.drawText(inputLine2, {
                                                                x: calcX(schema.position.x, alignment_1, boxWidth, textWidth),
                                                                y: calcY(schema.position.y, pageHeight, fontSize_1) -
                                                                    lineHeight_1 * fontSize_1 * (index + index2 + beforeLineOver_1) -
                                                                    (lineHeight_1 === 0 ? 0 : ((lineHeight_1 - 1) * fontSize_1) / 2),
                                                                rotate: rotate,
                                                                size: fontSize_1,
                                                                lineHeight: lineHeight_1 * fontSize_1,
                                                                maxWidth: boxWidth,
                                                                font: fontValue_1,
                                                                color: pdf_lib_1.rgb(r_1 / 255, g_1 / 255, b_1 / 255),
                                                                wordBreaks: [""],
                                                            });
                                                            if (splitedLine.length === index2 + 1)
                                                                beforeLineOver_1 += index2;
                                                        });
                                                    });
                                                    return [3 /*break*/, 7];
                                                case 1:
                                                    if (!(barcodes.includes(schema.type) || schema.type === "image")) return [3 /*break*/, 7];
                                                    opt = {
                                                        x: calcX(schema.position.x, "left", boxWidth, boxWidth),
                                                        y: calcY(schema.position.y, pageHeight, boxHeight),
                                                        rotate: rotate,
                                                        width: boxWidth,
                                                        height: boxHeight,
                                                    };
                                                    inputImageCacheKey = "" + schema.type + input;
                                                    image = inputImageCache[inputImageCacheKey];
                                                    if (!(!image && schema.type === "image")) return [3 /*break*/, 3];
                                                    isPng = input.startsWith("data:image/png;");
                                                    return [4 /*yield*/, pdfDoc[isPng ? "embedPng" : "embedJpg"](input)];
                                                case 2:
                                                    image = _b.sent();
                                                    return [3 /*break*/, 6];
                                                case 3:
                                                    if (!(!image && schema.type !== "image")) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, barcode_1.createBarCode({
                                                            type: schema.type,
                                                            width: schema.width,
                                                            height: schema.height,
                                                            input: input,
                                                        })];
                                                case 4:
                                                    imageBuf = _b.sent();
                                                    if (!imageBuf) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, pdfDoc.embedPng(imageBuf)];
                                                case 5:
                                                    image = _b.sent();
                                                    _b.label = 6;
                                                case 6:
                                                    if (image) {
                                                        inputImageCache[inputImageCacheKey] = image;
                                                        page.drawImage(image, opt);
                                                    }
                                                    _b.label = 7;
                                                case 7: return [2 /*return*/];
                                            }
                                        });
                                    };
                                    l = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(l < keys.length)) return [3 /*break*/, 4];
                                    return [5 /*yield**/, _loop_2(l)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    l++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    j = 0;
                    _f.label = 12;
                case 12:
                    if (!(j < (isBlank ? schemas : embeddedPages).length)) return [3 /*break*/, 15];
                    return [5 /*yield**/, _loop_1(j)];
                case 13:
                    _f.sent();
                    _f.label = 14;
                case 14:
                    j++;
                    return [3 /*break*/, 12];
                case 15:
                    i++;
                    return [3 /*break*/, 11];
                case 16: return [4 /*yield*/, pdfDoc.save()];
                case 17: return [2 /*return*/, _f.sent()];
            }
        });
    });
};
exports.default = labelmake;
//# sourceMappingURL=labelmake.js.map
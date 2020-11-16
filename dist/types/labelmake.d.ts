import { Template } from "./type";
declare const labelmake: ({ inputs, template, font, }: {
    inputs: {
        [key: string]: string;
    }[];
    template: Template;
    font?: {
        [key: string]: string | Uint8Array | ArrayBuffer;
    } | undefined;
}) => Promise<Uint8Array>;
export default labelmake;

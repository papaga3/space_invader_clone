// This declaration allow us to import image in TS file.
declare module "*.png" {
    const value: any;
    export = value;
 }
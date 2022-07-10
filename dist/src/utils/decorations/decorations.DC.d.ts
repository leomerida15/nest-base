import { ValidationOptions } from "class-validator";
export declare const IsTypes: (types: Array<any>, validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => void;
export declare const IsPass: (constraints?: any, validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => void;
export declare const IsMultyIs: (constraints?: any, validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => void;

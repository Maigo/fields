module com.maigo.core.type {

    export declare class Error {
        public name:string;
        public message:string;
        public stack:string;

        constructor(message?:string);
    }
}
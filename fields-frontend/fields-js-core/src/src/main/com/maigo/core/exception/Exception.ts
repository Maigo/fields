/// <reference path="../type/Error.ts"/>
/// <reference path="../rtti/RTTI.ts"/>
/// <reference path="../util/Reflector.ts"/>
module com.maigo.core.exception {

//    export class Exception extends com.maigo.core.type.Error {
    export class Exception {
        static rtti:com.maigo.core.rtti.RTTI = new com.maigo.core.rtti.RTTI("Exception").withClazz(Exception).withParentClazz(com.maigo.core.type.Error).withNamespace("com.maigo.core.type");

        public name:string;
        public message:string;

        constructor(message:string = "") {
            this.name = com.maigo.core.util.Reflector.className(com.maigo.core.util.Reflector.classOf(this));
            this.message = message;
        }
    }
}
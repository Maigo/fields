/// <reference path="../../core/exception/Exception.ts"/>
/// <reference path="../../core/rtti/RTTI.ts"/>
module com.maigo.state.core {

    export class StateCoreException extends com.maigo.core.exception.Exception {
        public static rtti:com.maigo.core.rtti.RTTI = new com.maigo.core.rtti.RTTI("StateCoreException").withClazz(StateCoreException).withParentClazz(com.maigo.core.exception.Exception).withNamespace("com.maigo.state.core");
        constructor(message:string = "") {
            super(message);
        }
    }
}
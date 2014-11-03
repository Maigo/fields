/// <reference path="../type/Class.ts"/>
/// <reference path="../rtti/RTTI.ts"/>
module com.maigo.core.rtti {

    export interface RTTIClass extends com.maigo.core.type.Class {
        rtti:com.maigo.core.rtti.RTTI;
    }
}
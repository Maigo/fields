/// <reference path="../../core/type/Class.ts"/>
module com.maigo.mvc.injector {

    export interface IInjector {
        mapValue(key:string, useValue:Object):IInjector;
        mapClass(key:string, clazz:com.maigo.core.type.Class):IInjector;
        mapSingleton(key:string, clazz:com.maigo.core.type.Class):IInjector;
        hasMapping(key:string):boolean;
        unmap(key:string):IInjector;

        getInstance(key:string):Object;

        injectInto(instance:Object, key?:string /* 'undefined' */):IInjector;
    }
}
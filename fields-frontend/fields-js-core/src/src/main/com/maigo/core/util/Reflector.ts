/// <reference path="./../type/Class.ts"/>
/// <reference path="./../../core/rtti/RTTI.ts"/>
/// <reference path="./../../core/rtti/RTTIClass.ts"/>
module com.maigo.core.util {

    export class Reflector {
        /**
         * Returns true if instance is an instance of clazz or of a subclass of clazz.
         * @param instance
         * @param clazz
         * @returns {boolean}
         */
        static instanceOf(instance:Object, clazz:com.maigo.core.type.Class):boolean {
            return instance instanceof clazz;
        }

        /**
         * Returns the name of a given class.
         * NOTE: Name might change when minimizing script!
         * @param clazz
         * @returns {string}
         */
        static className(clazz:com.maigo.core.type.Class):string {
            if (typeof (<com.maigo.core.rtti.RTTIClass>clazz).rtti != 'undefined') {
                return (<com.maigo.core.rtti.RTTIClass>clazz).rtti.name;
            }
            // override type checking
            return (<any>clazz).name;
        }


        /**
         * Returns the class of a given instance.
         * NOTE: Name might change when minimizing script!
         * @param instance
         * @returns {string}
         */
        static classOf(instance:Object):com.maigo.core.type.Class {
            // override type checking
            return <com.maigo.core.type.Class>(<any>instance).constructor;
        }
    }
}
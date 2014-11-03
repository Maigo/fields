/// <reference path="../type/Class.ts"/>
module com.maigo.core.rtti {
    export class RTTI {
        private _name:string = undefined;
        private _clazz:com.maigo.core.type.Class = undefined;
        private _parentClazz:com.maigo.core.type.Class = undefined;
        private _namespace:string = undefined;

        constructor(name:string) {
            this._name = name;
        }

        public get name():string { return this._name; }
        public get clazz():com.maigo.core.type.Class { return this._clazz; }
        public get parent():com.maigo.core.type.Class { return this._parentClazz; }
        public get namespace():string { return this._namespace; }

        public withClazz(clazz:com.maigo.core.type.Class):RTTI {
            this._clazz = clazz;
            return this;
        }

        public withParentClazz(parentClazz:com.maigo.core.type.Class):RTTI {
            this._parentClazz = parentClazz;
            return this;
        }

        public withNamespace(namespace:string):RTTI {
            this._namespace = namespace;
            return this;
        }
    }
}
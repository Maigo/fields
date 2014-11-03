/// <reference path="../core/IStateCore.ts"/>
/// <reference path="../core/StateCoreException.ts"/>
module com.maigo.state.core {

    export class StateCore implements com.maigo.state.core.IStateCore {
        private _states:Object = {};
        private _current:string = null;

        private _autoAddNopTransition:boolean;

        public constructor(autoAddNopTransition:boolean = false) {
            this._autoAddNopTransition = autoAddNopTransition;
        }

        public states(states:string[]):com.maigo.state.core.IStateCore {
            for (var i:number = 0, l:number = states.length; i < l; ++i) {
                this.addState(states[i]);
            }
            return this;
        }

        public transitions(state:string, transitions:string[]):com.maigo.state.core.IStateCore {
            for (var i:number = 0, l:number = transitions.length; i < l; ++i) {
                this.addTransition(state, transitions[i]);
            }
            return this;
        }

        public init(state:string):IStateCore {
            if (this.state !== null) {
                throw new com.maigo.state.core.StateCoreException("Init state already set: " + this.state);
            }
            this._current = state;
            return this;
        }

        public hasState(state:string):boolean {
            return (state !== null) && (this._states.hasOwnProperty(state));
        }

        public hasTransition(transition:string, state:string = null):boolean {
            state = state || this.state;
            return this.hasState(state) && (transition !== null) && (this._states[state].hasOwnProperty(transition));
        }

        public get state():string { return this._current; }

        public set state(state:string) {
            if (!this.hasTransition(state)) {
                throw new com.maigo.state.core.StateCoreException("Invalid state: '" + state + "'!");
            }
            this._current = state;
        }

        private addState(state:string):void {
            this._states[state] = this._states[state] || {};
            if (this._autoAddNopTransition) {
                this.addTransition(state, state);
            }
        }

        private addTransition(state:string, transition:string):void {
            if (!this.hasState(state) || !this.hasState(transition)) {
                throw new com.maigo.state.core.StateCoreException("Invalid transition: '" + state + "' -> '" + transition + "'!");
            }
            this._states[state][transition] = null;
        }
    }
}
module com.maigo.state.core {

    export interface IStateCore {
        states(states:string[]):IStateCore;
        transitions(state:string, transitions:string[]):IStateCore;
        init(state:string):IStateCore;

        hasState(state:string):boolean;
        hasTransition(transition:string, state?:string /* null */):boolean;

        state:string;
    }
}
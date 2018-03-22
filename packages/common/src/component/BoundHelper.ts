import { IBoundProps } from "./IBoundProps";

const setBoundValue = <V = any>(props : IBoundProps<any, V>, value : V) => {
    if(props.bindSetter) {
        props.bindSetter(value);
    } else if(props.bindSetterName) {
        const s = props.bindTarget[props.bindSetterName];
        s.call(props.bindTarget, value);
    } else {
        props.bindTarget[props.bindKey] = value;
    }
};

const getBoundValue = <V = any>(props : IBoundProps<any, V>) : V => {
    if(props.bindGetter) {
        return props.bindGetter();
    }
    
    if(props.bindGetterName) {
        const s = props.bindTarget[props.bindGetterName];
        return s.call(props.bindTarget);
    }

    return props.bindTarget[props.bindKey];
};

export { getBoundValue, setBoundValue }
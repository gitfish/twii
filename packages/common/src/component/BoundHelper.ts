import { IBoundProps } from "./IBoundProps";
import { IBinding } from "./IBinding";

const setBoundValue = <V = any>(props : IBoundProps<any, V>, value : V) => {
    const binding = props.binding;
    if(binding) {
        if(binding.setter) {
            binding.setter(value);
        } else if(binding.setterName) {
            const s = binding.target[binding.setterName];
            s.call(binding.target, value);
        } else {
            binding.target[binding.key] = value;
        }
    }
};

const getBoundValue = <V = any>(props : IBoundProps<any, V>) : V => {
    const binding = props.binding;
    if(binding) {
        if(binding.getter) {
            return binding.getter();
        }
        
        if(binding.getterName) {
            const s = binding.target[binding.getterName];
            return s.call(binding.target);
        }
    
        return binding.target[binding.key];
    }
};

export { getBoundValue, setBoundValue }
import { IBoundProps } from "./IBoundProps";
import { ISupplierFunc } from "@twii/core/lib/ISupplierFunc";
import { IConsumerFunc } from "@twii/core/lib/IConsumerFunc";
import { isFunction } from "@twii/lang";
import { IError } from "@twii/core/lib/IError";
import { getKeyErrorMessage } from "@twii/core/lib/ErrorUtils";

const setBoundValue = <V = any>(props : IBoundProps<any, V>, value : V) => {
    const binding = props.binding;
    if(binding) {
        if(binding.setter) {
            if(isFunction(binding.setter)) {
                (binding.setter as IConsumerFunc<V>)(value);
            } else {
                const s = binding.target[binding.setter as string];
                s.call(binding.target, value);
            }
        } else {
            binding.target[binding.key] = value;
        }
    }
};

const getBoundValue = <V = any>(props : IBoundProps<any, V>) : V => {
    const binding = props.binding;
    if(binding) {
        if(binding.getter) {
            if(isFunction(binding.getter)) {
                return (binding.getter as ISupplierFunc<V>)();
            }
            const s = binding.target[binding.getter as string];
            return s.call(binding.target);
        }
        return binding.target[binding.key];
    }
};

const getErrorMessage = <V = any>(props : IBoundProps<any, V>, errorMessages : IError[]) : string => {
    const binding = props.binding;
    if(binding && binding.key) {
        return getKeyErrorMessage(binding.key, errorMessages);
    }
};

export { getBoundValue, setBoundValue, getErrorMessage }
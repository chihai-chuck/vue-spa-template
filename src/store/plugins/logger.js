import {
    typeNames,
    typeNamesFilter
} from "^config/vuex/mutation";

export default store => {
    store.subscribe((mutation, state) => {
        if(typeNamesFilter.includes(mutation.type)) return;
        const typeName = typeNames[mutation.type];
        GLOBAL.functions.log({
            title: "store-mutation",
            text: mutation.type + (typeName ? ` (${typeName})` : ""),
            color: "#ff3cb0"
        }, mutation.payload);
    })
}
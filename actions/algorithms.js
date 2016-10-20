import {addGateToAlgo, ensureIsMore} from "./index"

export function loadGroverAlgo(cpuId, size) {
    return (dispatch) => {
        var i;
        var j;
        dispatch(addGateToAlgo('X', cpuId, 0, 0));
        for (i = 0; i <= size; ++i) dispatch(addGateToAlgo('H', cpuId, i, 1));

        dispatch(addGateToAlgo('X', cpuId, 2, 2));
        dispatch(addGateToAlgo('X', cpuId, 0, 3));
        for (i = 1; i <= size; ++i) dispatch(addGateToAlgo('C', cpuId, i, 3));
        dispatch(addGateToAlgo('X', cpuId, 2, 4));
        for (j = 0; j < size; ++j) {
            dispatch(addGateToAlgo('H', cpuId, j + 1, 2 * j + 5));
            dispatch(addGateToAlgo('X', cpuId, j + 1, 2 * j + 6));
        }
    }
}

export function loadGroverAlgoConcurrent(cpuId, size) {
    return (dispatch) => {
        var i;
        var j;
        dispatch(addGateToAlgo('X', cpuId, 0, 0));
        for (i = 0; i <= size; ++i) dispatch(addGateToAlgo('H', cpuId, i, 1));
        dispatch(addGateToAlgo('X', cpuId, size - 1, 2));
        dispatch(addGateToAlgo('X', cpuId, 0, 3));
        for (i = 1; i <= size; ++i) dispatch(addGateToAlgo('C', cpuId, i, 3));
        dispatch(addGateToAlgo('X', cpuId, size - 1, 4));
        for (i = 1; i <= size; ++i) dispatch(addGateToAlgo('H', cpuId, i, 5));
        for (i = 1; i <= size; ++i) dispatch(addGateToAlgo('X', cpuId, i, 6));
        dispatch(addGateToAlgo('H', cpuId, 1, 7));
        dispatch(addGateToAlgo('X', cpuId, 1, 8));
        for (i = 2; i <= size; ++i) dispatch(addGateToAlgo('C', cpuId, i, 8));
        dispatch(addGateToAlgo('H', cpuId, 1, 9));
        for (i = 1; i <= size; ++i) dispatch(addGateToAlgo('X', cpuId, i, 10));
        for (i = 1; i <= size; ++i) dispatch(addGateToAlgo('H', cpuId, i, 11));

        dispatch(addGateToAlgo('X', cpuId, size - 1, 12));
        dispatch(addGateToAlgo('X', cpuId, 0, 13));
        for (i = 1; i <= size; ++i) dispatch(addGateToAlgo('C', cpuId, i, 13));
        dispatch(addGateToAlgo('X', cpuId, size - 1, 14));
        for (i = 1; i <= size; ++i) dispatch(addGateToAlgo('H', cpuId, i, 15));
        for (i = 1; i <= size; ++i) dispatch(addGateToAlgo('X', cpuId, i, 16));
        dispatch(addGateToAlgo('H', cpuId, 1, 17));
        dispatch(addGateToAlgo('X', cpuId, 1, 18));
        for (i = 2; i <= size; ++i) dispatch(addGateToAlgo('C', cpuId, i, 18));
        dispatch(addGateToAlgo('H', cpuId, 1, 19));
        for (i = 1; i <= size; ++i) dispatch(addGateToAlgo('X', cpuId, i, 20));
        for (i = 1; i <= size; ++i) dispatch(addGateToAlgo('H', cpuId, i, 21));

    }
}

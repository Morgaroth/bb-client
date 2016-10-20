export const DefaultAlgoSize = 6;
export const DefaultGateSize = 40;


export const PauliXSingle = "https://i.imgur.com/POpEnFb.png";
export const PauliXUp = "https://i.imgur.com/PThSe6N.png";
export const PauliXUpDown = "https://i.imgur.com/GFZE3vO.png";
export const NoopSingle = "https://i.imgur.com/MyEbiTZ.png";
export const CrossUpDown = "https://i.imgur.com/HzOepFO.png";
export const ControlUp = "https://i.imgur.com/VCVu0fH.png";
export const ControlDown = "https://i.imgur.com/qWkSpSw.png";
export const ControlUpDown = "https://i.imgur.com/UZrxNVq.png?1";

export const PauliYHref = "https://i.imgur.com/Bj13YHb.png";
export const PauliZHref = "https://i.imgur.com/Ber1H75.png";
export const HadamardHref = "https://i.imgur.com/Dd7cuza.png";

//Links[Gate] [Up]   [Down]
//Links['X']  [true] [false]
var PauliX = {
    // with up line
    img: PauliXSingle,
    true: {
        // with down line
        true: PauliXUpDown,
        // without down line
        false: PauliXUp
    },
    // without up line
    false: {
        // with down line
        true: PauliXSingle,
        // without down line
        false: PauliXSingle
    }
};
var PauliY = {
    img: PauliYHref,
    true: {
        true: PauliYHref,
        false: PauliYHref
    },
    false: {
        true: PauliYHref,
        false: PauliYHref
    }
};

var PauliZ = {
    img: PauliZHref,
    true: {
        true: PauliZHref,
        false: PauliZHref
    },
    false: {
        true: PauliZHref,
        false: PauliZHref
    }
};
var Hadammard = {
    img: HadamardHref,
    true: {
        true: HadamardHref,
        false: HadamardHref
    },
    false: {
        true: HadamardHref,
        false: HadamardHref
    }
};
var Control = {
    img: ControlDown,
    true: {
        true: ControlUpDown,
        false: ControlUp
    },
    false: {
        true: ControlDown
    }
};
var CrossArr = {
    img: CrossUpDown,
    false: {
        false: CrossUpDown
    }
};
var NoopArr = {
    img: NoopSingle,
    false: {
        false: NoopSingle
    }
};

export const Links = {
    Noop: NoopArr,
    Cross: CrossArr,
    PauliX: PauliX,
    X: PauliX,
    PayliY: PauliY,
    Y: PauliY,
    PauliZ: PauliZ,
    Z: PauliZ,
    Hadammard: Hadammard,
    H: Hadammard,
    Control: Control,
    C: Control
};
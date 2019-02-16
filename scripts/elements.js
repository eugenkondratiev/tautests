

function lag(input, _tm, _delta) {
    let gain = 1.0;
    let T = 5.0;
    let delta = _delta || 0.00000000001;
    let inpValue =input;
    let outValue = 0;
    let oldOut = 0;
    let tm = _tm || 0.1;   
        function out(i) {
            inpValue = isNaN(i) ? inpValue : i;
            const z = tm + T;
            const out = oldOut < inpValue + delta && oldOut > inpValue - delta ? inpValue :  inpValue * tm * gain / z + oldOut * T / z;
            oldOut = out;
            outValue = out;
            return out;
        };
        out.setParameters = function( _gain, _T, pars) {
            if (pars) {
                gain = parse.gain;
                T = parse.T;
                tm = parse.tm;
                delta = parse.delta;
            } else {
                gain = _gain;
                T = _T;
            }
        };
        out.getParameters = function() {
            const pars = {};
            pars.T = T;
            pars.gain = gain;
            pars.Tm = tm;
            pars.delta = delta;
            return pars;
        };
        out.getout = () => outValue;
    return out;
}
//==============================================
const MANUAL = 0;
const AUTO = 1;
const ALFORITHM = 2;
//==============================================

function valveElement(input = 0, _deltaOut = 0.5) {

    let lastOut = input;
    let mode = MANUAL;
    let outValue = input;
    let manInput = input;
    let inpValue = mode > MANUAL ? input : manInput;
    let deltaOut = _deltaOut;
    
    // add out rate (velocity % sec)
    // add limits 0 ..100 %

    function out(i) {
        inpValue =   mode > MANUAL 
            ? isNaN(i) ? inpValue : i 
            : manInput  ;
        const out = Math.abs(outValue - inpValue) > deltaOut ? inpValue : outValue;
        // change using lastOut.... or not?
        lastOut = out;
        outValue = out;
        return out;
    };


    out.setDelta = (_delta = 0.5) => {deltaOut = _delta};
    out.getDelta = () => deltaOut;
    out.getOut = () => outValue;
    out.getManinput = () => manInput;
    out.setManInput = (_man) => { 
        manInput = isNaN(_man) ? manInput : _man ;
    console.log(manInput,  _man);
    
    };

    return out;
}
//================================================================
function rangeRandom(a, b) {
    const min = a > b ? b : a;
    const max = a > b ? a : b;
    return min + Math.random() * (max - min);

}
//================================================================
function noiseElement(amplitude = 0.1) {
    let amp = amplitude && amplitude > 0 ? amplitude : 0.5; 
    console.log("Amp", amp);
    let outValue = 0;
    function out(i = 0){
         outValue = rangeRandom( i - amp, i + amp);
         return outValue;
    };

    out.getAmp = () => amp;
    out.getOut = () => outValue;
    out.setAmp = (_amp = 0.5) => {amp = _amp};

    return out;
}

//================================================================
const STATIC = 0;
const SINUS = 1;
const SAW = 2;
//================================================================

function rateElement(pv = 0, amplitude, mode) {
    let amp = amplitude && amplitude > 0 ? amplitude : 2.5; 
    let pv = 0;
    let mode = STATIC;

    function out(i = 0){
        pv = isNaN(i) ? pv : i;
        let out = pv;
        if (mode === STATIC ) {
            return out;
        } else if (mode === SINUS) {
            /**  sin(x) */
            return out;
        } else if (mode === SAW) {
            /**  SAW(x) */
            return out;
        }
         
         
    };

    out.getAmp = () => amp;
    out.setAmp = (_amp = 0.5) => {amp = _amp};

    return out;
}

//==============================================

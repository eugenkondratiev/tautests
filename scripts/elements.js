

function lag(input, _tm, _delta) {
    let gain = 1.0;
    let T = 5.0;
    let delta = _delta || 0.00000000001;
    let inpValue =input;
    let outValue = 0;
    let oldOut = 0;
    let tm = _tm || 0.1;   
        function getout(i) {
            inpValue = isNaN(i) ? inpValue : i;
            const z = tm + T;
            const out = oldOut < inpValue + delta && oldOut > inpValue - delta ? inpValue :  inpValue * tm * gain / z + oldOut * T / z;
            oldOut = out;
            return out;
        };
        getout.setParameters = function( _gain, _T, pars) {
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
        getout.getParameters = function() {
            const pars = {};
            pars.T = T;
            pars.gain = gain;
            pars.Tm = tm;
            pars.delta = delta;
            return pars;
        };

    return getout;
}
//==============================================
function valveElement(input = 0, _deltaOut = 0.5) {

    let lastOut = input;
    let out = input;
    let manSP = input;
    let inpValue = input;
    let deltaOut = _deltaOut;

    
    function getout(i) {
        inpValue = isNaN(i) ? inpValue : i;
        out = Math.abs(out - inpValue) > deltaOut ? inpValue : out;
        lastOut = out;
        return out;
    };
    getout.setDelta = (_delta = 0.5) => {deltaOut = _delta};
    getout.getDelta = () => deltaOut;
    
    return getout;
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
    function getout(i = 0){
        //console.log(i - amp, i + amp);
        const out = rangeRandom( i - amp, i + amp);
        //console.log(out);
        
        return out;
    };

    getout.getAmp = () => amp;
    getout.setAmp = (_amp = 0.5) => {amp = _amp};
    return getout;
}

//================================================================

console.log("Started");

const obj1 = lag(10, 0.1, 0.0001);
const noise = noiseElement(0.05);
const valve = valveElement();

function tauTick(){
    console.log(
        noise(
        obj1()
        ) , lagCount());
}

function createCounter() {
    let counter = 0;
    return function(){
        return ++counter;
    }
}
const lagCount = createCounter();

let mainHandler = 0;

const stopBtn = document.querySelector("#stop");
stopBtn.addEventListener("click", function(){
    clearInterval(mainHandler);
});

const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", function(){
    mainHandler = setInterval(tauTick, 100);
});

const inp = document.querySelector("#pv");
inp.addEventListener("blur", changePV);
inp.addEventListener("mouseup", changePV);
inp.addEventListener("keypress", function(event){
    if (event.keyCode === 13) {changePV()};
});


function changePV() {
    obj1(parseFloat(inp.value) );
    console.log(inp.value,  typeof inp.value);
}





const changeBtn = document.querySelector("#changeObjParameters");
changeBtn.addEventListener("click", function(){
    //console.log(obj1.getParameters());
    console.log(obj1.setParameters(2, 12));
    
});

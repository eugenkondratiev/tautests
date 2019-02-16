
console.log("Started");

const obj1 = lag(10, 0.1, 0.0001);
const noise = noiseElement(0.05);
const valve = valveElement(20);


const rateNoise = noiseElement(0.05);

const euP = document.querySelector("#euAfterNoise > span");

function tauTick(){

    const eu = noise(
        obj1(
        valve()
        )
        );
    console.log(eu, lagCount());
    updateTags();

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

const manIn = document.querySelector("#ManIn");
manIn.addEventListener("blur", changeManIn);
///ManIn.addEventListener("mouseup", changeManIn);
manIn.addEventListener("keypress", function(event){
    if (event.keyCode === 13) {changeManIn()};
});

manIn.value = valve.getManinput().toFixed(2);//firstTime
console.log(valve.getManinput().toFixed(2));





function changeManIn() {
    //obj1(parseFloat(manIn.value) );
    valve.setManInput(parseFloat(manIn.value) );
    console.log(manIn.value,  typeof manIn.value);
}





const changeBtn = document.querySelector("#changeObjParameters");
changeBtn.addEventListener("click", function(){
    //console.log(obj1.getParameters());
    console.log(obj1.setParameters(2, 12));
    
});


function updateTags() {
    euP.textContent = noise.getOut().toFixed(5);

}
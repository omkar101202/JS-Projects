//here we are using custom-attributes to fetch elements instead of id's & classes this is also one of the method to fetch. 



let passward = "";
let checkCount = 0;
let passwardLen = 10;




//1. implementation of moving slider value is displayed on screen.
const inputSlider = document.querySelector("[data-lengthSlider"); 
const lenghtDisplay = document.querySelector("[data-lengthNumber]");
handleSlider();

//this function takes value from slider and is assigns to inerText of the legthDisplay  
function handleSlider() {
    inputSlider.value = passwardLen;
    lenghtDisplay.innerText = passwardLen ;

    //logic to show slider filled & empty 
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwardLen - min)*100/(max - min)) + "% 100%";
} //displays passward-len on UI.

//An event is added to the input of slider and the value is taken and handle fuc. is called.
//e.target.value-----check-once.
inputSlider.addEventListener("input", (e) => {
    passwardLen = e.target.value
    handleSlider();
} );


//2. copy to clipbosrd implementation
const passwardDisplay = document.querySelector("[data-passward-display]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

//fuction to copy on clipboard
async function copyToClipboard() {
    try{
        await navigator.clipboard.writeText(passwardDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }

    //to make copy text visible
    copyMsg.classList.add("active"); //will implement in css

    //after few sec it must disappear
    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
}

//Add event listener to copy btn
copyBtn.addEventListener("click", () => {
    if(passwardDisplay.value) {
        copyToClipboard();
    }
});




//3. handle checkbox count and change
// select all checkboxes
const allCheckbox = document.querySelectorAll("input[type=checkbox]");

function handleCheckboxChange() {
    checkCount = 0;
    allCheckbox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition [corner case]
    if(passwardLen < checkCount) {
        passwardLen = checkCount;
        handleSlider();
    }
}

allCheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change' , handleCheckboxChange);
});







// 4. function to genetate random required values
const symbols = '-+/*./?><,:;[{}])("!@$=_#%^&~';


//function to grnrrate random no. in range [min , max]
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber(){
    return getRandomInt(0,9);
}

function generateLowercase(){
    return String.fromCharCode(getRandomInt(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getRandomInt(65,91));
}

function generateSymbols(){
    const randNum = getRandomInt(0,symbols.length);
    return symbols.charAt(randNum);
}








//5. strength indicator implementation
const indicator = document.querySelector("[data-indicator]");
const checkUpper = document.querySelector("#uppercase");
const checkLower = document.querySelector("#lowercase");
const checknumber = document.querySelector("#numbers");
const checksymbol = document.querySelector("#symbols");

//this call is done to set the default colour of indicator
setIndicator("#ccc");

//this function set the color of the indicator given in parameters
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow....
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
   
}

//function to check strength
function checkStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(checkUpper.checked) hasUpper = true;
    if(checkLower.checked) hasLower = true;
    if(checknumber.checked) hasNumber = true;
    if(checksymbol.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwardLen>=8) {
        setIndicator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwardLen>=6) {
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
    
}


//6. generate passward implemenation
const generateBtn = document.querySelector(".generateButton");

//function to shuffle passward
function shufflePassward(array) {
    //fisher yates method -> this is famous algo. to shuffle arrays.
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

generateBtn.addEventListener("click", () => {
    //none of the checkbox is selected
    if(checkCount == 0) return; //no passward generation.

    if(passwardLen < checkCount) {
        passwardLen = checkCount; 
        handleSlider();
    }
    console.log(checkCount);

    //code to find new passward

    //remove old passward
    passward = "";

    //add required stuff mentioned as checkboxx
    // if(checkUpper.checked) {
    //     passward += generateUppercase();
    // }
    // if(checkLower.checked) {
    //     passward += generateLowercase();
    // }
    // if(checknumber.checked) {
    //     passward += generateRandomNumber();
    // }
    // if(checksymbol.checked) {
    //     passward += generateSymbols();
    // }

    //we made a array of functions which we have to use to generate passward
    let funArray = [];

    if(checkUpper.checked) {
        funArray.push(generateUppercase);
    }

    if(checkLower.checked) {
        funArray.push(generateLowercase);
    }

    if(checknumber.checked) {
        funArray.push(generateRandomNumber);
    }

    if(checksymbol.checked) {
        funArray.push(generateSymbols);
    }

    //compulsory addition
    for(let i=0; i<funArray.length; i++) {
        passward += funArray[i]();
    }
    console.log('compulsory addition done');

    // remaining addition in passward
    for(let i=0; i<(passwardLen-funArray.length); i++) {
        let ranIdx = getRandomInt(0 , funArray.length);
        passward += funArray[ranIdx]();
    }
    console.log('remaining addition done');

    //now we have generated our passward but the sequence of first 4 char is fixed so it should not happen so now we will schuffle the passward characters.

    //shuffle passward
    passward = shufflePassward(Array.from(passward));
    console.log('shuffling done');

    //show the passward in UI [text-box]
    passwardDisplay.value = passward;
    console.log('UI addition done');
    

    //after generating passward we have to display strenght
    checkStrength();
});


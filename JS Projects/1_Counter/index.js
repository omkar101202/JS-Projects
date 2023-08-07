/*
//1
const countValue = document.querySelector('#counter');

//parseInt -> converts string to integer    

const increment = function ()  {
    let value = parseInt(countValue.innerText);
    value = value + 1;
    countValue.innerText = value;
}

const decrement = () => {
    let value = parseInt(countValue.innerText);
    value = value - 1;
    countValue.innerText = value;
}

//it can be have done same eith event listener but here we have dont it it with 'onclick' event which is present in button means whwnever a button is clicked the particular function will be called.

*/

//2. event listener

const countValue = document.querySelector('#counter');

const minus = document.querySelector('#inc');
minus.addEventListener('click',function() {
    let value = parseInt(countValue.innerText);
    value = value + 1 ;
    countValue.innerText = value;
});

const plus = document.querySelector('#dec');
plus.addEventListener('click',function() {
    let value = parseInt(countValue.innerText);
    value = value - 1 ;
    countValue.innerText = value;
});
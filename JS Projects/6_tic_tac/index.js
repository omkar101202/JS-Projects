const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;
 
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//function to initialize game - [grid is empty] [currPlayer->X] [button in visible]

function initGame() {
    currPlayer = "X";
    gameGrid = ["", "", "", "", "","", "", "", ""];
    
    //empty boxes on ui
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //
        box.classList.remove("win");

    });

    newGameBtn.classList.remove("active"); 
    gameinfo.innerText = `Current Player - ${currPlayer}`;
}

initGame();    //successfully initialized 

function swapTurns() {
    if(currPlayer == "X"){
        currPlayer = "O";
    }
    else{
        currPlayer = "X";
    }

    //update on ui
    gameinfo.innerText = `Current Player - ${currPlayer}`;
}

function checkGameOver() {

    let ans = "";

    //all 3 boxes are non empty and exactly same
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== ""  || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) &&
         (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is x
            if(gameGrid[position[0]] == "X"){
                ans = "X";
            }
            else {
                ans = "O";
            }

            //disable pointer event
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })

            // now we know the winner so mark green color
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
         }

    });


    if(ans !== "") {
        gameinfo.innerText = `Winner Player - ${ans}`;
        newGameBtn.classList.add("active");
        return;
    } 

    //when there is no winner means tied
    let count = 0;
    gameGrid.forEach((box) => {
        if( box !== ""){
            count++;
        }
    });

    if(count === 9){
        gameinfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currPlayer;//this changes in ui
        gameGrid[index] = currPlayer; //this is for our logic
        boxes[index].style.pointerEvents = "none";
        swapTurns();

        checkGameOver();
    }
}

boxes.forEach((box , index) => {
    box.addEventListener("click",() => {
        handleClick(index);
    })
})

newGameBtn.addEventListener("click", initGame);


let boxes = document.querySelectorAll(".box");
let resetGame = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let msg = document.querySelector("#msg");
let draw = document.querySelector("#draw");
let themeBtn = document.querySelector("#theme-switch");

//initial player o
let player0 = true;

//no of moves
let count = 0;


//winning patterns
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


//to disable buttons
const disableBoxes = () => {
    for(box of boxes){
        box.disabled = true;
    }
}

//to enable buttons
const enableBoxes = () => {
    for(box of boxes){
        box.disabled = false;
        resetGame.classList.remove("hide");
        box.innerText = "";
        draw.classList.add("hide");
        count = 0;
    }
}

//to reset game
const reset = () =>{
    player0 = true;
    enableBoxes();
    msg.classList.add("hide");
    newGame.classList.add("hide");
}


//to print the winner of the game
const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is Player ${winner}`;
    msg.classList.remove("hide");
    newGame.classList.remove("hide");
    resetGame.classList.add("hide");
    disableBoxes();
}


//core logic
const checkWinner = () => {
    for(pattern of winPattern){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                console.log("winner", pos1val);
                showWinner(pos1val);
            }
        }
    }
}

//buttons clicking
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(player0){
            box.innerText = "o";
            box.classList.add("playerO");
            box.classList.remove("playerX");
            player0 = false;
        }else{
            box.innerText = "x";
            box.classList.add("playerX");
            box.classList.remove("playerO");
            player0 = true;
        }
        box.disabled = true;
        checkWinner();
        count++;
        if(count === 9){
            draw.classList.remove("hide");

        }
    })
})


//new game button
newGame.addEventListener("click", reset);

//reset button
resetGame.addEventListener("click", reset);

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("theme1");
})
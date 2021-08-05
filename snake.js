let inputDirection={
    x:0,
    y:0
};
const foodSound = new Audio("food.mp3");
const gameOver = new  Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const music= new Audio("music.mp3");
let elapsed=0;
let speed=3;
let snakeArr=[
    { x:18,  y:15}
]
food={
    x:5, y:5
};


function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime -elapsed)/1000 < 1/speed)
        return;
    //console.log(ctime);
    elapsed = ctime;
    gameEngine();
}

function collide(snake){
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 20 || snake[0].x <=0 || snake[0].y >= 20 || snake[0].y <=0 ){
        return true;
    }
}



function gameEngine(){
    //if it touches the wall
    if(collide(snakeArr)){
        gameOver.play();
        music.pause();
        inputDirection={x:0, y:0};
        alert("Game Over press Enter Key to Start again");
        snakeArr=[{ x:18,  y:15}];
        music.play();
        score=0;
    }

    //if eaten the food regenerate new food
    if(snakeArr[0].y===food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score++;
        if(score >8)speed=5;
        else if(score>13)speed=8;
        scorebox.innerHTML="Score : " +score;
        snakeArr.unshift({x:snakeArr[0].x + inputDirection.x , y:snakeArr[0].y + inputDirection.y});
        let a=1;
        let b=19;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    //move the snake
    for(let i=snakeArr.length-2; i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    //displaying the snake
    board.innerHTML ="";
    for (let i = 0; i < snakeArr.length; i++) {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart =snakeArr[i].y;
        snakeElement.style.gridColumnStart =snakeArr[i].x;
        snakeElement.classList.add("snake");
        document.getElementById("board").appendChild(snakeElement);
        console.log(snakeArr[i].y);
        console.log(snakeArr[i].x);
    }
    //Display food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart =food.y;
    foodElement.style.gridColumnStart =food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}


window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    inputDirection={ x:0,y:1};
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDirection.x= 0;
            inputDirection.y= -1;
            break;
        case "ArrowDown":
            inputDirection.x= 0;
            inputDirection.y= 1;
            break;
        case "ArrowLeft":
            inputDirection.x= -1;
            inputDirection.y= 0;
            break;
        case "ArrowRight":
            inputDirection.x= 1;
            inputDirection.y= 0;
            break;
    }
})
//game constants
let inputDir = {x: 0, y: 0};
const foodsound = new Audio("food.mp3");
const gameover = new Audio("gameover.mp3");
const movesound = new Audio("move.mp3");
const music = new Audio("bgmusic.mp3");
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakearray = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7} //food is not array coz its a particle

//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return 0;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //collide yourself
    for (let i = 1; i < snakearray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }    
    //collide to wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0 ){
        return true;
    }

    return false;
}
function gameEngine(){
    //Part1 : updating snake array and food
    if(isCollide(snakearray)){
        gameover.play();
        music.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over!! Press any key to Play Again");
        snakearray = [{x: 13, y: 15}];
        music.play();
        score = 0;

    }

    //eaten food, increase score and create new food
    if(snakearray[0].y === food.y && snakearray[0].x === food.x){
        foodsound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("High Score", JSON.stringify(hiscoreval));
            HighscoreBox.innerHTML = "High Score: "+ hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakearray.unshift({x: snakearray[0].x + inputDir.x, y: snakearray[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};        
    };

    //moving the snake
    for (let i = snakearray.length - 2; i>=0; i--) {
        snakearray[i+1] = {...snakearray[i]};
    }

    snakearray[0].x += inputDir.x;
    snakearray[0].y += inputDir.y;

    //Part2 : display snake and food
    //display snake
    board.innerHTML= " ";
    snakearray.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;//here row is in y axis 
        snakeElement.style.gridColumnStart = e.x;// here coloumn is in x axis
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;//here row is in y axis 
    foodElement.style.gridColumnStart = food.x;// here coloumn is in x axis
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

//main logic starts here
music.play();
let Highscore = localStorage.getItem("High Score");
if (Highscore === null) {
    hiscoreval = 0;
    localStorage.setItem("High Score", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(Highscore);
    HighscoreBox.innerHTML = "High Score: "+ Highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    //means whenever key is down or pressed listen to the event and do this
    inputDir = {x: 0, y: 1}; //start the game now
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})
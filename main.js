//IMPORTS
import {update as updateShop,draw as drawShop}from './scripts/upgrades.js';
import {update as updateGameStats,draw as drawGameStats} from './scripts/gameStats.js'
import {update as updateGamePanel,draw as drawGamePanel} from './scripts/gamePanel.js'

let timeSinceLastRender = 0;
const FPS = 1;
let framecounter = 0;
function main(currentTime) {
    //Ask the browser if the function can be ran
    window.requestAnimationFrame(main);
    //Get seconds since last render
    const secondsSinceLastRender = (currentTime-timeSinceLastRender)/1000;
    //If it has not been a second/amount of executions per second exit the function
    if(secondsSinceLastRender < 1 / FPS)return;
    //Give set the current loop itteration time to timeSinceLastRender
    timeSinceLastRender = currentTime;
    update();
    draw();
    framecounter++
    console.log(`Total Frames Ran: ${framecounter}`)
}
//Run Game
window.requestAnimationFrame(main);

function update() {
    console.log('-----Game Model Updated')
    updateGameStats();
    updateGamePanel();
    updateShop();

}

function draw() {
    console.log('-----Game View Updated')
    drawGameStats();
    drawGamePanel();
    drawShop();
}

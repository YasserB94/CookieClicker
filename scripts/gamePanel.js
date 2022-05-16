import {bakeCookie} from './gameStats.js'
export function update(){
    console.log('@@gamePanel Draw')

}

export function draw(){
    console.log('@@gamePanel Draw')

}

//Cookie
const cookie = document.getElementById('cookie');
cookie.addEventListener('click',()=>{
    bakeCookie();
})

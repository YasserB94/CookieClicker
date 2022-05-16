import { getOvenMultiplier } from './upgrades.js'
//Will contain the model and logic for the game-stats-panel
//Cookies Baked,Cookies in Shop, Credits
let totalCookiesBaked = 0;
let cookiesInShop = 0;

export function update() {
}
export function draw() {
    drawCookiesBaked()
}
export function bakeCookie() {
    totalCookiesBaked += 1 * getOvenMultiplier();
    cookiesInShop += 1 * getOvenMultiplier();
}
export function checkShopCookieStock() {
    if(cookiesInShop<1){
        return false;
    }else{
        return true;
    }
}
export function sellCookie(amountOfCookiesSold) {
    if (!cookiesInShop > 0) return;
    cookiesInShop -= 1 * amountOfCookiesSold;
}
function drawCookiesBaked() {
    document.getElementById('cookies-baked').innerText = '';
    document.getElementById('cookies-baked').innerText = totalCookiesBaked;
    document.getElementById('cookies-shop').innerText = '';
    document.getElementById('cookies-shop').innerText = cookiesInShop;
}
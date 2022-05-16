//Will contain the model and logic for the game-stats-panel
//Cookies Baked,Cookies in Shop, Credits
let totalCookiesBaked = 0;
let cookiesInShop = 0;

export function update() {
    console.log('@@GameStats Update')
}
export function draw() {
    console.log('@@GameStats Draw')
    drawCookiesBaked()
}
export function bakeCookie() {
    totalCookiesBaked++
    cookiesInShop++
}
function drawCookiesBaked() {
    document.getElementById('cookies-baked').innerText = '';
    document.getElementById('cookies-baked').innerText = totalCookiesBaked;
    document.getElementById('cookies-shop').innerText = '';
    document.getElementById('cookies-shop').innerText = cookiesInShop;
}
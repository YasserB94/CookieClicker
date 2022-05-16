//Will contain the model and logic for the game-stats-panel
//Cookies Baked,Cookies in Shop, Credits
let totalCookiesBaked = 0;


export function update() {
    console.log('@@GameStats Update')
}
export function draw() {
    console.log('@@GameStats Draw')
    drawCookiesBaked()
}
export function bakeCookie() {
    totalCookiesBaked++
}
function drawCookiesBaked() {
    document.getElementById('cookies-baked').innerText = '';
    document.getElementById('cookies-baked').innerText = totalCookiesBaked;
}
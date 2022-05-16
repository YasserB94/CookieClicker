import { sellCookie, checkShopCookieStock } from "./gameStats.js";


//Credits
let credits = 0;
//Upgrade levels
let ovenLevel = 0;
let cookieQuality = 0;
let economicLevel = 0;
//Upgrade stats
let ovenmultiplier = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let qualitymultiplier = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let economyMultiplier = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let upgradeCosts = [10,50,100,250,500,1000,2500,5000,7500,10000]
export function update() {
    updateCredits();

}
export function draw() {
    drawCredits();
    drawShop();

}
//Credits
function updateCredits() {
    if (checkShopCookieStock()) {
        const cookiesToSell = economyMultiplier[economicLevel];
        sellCookie(cookiesToSell);
        increaseCredits(cookiesToSell)
    } else {
        return;
    }
}
function increaseCredits(amount) {
    credits += amount * 1 * qualitymultiplier[cookieQuality];
}
function drawCredits() {
    document.getElementById('credits').innerText = '';
    document.getElementById('credits').innerText = credits;
}
//OVEN
document.getElementById('upgrade-oven').addEventListener('click',upgradeOven)
function upgradeOven(){
    if(credits>=upgradeCosts[ovenLevel]){
        credits-=upgradeCosts[ovenLevel]
        ovenLevel+=1
    }else{
        return;
    }
}
export function getOvenMultiplier() {
    return ovenmultiplier[ovenLevel];
}
function drawShop(){
document.getElementById('oven-upgrade-cost').innerText = `${upgradeCosts[ovenLevel]} credits`
}

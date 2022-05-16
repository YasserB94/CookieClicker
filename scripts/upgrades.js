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
let upgradeCosts = [10, 50, 100, 250, 500, 1000, 2500, 5000, 7500, 10000]
export function update() {
    updateCredits();

}
export function draw() {
    drawCredits();
    drawShop();
    drawEconomy();

}
function drawShop() {
    document.getElementById('oven-upgrade-cost').innerText = `${upgradeCosts[ovenLevel]} credits`;
    document.getElementById('oven-level').innerText = `Level: ${ovenLevel+1}`
    document.getElementById('cookies-per-click').innerText = `Cookies per click: ${ovenmultiplier[ovenLevel]}`
}
function drawCredits() {
    document.getElementById('credits').innerText = '';
    document.getElementById('credits').innerText = credits;
}
//Credits
function updateCredits() {
    const cookiesToSell = economyMultiplier[economicLevel];
    if (checkShopCookieStock()>cookiesToSell) {
        sellCookie(cookiesToSell);
        cookiesToCredits(cookiesToSell)
    } else {
        return;
    }
}
function cookiesToCredits(amount) {
    credits += amount * 1 * qualitymultiplier[cookieQuality];
}
//OVEN
document.getElementById('upgrade-oven').addEventListener('click', upgradeOven)
function upgradeOven() {
    if (credits >= upgradeCosts[ovenLevel]) {
        credits -= upgradeCosts[ovenLevel]
        ovenLevel += 1
    } else {
        return;
    }
}
export function getOvenMultiplier() {
    return ovenmultiplier[ovenLevel];
}
//Economy
document.getElementById('upgrade-economy').addEventListener('click',upgradeEconomy)
function upgradeEconomy(){
    if (credits >= upgradeCosts[economicLevel]) {
        credits -= upgradeCosts[economicLevel]
        economicLevel += 1
    } else {
        return;
    }
}
function drawEconomy(){
    document.getElementById('economy-upgrade-cost').innerText = `${upgradeCosts[economicLevel]} credits`;
    document.getElementById('economy-level').innerText = `Level: ${economicLevel+1}`
    document.getElementById('credits-per-cookie').innerText = `Credits per Cookie: ${economyMultiplier[economicLevel]}`

}
export function getEconomyMultiplier(){
    return economyMultiplier[economicLevel];
}
import { sellCookie, checkShopCookieStock, addCookie } from "./gameStats.js";

//Stats
let cookiesBakedByStaffPerSecond = 0;
//Credits
let credits = 0;
//Upgrade levels
let ovenLevel = 0;
let cookieQuality = 0;
let economicLevel = 0;
let staffLevel = 0;
let totalTipsEarned =0;
//Upgrade stats
let ovenmultiplier = [1, 2, 4, 6, 10, 14, 20, 25, 50, 100,125,150,175,200,225,250,275,300];
let chanceToEarnTips = [1,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];
let economyMultiplier = [1, 2, 3, 4, 5, 7, 9, 11, 13, 15,19,23,27,31,35,40,45,50,60,70,80,90,100,120,140,160,180,200,220,240,260,280,300];
let chanceToFindStaff = [10, 15, 20, 25, 30, 35, 40, 45, 50, 100]
let upgradeCosts = [10, 50, 100, 250, 500, 1000, 2500, 5000, 7500, 10000, 12500, 15000, 17500, 20000, 25000, 30000, 35000, 40000, 45000, 50000,55000,60000,65000,70000,75000,80000,85000,90000,100000]
function updateArrays(){
    increaseArrayItems(ovenmultiplier,ovenLevel);
    increaseArrayItems(chanceToEarnTips,economicLevel);
    increaseArrayItems(economyMultiplier,economicLevel)
}
function increaseArrayItems(array,upgradeLevel){
    const arrayLength = array.length-1;
    if(upgradeLevel>=arrayLength){
        const newItem = array[arrayLength-1]*2;
        array.push(newItem)
    }else{
        return;
    }    
}
const newStaffNames = ['Master Molly','BakeRaider Tomb','Holy Cannoli','Sugar Daddy','The Muffin Man','']
const staffPool = [
    {
        name: 'Captain Baker',
        workSpeed: 1,
        hunger: 1,
        happyBonus: 2,
        sadPenalty: 1
    },
    {
        name: 'Cookie Popper',
        workSpeed: 3,
        hunger: 1,
        happyBonus: 2,
        sadPenalty: 5
    },
    {
        name: 'Uber Baker',
        workSpeed: 5,
        hunger: 4,
        happyBonus: 4,
        sadPenalty: 10
    }
]
const hiredStaff = [];
let staffIncreasedCostPerMember = hiredStaff.length;

export function update() {
    updateCredits();
    staffBakesCookies();
    updateArrays();
}
export function draw() {
    drawCredits();
    drawShop();
    drawEconomy();
    drawStaff();
    drawQuality();
}
function drawShop() {
    document.getElementById('oven-upgrade-cost').innerText = `${upgradeCosts[ovenLevel]} credits`;
    document.getElementById('oven-level').innerText = `Level: ${ovenLevel + 1}`
    document.getElementById('cookies-per-click').innerText = `Cookies per click: ${ovenmultiplier[ovenLevel]}`
}
function drawCredits() {
    document.getElementById('credits').innerText = '';
    document.getElementById('credits').innerText = credits;
}
function drawEconomy() {
    document.getElementById('economy-upgrade-cost').innerText = `${upgradeCosts[economicLevel]} credits`;
    document.getElementById('economy-level').innerText = `Level: ${economicLevel + 1}`
    document.getElementById('credits-per-cookie').innerText = `Sales per second: ${economyMultiplier[economicLevel]}`

}
function drawStaff() {
    document.getElementById('staff-list').innerHTML = "";
    document.getElementById('staff-upgrade-cost').innerText = `${upgradeCosts[staffLevel]+staffIncreasedCostPerMember} credits`;
    document.getElementById('staff-level').innerText = `Level: ${staffLevel + 1}`;
    document.getElementById('hiring-chance').innerText =`Chance to gain staff on next search: ${chanceToFindStaff[staffLevel]}%`
    hiredStaff.forEach(staffmember => {
        const newStaffListElement = document.createElement('li')
        newStaffListElement.innerText = staffmember.name;
        document.getElementById('staff-list').appendChild(newStaffListElement)
    });
    document.getElementById('cookies-by-staff-per-minute').innerText = `Staff cookies baked per min: ${cookiesBakedByStaffPerSecond*60}`
    cookiesBakedByStaffPerSecond = 0;

}
function drawQuality() {
    document.getElementById('quality-upgrade-cost').innerText = `${upgradeCosts[cookieQuality]} credits`;
    document.getElementById('quality-level').innerText = `Level: ${cookieQuality + 1}`
    document.getElementById('tips-earned-total').innerText = `Total tips earned: ${totalTipsEarned}`
    if(cookieQuality>=chanceToEarnTips.length){
        document.getElementById('tip-chance').innerText = `Amazing cookies! Double Tips`
        return;
    }
    document.getElementById('tip-chance').innerText = `Tip Chance: ${chanceToEarnTips[cookieQuality]}%`
}
//Credits
function updateCredits() {
    const cookiesToSell = economyMultiplier[economicLevel];
    if (checkShopCookieStock() > cookiesToSell) {
        sellCookie(cookiesToSell);
        cookiesToCredits(cookiesToSell);
    } else {
        return;
    }
}
function cookiesToCredits(amount) {
    credits += amount * 1;
    earnTips();
}
//OVEN
document.getElementById('upgrade-oven').addEventListener('click', upgradeOven)
function upgradeOven() {
    if (upgradeCosts[ovenLevel]>=upgradeCosts.length){
        increaseArrayItems(upgradeCosts,upgradeCosts.length)
    }
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
document.getElementById('upgrade-economy').addEventListener('click', upgradeEconomy)
function upgradeEconomy() {
    if (upgradeCosts[economicLevel]>=upgradeCosts.length){
        increaseArrayItems(upgradeCosts,upgradeCosts.length)
    }
    if (credits >= upgradeCosts[economicLevel]) {
        credits -= upgradeCosts[economicLevel]
        economicLevel += 1
    } else {
        return;
    }
}
export function getEconomyMultiplier() {
    return economyMultiplier[economicLevel];
}
//Staff
document.getElementById('upgrade-staff').addEventListener('click', upgradeStaff)
function upgradeStaff() {
    if (credits >= upgradeCosts[staffLevel]+staffIncreasedCostPerMember) {
        credits -= (upgradeCosts[staffLevel]+staffIncreasedCostPerMember)
        let hireChanceString = '0';
        hireChanceString += chanceToFindStaff[staffLevel];
        const hireChance = parseInt(hireChanceString)
        if (Math.random() <= (hireChance / 100)) {
            if (staffPool.length < 3) {
                //Create new random staff members with randomised stats
                createStaffMember()
                createStaffMember()
                createStaffMember()
            }
            //LIMIT STAFF TO 5
            // if (hiredStaff.length >=5 ){
            //     console.log('true')
               
            //     const deleteRandomIndex = randomNumber(hiredStaff.length);
            //     for(let i = 0;i<hiredStaff.length;i++){
            //         if(i===deleteRandomIndex){
            //             hiredStaff.splice(i,1)
            //         }
            //     }
            //     console.log('staffPool:' + staffPool)
            // }
            const randomIndex = randomNumber(staffPool.length)
            //Select a random staff member from the array
            const newStaff = staffPool[randomIndex]
            staffPool.splice(randomIndex,1)
            
            hiredStaff.push(newStaff)
            console.log(staffPool)
            //If a member gets hired, the chance and cost go back down
            staffLevel = 0;
            staffIncreasedCostPerMember = (hiredStaff.length*1000);
        } else {
            //If a member does not get found the chance and the cost go up
            staffLevel += 1;
        }
    } else {
        return;
    }
}
function staffBakesCookies() {
    
    hiredStaff.forEach(staffmember => {
        const cookiesBakedbyStaffMember = staffmember.workSpeed;
        cookiesBakedByStaffPerSecond+=cookiesBakedbyStaffMember;
        addCookie(cookiesBakedbyStaffMember);
    });
}
//Generates random extra staffmember with random stats between 1-10;
function createStaffMember() {
    let newmembername = 'Bleep The Robot';
    if(newStaffNames.length>0){
    const randomIndex = randomNumber(newStaffNames.length);
    newmembername = newStaffNames[randomIndex];
    newStaffNames.splice(randomIndex,1);
    }
    const newStaffMember = {
        name: newmembername,
        workSpeed: randomNumber(8),
        hunger: randomNumber(8),
        happyBonus: randomNumber(5),
        sadPenalty: randomNumber(5)
    }
    staffPool.push(newStaffMember);
}
//Cookie Quality
document.getElementById('upgrade-quality').addEventListener('click', upgradeQuality)
function upgradeQuality() {
    if (upgradeCosts[cookieQuality]>=upgradeCosts.length-1){
        increaseArrayItems(upgradeCosts,upgradeCosts.length-1)
    }
    if (credits >= upgradeCosts[cookieQuality]) {
        credits -= upgradeCosts[cookieQuality]
        cookieQuality += 1
    } else {
        return;
    }
}
function earnTips(){
    //If cookieQuality = maxlvl increase tips earned
    if(cookieQuality>=chanceToEarnTips.length){
        totalTipsEarned++
        totalTipsEarned++
        return;
    }
    //Create random number see if it matches, increase odds based on lvl
    let tempString = '0';
        tempString += chanceToEarnTips[cookieQuality];
        const tipChance = parseInt(tempString)
        if(Math.random()<=(tipChance/100)){
            credits++
            totalTipsEarned++
        }
}
function randomNumber(max) {
    return Math.floor(Math.random() * max)
}

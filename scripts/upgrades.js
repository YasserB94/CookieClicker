import { sellCookie, checkShopCookieStock, addCookie } from "./gameStats.js";

//Stats
let credits = 0;
let cookiesBakedByStaffPerSecond = 0;
let cookiesSoldByStaffPerSecond = 0;
//Upgrade levels
let ovenLevel = 0;
let cookieQuality = 0;
let economicLevel = 0;
let staffLevel = 0;
let totalTipsEarned = 0;
let ovenRented = false;

let staffBaking = true;
let staffSelling = false;
//Upgrade stats
let ovenmultiplier = [1, 2, 4, 6, 10, 14, 20, 25, 50, 100, 125, 150, 175, 200, 225, 250, 275, 300];
let chanceToEarnTips = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
let economyMultiplier = [1, 2, 3, 4, 5, 7, 9, 11, 13, 15, 19, 23, 27, 31, 35, 40, 45, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300];
let chanceToFindStaff = [10, 15, 20, 25, 30, 35, 40, 45, 50, 100]
let upgradeCosts = [10, 50, 100, 250, 500, 1000, 2500, 5000, 7500, 10000, 12500, 15000, 17500, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 100000]
function updateArrays() {
    increaseArrayItems(ovenmultiplier, ovenLevel);
    increaseArrayItems(chanceToEarnTips, economicLevel);
    increaseArrayItems(economyMultiplier, economicLevel)
}
function increaseArrayItems(array, upgradeLevel) {
    const arrayLength = array.length - 1;
    if (upgradeLevel >= arrayLength) {
        const newItem = array[arrayLength - 1] * 2;
        array.push(newItem)
    } else {
        return;
    }
}
const newStaffNames = ['Master Molly', 'BakeRaider Tomb', 'Holy Cannoli', 'Sugar Daddy', 'The Muffin Man']
const staffPool = [
    {
        name: 'Captain Baker',
        workSpeed: 1,
        saleSkill: 5,
        willingToChangeJobs: 3
    },
    {
        name: 'Cookie Popper',
        workSpeed: 3,
        saleSkill: 3,
        willingToChangeJobs: 3
    },
    {
        name: 'Uber Baker',
        workSpeed: 5,
        saleSkill: 1,
        willingToChangeJobs: 3
    }
]
const hiredStaff = [];
let staffIncreasedCostPerMember = hiredStaff.length;
export function update() {
    updateCredits();
    staffBakesCookies();
    staffSellsCookies();
    updateArrays();
    costToChangeJobs();
}
export function draw() {
    drawCredits();
    drawShop();
    drawEconomy();
    drawStaff();
    drawQuality();
    drawRentedOven();
    drawJobChange();
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
    document.getElementById('staff-upgrade-cost').innerText = `${upgradeCosts[staffLevel] + staffIncreasedCostPerMember} credits`;
    document.getElementById('staff-level').innerText = `Level: ${staffLevel + 1}`;
    document.getElementById('hiring-chance').innerText = `Chance to gain staff on next search: ${chanceToFindStaff[staffLevel]}%`
    hiredStaff.forEach(staffmember => {
        const newStaffListElement = document.createElement('li')
        newStaffListElement.innerText = staffmember.name;
        document.getElementById('staff-list').appendChild(newStaffListElement)
    });
    document.getElementById('cookies-by-staff-per-minute').innerText = `Staff cookies baked per min: ${cookiesBakedByStaffPerSecond * 60}`
    cookiesBakedByStaffPerSecond = 0;
}
function drawRentedOven() {
    if (ovenRented) {
        document.getElementById('rent-oven-title').innerText = "Your staff has an epic Oven!";
        document.getElementById('rent-oven-timer').innerText = `Time left with extra oven:${ovenRentTime}`

    } else {
        document.getElementById('rent-oven-title').innerText = "";
        document.getElementById('rent-oven-timer').innerText = "";
    }
    const currentStaffCount = hiredStaff.length;
    document.getElementById('rent-oven-cost').innerText = `${currentStaffCount * 1000} credits`;

}
function drawQuality() {
    document.getElementById('quality-upgrade-cost').innerText = `${upgradeCosts[cookieQuality]} credits`;
    document.getElementById('quality-level').innerText = `Level: ${cookieQuality + 1}`
    document.getElementById('tips-earned-total').innerText = `Total tips earned: ${totalTipsEarned}`
    if (cookieQuality >= chanceToEarnTips.length) {
        document.getElementById('tip-chance').innerText = `Amazing cookies! Double Tips`
        return;
    }
    document.getElementById('tip-chance').innerText = `Tip Chance: ${chanceToEarnTips[cookieQuality]}%`
}
function drawJobChange() {
    if (staffSelling) {
        document.getElementById('staff-change-cost').innerText = `${costToChangeJobs()} Credits`
        document.getElementById('staff-action-description').innerText = `Staff is`;
        document.getElementById('staff-action').innerText = `Selling Cookies`;
        document.getElementById('staff-action-shop').innerText = `Bake Cookies`;
    } else if ((hiredStaff.length > 0) && staffBaking) {
        document.getElementById('staff-change-cost').innerText = `1000 Credits`
        document.getElementById('staff-action-description').innerText = `Staff is`;
        document.getElementById('staff-action').innerText = `Baking Cookies`;
        document.getElementById('staff-action-shop').innerText = `Sell Cookies`;
    }else{
        document.getElementById('staff-change-cost').innerText = `No Staff`
        document.getElementById('staff-action-description').innerText = ``;
        document.getElementById('staff-action').innerText = ``;
        document.getElementById('staff-action-shop').innerText = ``;
    }
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
    if (checkShopCookieStock() > amount) {
        credits += amount * 1;
        sellCookie(amount)
    }
    for (let i = 0; i < amount; i++) {
        earnTips();
    }
}
//OVEN
document.getElementById('upgrade-oven').addEventListener('click', upgradeOven)
function upgradeOven() {
    if (upgradeCosts[ovenLevel] >= upgradeCosts.length) {
        increaseArrayItems(upgradeCosts, upgradeCosts.length)
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
    if (upgradeCosts[economicLevel] >= upgradeCosts.length) {
        increaseArrayItems(upgradeCosts, upgradeCosts.length)
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
    if (credits >= upgradeCosts[staffLevel] + staffIncreasedCostPerMember) {
        credits -= (upgradeCosts[staffLevel] + staffIncreasedCostPerMember)
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
            staffPool.splice(randomIndex, 1)

            hiredStaff.push(newStaff)
            //If a member gets hired, the chance and cost go back down
            staffLevel = 0;
            staffIncreasedCostPerMember = (hiredStaff.length * 250);
        } else {
            //If a member does not get found the chance and the cost go up
            staffLevel += 1;
        }
    } else {
        return;
    }
}
function staffBakesCookies() {
    if (staffBaking) {
        if (!ovenRented) {
            hiredStaff.forEach(staffmember => {
                const cookiesBakedbyStaffMember = staffmember.workSpeed;
                cookiesBakedByStaffPerSecond += cookiesBakedbyStaffMember;
                addCookie(cookiesBakedbyStaffMember);
            });
        } else if (ovenRented) {
            hiredStaff.forEach(staffmember => {
                const cookiesBakedbyStaffMember = ovenmultiplier[ovenLevel];
                cookiesBakedByStaffPerSecond += cookiesBakedbyStaffMember;
                addCookie(cookiesBakedbyStaffMember);
            });
        }
    } else {
        return;
    }

}
//Generates random extra staffmember with random stats between 1-10;
function createStaffMember() {
    let newmembername = 'Bleep The Robot';
    if (newStaffNames.length > 0) {
        const randomIndex = randomNumber(newStaffNames.length);
        newmembername = newStaffNames[randomIndex];
        newStaffNames.splice(randomIndex, 1);
    }
    const newStaffMember = {
        name: newmembername,
        workSpeed: randomNumber(10),
        saleSkill: randomNumber(10),
        willingToChangeJobs: randomNumber(10)
    }
    staffPool.push(newStaffMember);
}
//Cookie Quality
document.getElementById('upgrade-quality').addEventListener('click', upgradeQuality)
function upgradeQuality() {
    if (upgradeCosts[cookieQuality] >= upgradeCosts.length - 1) {
        increaseArrayItems(upgradeCosts, upgradeCosts.length - 1)
    }
    if (credits >= upgradeCosts[cookieQuality]) {
        credits -= upgradeCosts[cookieQuality]
        cookieQuality += 1
    } else {
        return;
    }
}
function earnTips() {
    //If cookieQuality = maxlvl increase tips earned
    if (cookieQuality >= chanceToEarnTips.length) {
        totalTipsEarned++
        totalTipsEarned++
        return;
    }
    //Create random number see if it matches, increase odds based on lvl
    let tempString = '0';
    tempString += chanceToEarnTips[cookieQuality];
    const tipChance = parseInt(tempString)
    if (Math.random() <= (tipChance / 100)) {
        credits++
        totalTipsEarned++
    }
}
//Rent An Oven
document.getElementById('rent-oven').addEventListener('click', rentOven);
let ovenRentTime = 0;
let ovenRentTimer;
function rentOven() {
    const currentStaffCount = hiredStaff.length;

    if (credits >= 250 * currentStaffCount && currentStaffCount != 0) {
        credits -= currentStaffCount * 1000;
        ovenRented = true;
        ovenRentTime += 10;
        ovenRentTimer = setInterval(reduceRentTime, 1000);
    } else {
        return;
    }
}
function reduceRentTime() {
    if (ovenRentTime > 0) {
        ovenRentTime--;
    } else {
        clearInterval(ovenRentTimer)
        ovenRented = false;
    }
}
//Change Staff Jobs
function staffSellsCookies() {
    if (staffSelling) {
        hiredStaff.forEach(staffmember => {
            const cookiesSoldByStaffMember = staffmember.saleSkill;
            cookiesToCredits(cookiesSoldByStaffMember);
        });
    } else {
        return;
    }
}
function costToChangeJobs() {
    let cost = credits;
    cost = Math.round(cost / 1000);
    cost *= 100;
    let staffWillingToChangeJobs = 0;
    hiredStaff.forEach(staffmember => {
        const staffMemberCostToChangeJobs = staffmember.willingToChangeJobs;
        staffWillingToChangeJobs += staffMemberCostToChangeJobs;
    });
    cost *= Math.round(staffWillingToChangeJobs / 2)
    return cost;
}
document.getElementById('staff-change').addEventListener('click', staffChangesJobs)
function staffChangesJobs() {
    if(hiredStaff.length<1)return;
    let staffJobChangeCost = 0;
    if (staffBaking) {
        staffJobChangeCost = costToChangeJobs();
    } else {
        staffJobChangeCost = 1000;
    }
    if (credits >= staffJobChangeCost) {
        credits -= staffJobChangeCost
        if (staffBaking) {
            staffSelling = true;
            staffBaking = false;
        } else if (staffSelling) {
            staffBaking = true;
            staffSelling = false;
        }
    } else {
        return;
    }


}
function randomNumber(max) {
    return Math.floor(Math.random() * max)
}

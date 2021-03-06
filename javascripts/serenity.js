function startSerenity () {
    document.getElementById("mainMaterialsContainer").style.display = "none";
    player.serenityPending = true;
}

function resetSerenity () {
    player.serenities += 1;
    player.totalSerenities += 1;
    player.serenityPending = false;
    player.serenityUnlocked = true;
    player.totalSerenitiesMult = Math.log2(player.totalSerenities + 1) * 2;
    if (player.totalSerenitiesMult < 1) {player.totalSerenitiesMult = 1};
    player.highestSerenitiesMult = Math.max(1, ((Math.log10(player.highestSerenities + 5)) + 1) / 2);
    player.stoneGeneratorExp = 2 * player.highestSerenitiesMult;
    player.startingStone = 0;
    player.stone = 0;
    if (player.totalSerenities >= 3) {
        player.startingStone = 10 * player.totalSerenities;
        player.stone = player.startingStone;
    }
    else {
        player.stone = 0;
    }



    if (player.serenityUpgrades[0].bought === true) {
        player.particlesStartingPos = 1e4 * (10 ** player.serenities);
    }
    else {
        player.particlesStartingPos = 1e4 * (100 ** player.serenities);
    }

    player.particles = player.particlesStartingPos;

    //console.log(player.startingStone);
    //console.log(player.stone);
    player.highestStone = 0;
    player.totalStone = 0;
        
    for(let i = 0; i < 10; i++) {
        player.stoneGenerators[i].cost = Math.pow(Math.pow(10, i), i + 1) * 10;
        player.stoneGenerators[i].bought = 0;
        player.stoneGenerators[i].amount = 0;
        player.stoneGenerators[i].mult = 1;
        player.stoneGenerators[i].displayed = false;
    }

    player.stoneUpgrades[0].cost = 25;
    player.stoneUpgrades[0].baseCost = 25;
    player.stoneUpgrades[0].bought = 0;
    player.stoneUpgrades[0].mult = 1;
    player.stoneUpgrades[0].costIncrease = '(25 ** su.bought) * 25';
    player.stoneUpgrades[0].costIncreaseExp = 25;
    player.stoneUpgrades[0].displayed = true;

    player.stoneUpgrades[1].cost = 1e6;
    player.stoneUpgrades[1].baseCost = 1e6;
    player.stoneUpgrades[1].bought = 0;
    player.stoneUpgrades[1].mult = 1;
    player.stoneUpgrades[1].costIncrease = '(1e6 ** su.bought) * 1e6';
    player.stoneUpgrades[1].costIncreaseExp = 1e6;
    player.stoneUpgrades[1].displayed = false;

    if (player.particlesStartingPos >= 1e308) {
        player.winnerDisplay = true;
    }

    if ((player.serenityMilestones[3].bought !== true) || (player.serenityAutobuyer !== true)) {
    document.getElementById("mainMaterialsContainer").style.display = "flex";
    }
}

var serenityMilestone0 = {
    cost: 3,
    bought: false,
    displayed: true,
}
//Improves starting stone

var serenityMilestone1 = {
    cost: 5,
    bought: false,
    displayed: true,
}
//Unlocks Automatic Compression Booster

var serenityMilestone2 = {
    cost: 10,
    bought: false,
    displayed: true,
}
//Unlocks Stone Generator Autobuyer

var serenityMilestone3 = {
    cost: 15,
    bought: false,
    displayed: true,
}
//Unlocks Serenity Autobuyer

var serenityMilestone4 = {
    cost: 25,
    bought: false,
    displayed: true,
}
//Unlocks Stone Upgrade Autobuyer

var serenityUpgrade0 = {
    cost: 50,
    bought: false,
    displayed: true,
}

function buySerenityUpgrade (i) {
    let su = player.serenityUpgrades[i];
    if ((player.totalSerenities >= su.cost) && (su.bought === false)) {
        resetSerenityUpgrade();
        su.bought = true;
    }
}

function resetSerenityUpgrade () {
    player.serenities = 0;
    player.stone = 0;
    player.totalSerenities = 0;
    player.highestSerenities = 0;
    player.serenityPending = false;
    player.serenityUnlocked = true;
    player.totalSerenitiesMult = Math.log2(player.totalSerenities + 1) * 2;
    if (player.totalSerenitiesMult < 1) {player.totalSerenitiesMult = 1};
    player.highestSerenitiesMult = Math.max(1, Math.log10(player.highestSerenities + 5));
    player.stoneGeneratorExp = 2 * player.highestSerenitiesMult;


    if (player.serenityUpgrades[0].bought === true) {
        player.particlesStartingPos = 1e4 * (10 ** player.serenities);
    }
    else {
        player.particlesStartingPos = 1e4 * (100 ** player.serenities);
    }

    player.particles = player.particlesStartingPos;

    if (player.totalSerenities >= 3) {
        player.stone = player.startingStone;
    }
    player.highestStone = 0;
    player.totalStone = 0;
    player.stoneGain = 1;
        
    for(let i = 0; i < 10; i++) {
        player.stoneGenerators[i].cost = Math.pow(Math.pow(10, i), i + 1) * 10;
        player.stoneGenerators[i].bought = 0;
        player.stoneGenerators[i].amount = 0;
        player.stoneGenerators[i].mult = 1;
        player.stoneGenerators[i].displayed = false;
    }

    player.stoneUpgrades[0].cost = 25;
    player.stoneUpgrades[0].baseCost = 25;
    player.stoneUpgrades[0].bought = 0;
    player.stoneUpgrades[0].mult = 1;
    player.stoneUpgrades[0].costIncrease = '(25 ** su.bought) * 25';
    player.stoneUpgrades[0].costIncreaseExp = 25;
    player.stoneUpgrades[0].displayed = true;

    player.stoneUpgrades[1].cost = 1e6;
    player.stoneUpgrades[1].baseCost = 1e6;
    player.stoneUpgrades[1].bought = 0;
    player.stoneUpgrades[1].mult = 1;
    player.stoneUpgrades[1].costIncrease = '(1e6 ** su.bought) * 1e6';
    player.stoneUpgrades[1].costIncreaseExp = 1e6;
    player.stoneUpgrades[1].displayed = false;


    //document.getElementById("mainMaterialsContainer").style.display = "flex";
    //document.getElementById("serenityUpgrade0").style.display = "none";
}

function toggleSerenityAutobuyer() {
    if (player.serenityAutobuyer === true) {
        player.serenityAutobuyer = false;
        document.getElementById("toggleSerenityAutobuyerBtn").textContent = "Serenity Autobuyer: Off";
    }
    else {
        player.serenityAutobuyer = true;
        document.getElementById("toggleSerenityAutobuyerBtn").textContent = "Serenity Autobuyer: On";
    }
}

function switchToWinTab() {
    if (player.switchedToWinTab === false) {
        player.switchedToWinTab = true;
        switchTab('winner');
        switchSubTab('winner','Win');
    }
}

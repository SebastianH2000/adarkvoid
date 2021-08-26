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
    player.highestSerenitiesMult = Math.max(1, (Math.log10(player.highestSerenities + 5)));
    player.stoneGeneratorExp = 2 * player.highestSerenitiesMult;

    if (player.totalSerenities >= 3) {
        player.serenityMilestones[0].bought = true;
        player.startingStone = (10 + player.totalSerenities);
        document.getElementById("serenityMilestone0").style.backgroundColor = "var(--primary-4)";
    }
    if (player.totalSerenities >= 10) {
        player.serenityMilestones[1].bought = true;
        player.stoneUpgrades[1].displayed = true;
        document.getElementById("serenityMilestone1").style.backgroundColor = "var(--primary-4)";
    }



    player.particlesStartingPos = 10000 * (100 ** player.serenities);

    player.particles = player.particlesStartingPos;

    player.stone = player.startingStone;
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

    player.stoneUpgrades[1].cost = 1000;
    player.stoneUpgrades[1].baseCost = 1000;
    player.stoneUpgrades[1].bought = 0;
    player.stoneUpgrades[1].mult = 1;
    player.stoneUpgrades[1].costIncrease = '(1000 ** su.bought) * 1000';
    player.stoneUpgrades[1].costIncreaseExp = 1000;
    player.stoneUpgrades[1].displayed = false;

    document.getElementById("mainMaterialsContainer").style.display = "flex";
}

var serenityMilestone0 = {
    cost: 3,
    bought: false,
    displayed: true,
}
player.serenityMilestones.push(serenityMilestone0);

var serenityMilestone1 = {
    cost: 10,
    bought: false,
    displayed: true,
}
player.serenityMilestones.push(serenityMilestone1);
let currentTime = Date.now();
setInterval(mainLoop, 20);
setInterval(slowLoop, 1000);
let elapsedTime = Date.now() - currentTime;

function mainLoop() {
  elapsedTime += Date.now() - currentTime;
  currentTime = Date.now();
  while(elapsedTime > 20) {
    elapsedTime -= 20;
    //do stuff
    mainGameLoop();
  }
  updateDisplay();
}

function mainGameLoop() {
    stoneGeneration();
    if (player.stone > player.highestStone) {
        player.highestStone = player.stone;
    }
    if (player.serenities > player.highestSerenities) {
        player.highestSerenities = player.serenities;
    }
    player.stoneGeneratorExp = 2 * player.highestSerenitiesMult;
    for(let i = 0; i < 10; i++) {
        let sg = player.stoneGenerators[i];
        let sg0 = player.stoneGenerators[0];
        let sge = player.stoneGeneratorExp;
        for(let u = i; u > 0; u--) {
            sge = (sge + 1) / 2;
        };
        sg.mult = sge ** (Math.max(0, (sg.bought - 1))) * player.totalSerenitiesMult;
        sg0.mult = player.stoneGeneratorExp ** (Math.max(0, (sg0.bought - 1))) * player.stoneUpgrades[1].mult * player.totalSerenitiesMult;
    }
    player.highestSerenitiesMult = Math.max(1, (Math.log10(player.highestSerenities + 5)));
    if (player.totalSerenities >= 3) {
        player.serenityMilestones[0].bought = true;
        player.startingStone = (player.totalSerenities * 10);
        document.getElementById("serenityMilestone0").style.backgroundColor = "var(--primary-4)";
    }
    else {
        player.serenityMilestones[0].bought = true;
        player.startingStone = 10;
        document.getElementById("serenityMilestone0").style.backgroundColor = "var(--primary-3)";
    }
    if (player.totalSerenities >= 5) {
        player.serenityMilestones[1].bought = true;
        player.stoneUpgrades[1].displayed = true;
        document.getElementById("serenityMilestone1").style.backgroundColor = "var(--primary-4)";
    }
    else {
        player.serenityMilestones[1].bought = false;
        player.stoneUpgrades[1].displayed = false;
        document.getElementById("serenityMilestone1").style.backgroundColor = "var(--primary-3)";
    }
    if (player.totalSerenities >= 10) {
        player.serenityMilestones[2].bought = true;
        if (player.stoneGeneratorsAutobuyer === true) {
            buyMaxAllStoneGenerators();
        }
        document.getElementById("toggleStoneGeneratorAutobuyerBtn").style.display = "flex";
        document.getElementById("serenityMilestone2").style.backgroundColor = "var(--primary-4)";
    }
    else {
        player.serenityMilestones[2].bought = false;
        document.getElementById("toggleStoneGeneratorAutobuyerBtn").style.display = "none";
        document.getElementById("serenityMilestone2").style.backgroundColor = "var(--primary-3)";
    }
    if (player.totalSerenities >= 15) {
        player.serenityMilestones[3].bought = true;
        document.getElementById("serenityMilestone3").style.backgroundColor = "var(--primary-4)";
    }
    else {
        player.serenityMilestones[3].bought = false;
        document.getElementById("serenityMilestone3").style.backgroundColor = "var(--primary-3)";
    }
    if (player.totalSerenities >= 25) {
        player.serenityMilestones[4].bought = true;
        if (player.stoneUpgradesAutobuyer === true) {
            buyMaxAllStoneUpgrades();
        }
        document.getElementById("toggleStoneUpgradeAutobuyerBtn").style.display = "flex";
        document.getElementById("serenityMilestone4").style.backgroundColor = "var(--primary-4)";
    }
    else {
        player.serenityMilestones[4].bought = false;
        document.getElementById("toggleStoneUpgradeAutobuyerBtn").style.display = "none";
        document.getElementById("serenityMilestone4").style.backgroundColor = "var(--primary-3)";
    }
}

function updateDisplay() {
    //Main, Materials
    updateText('particlesDisplay',`Particles: ${format(player.particles, 2)}`);
    updateText('particlesLostPerSecDisplay',`Particles Lost Per Second: ${format(player.particlesLostPerSec, 2)}`);
    updateText('stoneDisplay',`Stone: ${format(player.stone, 2)}`);
    updateText('stonePerSecDisplay',`Stone Generated Per Second: ${format(player.stonePerSec, 2)}`);
    if (player.autoSave === true) {
        updateText('autoSaveBtn',`Auto Save (Saves Once Every Second): ON`);
    }
    else {
        updateText('autoSaveBtn',`Auto Save (Saves Once Every Second): OFF`);
    }

    scaleWindow();

    for(let i = 0; i < 9; i++) {
        let sg = player.stoneGenerators[i];
        let sg1 = player.stoneGenerators[i + 1];
        let sga = (sg1.amount * sg1.mult);
        let sge = player.stoneGeneratorExp;
        for(let u = i; u > 0; u--) {
            sge = (sge + 1) / 2;
        };
        if (sg.amount !== 0) {sgs = sg.amount} else {sgs = 1};
        //console.log(sgs + "-" + i);
        document.getElementById("stoneGenerator" + i + "." + 1).textContent = "StoneGenerator^" + (i) + ": " + format(sg.amount,2) + "(" + format(sg.bought,0) + ") x" + format(sg.mult,2);
        document.getElementById("stoneGenerator" + i + "." + 2).textContent = "+" + format(sga,2) + "/s (+" + format((sga / sgs) * 100,2) + "%)";
        document.getElementById("stoneGenerator" + i + "." + 3).textContent = "Cost: " + format(sg.cost,2) + " Stone";// + "<div class=\"infoBoxFive\">(+1 To Amount, x" + sge + " To Mult)</div>";
        if (player.stoneGeneratorsDetailed === true) {
            document.getElementById("stoneGenerator" + i + "." + 4).style.display = "flex";
            document.getElementById("stoneGenerator" + i + "." + 4).style.flexDirection = "column";
            document.getElementById("stoneGenerator" + i + "." + 4.2).textContent = "x" + format(sge,2) + " To Mult";
        }
        else {
            document.getElementById("stoneGenerator" + i + "." + 4).style.display = "none";
        }
        if (player.highestStone >= (sg.cost / 10)) {
            sg.displayed = true;
            document.getElementById("stoneGenerator" + i).style.display = "flex";
        }
        else if (sg.displayed !== true) {
            document.getElementById("stoneGenerator" + i).style.display = "none";
        }
    }    

        let sge = player.stoneGeneratorExp;
        for(let u = 9; u > 0; u--) {
            sge = (sge + 1) / 2;
        };
        document.getElementById("stoneGenerator9.1").textContent = "StoneGenerators^9: " + format(player.stoneGenerators[9].amount,2) + "(" + format(player.stoneGenerators[9].bought,0) + ")   x" + format(player.stoneGenerators[9].mult,2);
        document.getElementById("stoneGenerator9.2").textContent = "+0.00/s(0.00%)";
        document.getElementById("stoneGenerator9.3").textContent = "Cost: " + format(player.stoneGenerators[9].cost,2) + " Stone";
        if (player.stoneGeneratorsDetailed === true) {
            document.getElementById("stoneGenerator9.4").style.display = "flex";
            document.getElementById("stoneGenerator9.4").style.flexDirection = "column";
            document.getElementById("stoneGenerator9.4.2").textContent = "x" + format(sge,2) + " To Mult";
        }
        else {
            document.getElementById("stoneGenerator9.4").style.display = "none";
        }
        if (player.highestStone >= (player.stoneGenerators[9].cost / 10)) {
            player.stoneGenerators[9].displayed = true;
            document.getElementById("stoneGenerator9").style.display = "flex";
        }
        else if (player.stoneGenerators[9].displayed !== true) {
            document.getElementById("stoneGenerator9").style.display = "none";
        }

    for(let i = 0; i < 10; i++) {
        evaluateMenuBtn(player.stone,player.stoneGenerators[i].cost,"stoneGenerator" + i + ".3");
        evaluateMenuBtn(player.stone,player.stoneGenerators[i].cost,"buyMaxStoneGenerator" + i);
    }
    function buyMaxAllStoneGeneratorsBtn () {
        let sg = player.stoneGenerators;
        let st = player.stone;
        if ((st < sg[0].cost) && (st < sg[1].cost) && (st < sg[2].cost) && (st < sg[3].cost) && (st < sg[4].cost) && (st < sg[5].cost) && (st < sg[6].cost) && (st < sg[7].cost) && (st < sg[8].cost) && (st < sg[9].cost)) {
            document.getElementById("buyMaxAllStoneGeneratorsBtn").classList.add("Off");
        }
        else {
            document.getElementById("buyMaxAllStoneGeneratorsBtn").classList.remove("Off");
        }
    }
    buyMaxAllStoneGeneratorsBtn();



    //Main, Upgrades

    if ((player.stoneUpgrades[1].displayed === "true") || (player.serenityMilestones[1].bought === true)) {
        document.getElementById("stoneUpgrade1").style.display = "flex";
        document.getElementById("buyMaxStoneUpgrade1").style.display = "flex";
    }
    else {
        document.getElementById("stoneUpgrade1").style.display = "none";
        document.getElementById("buyMaxStoneUpgrade1").style.display = "none";
    }

    let su0 = player.stoneUpgrades[0];
    let su1 = player.stoneUpgrades[1];
    document.getElementById("stoneUpgrade0.1").textContent = "Costs: " + format(su0.cost,2) + " Stone";
    document.getElementById("stoneUpgrade0.2").textContent = "Bought: " + format(su0.bought,2);
    document.getElementById("stoneUpgrade0.3").textContent = "Current Effect On Manual Compression: x" + format((5 ** su0.bought),2) + " Efficiency";
    document.getElementById("stoneUpgrade0.4").textContent = "Next Effect On Manual Compression: x" + format((5 ** (su0.bought + 1)),2) + " Efficiency";
    
    document.getElementById("stoneUpgrade1.1").textContent = "Costs: " + format(su1.cost,2) + " Stone";
    document.getElementById("stoneUpgrade1.2").textContent = "Bought: " + format(su1.bought,2);
    document.getElementById("stoneUpgrade1.3").textContent = "Current Effect On Automatic Compression: x" + format((2 ** su1.bought),2) + " Efficiency";
    document.getElementById("stoneUpgrade1.4").textContent = "Next Effect On Automatic Compression: x" + format((2 ** (su1.bought + 1)),2) + " Efficiency";


    evaluateMenuBtn(player.stone,player.stoneUpgrades[0].cost,"stoneUpgrade0");
    evaluateMenuBtn(player.stone,player.stoneUpgrades[0].cost,"buyMaxStoneUpgrade0");
    evaluateMenuBtn(player.stone,player.stoneUpgrades[1].cost,"stoneUpgrade1");
    evaluateMenuBtn(player.stone,player.stoneUpgrades[1].cost,"buyMaxStoneUpgrade1");
    function buyMaxAllStoneUpgradesBtn () {
        let su = player.stoneUpgrades;
        let st = player.stone;
        if ((st < su[0].cost) && (st < su[1].cost)) {
            document.getElementById("buyMaxStoneUpgradesBtn").classList.add("Off");
        }
        else {
            document.getElementById("buyMaxStoneUpgradesBtn").classList.remove("Off");
        }
    }
    buyMaxAllStoneUpgradesBtn();



    //Serenity, Materials

    if (player.serenityUnlocked === true) {
        document.getElementById("serenityTab").style.display = "flex";
    }
    else if (player.serenityUnlocked === false) {
        document.getElementById("serenityTab").style.display = "none";
    }

    updateText('serenityDisplay',`Serenities: ${format(player.serenities, 2)}`);
    updateText('totalSerenitiesMultDisplay',`Your Total Serenities (${format(player.totalSerenities, 2)}) Provide A Multiplier To All Normal Generators: x${format(player.totalSerenitiesMult, 2)}`);
    updateText('highestSerenitiesMultDisplay',`Your Highest Serenities (${format(player.highestSerenities, 2)}) Past 5 Boost The Stone Generator Bought Exponent: x${format(player.highestSerenitiesMult, 2)}`);
    updateText('stoneGeneratorExpDisplay',`The Current Stone Generator Exponent: x${format(player.stoneGeneratorExp, 2)}`);

    if (player.serenityPending === true) {
        document.getElementById("particlesDisplayMeta").style.display = "flex";
        updateText('particlesDisplayMeta',`Particles: 0.00`);
        document.getElementById("serenityInfoBtn").style.display = "flex";
        updateText('serenityInfoBtn',`Reset The Stone Layer To Gain: 1 Serenity`);
    }
    else {
        document.getElementById("particlesDisplayMeta").style.display = "none";
        document.getElementById("serenityInfoBtn").style.display = "none";
    }



    //Serenity, Milestones

    let sm0 = player.serenityMilestones[0];
    let sm1 = player.serenityMilestones[1];
    let sm2 = player.serenityMilestones[2];
    let sm3 = player.serenityMilestones[3];
    let sm4 = player.serenityMilestones[4];
    document.getElementById("serenityMilestone0.1").textContent = "Total Serenities Needed: " + format(sm0.cost,2);
    document.getElementById("serenityMilestone0.2").textContent = "Effect: Start Each Run With (Total Serenities * 10)";

    document.getElementById("serenityMilestone1.1").textContent = "Total Serenities Needed: " + format(sm1.cost,2);
    document.getElementById("serenityMilestone1.2").textContent = "Effect: Unlock A New Stone Upgrade";

    document.getElementById("serenityMilestone2.1").textContent = "Total Serenities Needed: " + format(sm2.cost,2);
    document.getElementById("serenityMilestone2.2").textContent = "Effect: Automatically Buy Stone Generators";

    document.getElementById("serenityMilestone3.1").textContent = "Total Serenities Needed: " + format(sm3.cost,2);
    document.getElementById("serenityMilestone3.2").textContent = "Effect: Automatically Reset Serenities";

    document.getElementById("serenityMilestone4.1").textContent = "Total Serenities Needed: " + format(sm4.cost,2);
    document.getElementById("serenityMilestone4.2").textContent = "Effect: Automatically Buy Stone Upgrades";

    

    //Serenity Milestone 1
    //Serenity Needed: 10
    //Effect: Start Each Run With 10 Stone
}

function evaluateMenuBtn(p1,p2,p3) {
    if (p1 < p2) {
        document.getElementById(p3).classList.add("Off");
    }
    else {
        document.getElementById(p3).classList.remove("Off");
    }
}

function updateText(p1,p2) {
    document.getElementById(p1).innerHTML = p2;
}

function slowLoop() {
    if (player.autoSave === true) {
        save();
    }
}

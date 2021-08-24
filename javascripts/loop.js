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

}

function updateDisplay() {
    updateText('particlesDisplay',`Particles: ${format(player.particles, 2)}`);
    updateText('particlesLostPerSecDisplay',`Particles Lost Per Second: ${format(player.particlesLostPerSec, 2)}`);
    updateText('stoneDisplay',`Stone: ${format(player.stone, 2)}`);
    updateText('stonePerSecDisplay',`Stone Generated Per Second: ${format(player.stonePerSec, 2)}`);
    if (player.autoSave == true) {
        updateText('autoSaveBtn',`Auto Save (Saves Once Every Second): ON`)
    }
    else {
        updateText('autoSaveBtn',`Auto Save (Saves Once Every Second): OFF`);
    }

    scaleWindow();

    for(let i = 0; i < 9; i++) {
        let sg = player.stoneGenerators[i];
        let sg1 = player.stoneGenerators[i + 1];
        let sga = (sg1.amount * sg1.mult);
        if (sg.amount !== 0) {sgs = sg.amount} else {sgs = 1};
        //console.log(sgs + "-" + i);
        document.getElementById("stoneGenerator" + i + "." + 1).textContent = "StoneGenerator^" + (i) + ": " + format(sg.amount,2) + "(" + format(sg.bought,0) + ")   x" + format(sg.mult,2);
        document.getElementById("stoneGenerator" + i + "." + 2).textContent = "+" + format(sga,2) + "/s (+" + format((sga / sgs) * 100,2) + "%)";
        document.getElementById("stoneGenerator" + i + "." + 3).textContent = "Cost: " + format(sg.cost,2) + " Stone";
        if (player.highestStone >= (sg.cost / 10)) {
            sg.displayed = true;
            document.getElementById("stoneGenerator" + i).style.display = "flex";
        }
        else if (sg.displayed !== true) {
            document.getElementById("stoneGenerator" + i).style.display = "none";
        }
    }    
        document.getElementById("stoneGenerator9.1").textContent = "StoneGenerators^9: " + format(player.stoneGenerators[9].amount,2) + "(" + format(player.stoneGenerators[9].bought,0) + ")   x" + format(player.stoneGenerators[9].mult,2);
        document.getElementById("stoneGenerator9.2").textContent = "+0.00/s(0.00%)";
        document.getElementById("stoneGenerator9.3").textContent = "Cost: " + format(player.stoneGenerators[9].cost,2) + " Stone";
        if (player.highestStone >= (player.stoneGenerators[9].cost / 10)) {
            player.stoneGenerators[9].displayed = true;
            document.getElementById("stoneGenerator9").style.display = "flex";
        }
        else if (player.stoneGenerators[9].displayed !== true) {
            document.getElementById("stoneGenerator9").style.display = "none";
        }
        
        if (player.stoneUpgrades[1].displayed !== "true") {
            document.getElementById("stoneUpgrade1").style.display = "flex";
        }
        else {
            document.getElementById("stoneUpgrade1").style.display = "none";
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
        /*
        Boost Manual Compression
        Costs: 25.00 Stone
        Bought: 0
        Current Effect On Manual Compression: 1.00x Efficiency
        Next Effect On Manual Compression: 5.00x Efficiency
        */

    for(let i = 0; i < 10; i++) {
        evaluateMenuBtn(player.stone,player.stoneGenerators[i].cost,"stoneGenerator" + i + ".3");
        evaluateMenuBtn(player.stone,player.stoneGenerators[i].cost,"buyMaxStoneGenerator" + i);
    }
    function buyMaxAllStoneGenerators () {
        let sg = player.stoneGenerators;
        let st = player.stone;
        if ((st < sg[0].cost) && (st < sg[1].cost) && (st < sg[2].cost) && (st < sg[3].cost) && (st < sg[4].cost) && (st < sg[5].cost) && (st < sg[6].cost) && (st < sg[7].cost) && (st < sg[8].cost) && (st < sg[9].cost)) {
            document.getElementById("buyMaxStoneGeneratorsBtn").classList.add("Off");
        }
        else {
            document.getElementById("buyMaxStoneGeneratorsBtn").classList.remove("Off");
        }
    }
    buyMaxAllStoneGenerators();

    evaluateMenuBtn(player.stone,player.stoneUpgrades[0].cost,"stoneUpgrade0");
    evaluateMenuBtn(player.stone,player.stoneUpgrades[0].cost,"buyMaxStoneUpgrade0");
    evaluateMenuBtn(player.stone,player.stoneUpgrades[1].cost,"stoneUpgrade1");
    evaluateMenuBtn(player.stone,player.stoneUpgrades[1].cost,"buyMaxStoneUpgrade1");
    function buyMaxAllStoneUpgrades () {
        let su = player.stoneUpgrades;
        let st = player.stone;
        if ((st < su[0].cost) && (st < su[1].cost)) {
            document.getElementById("buyMaxStoneUpgradesBtn").classList.add("Off");
        }
        else {
            document.getElementById("buyMaxStoneUpgradesBtn").classList.remove("Off");
        }
    }
    buyMaxAllStoneUpgrades();
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
    else {}
}

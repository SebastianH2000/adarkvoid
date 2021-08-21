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
        document.getElementById("stoneGenerator" + i + "." + 1).textContent = "StoneGenerators^" + (i) + ": " + format(sg.amount,2) + "(" + format(sg.bought,0) + ")   x" + format(sg.mult,2);
        document.getElementById("stoneGenerator" + i + "." + 2).textContent = "+" + format(sga,2) + "/s(" + format((sga / (sg.amount + 1) * 100 + (sga / 100)),2) + "%)";
        document.getElementById("stoneGenerator" + i + "." + 3).textContent = "Cost: " + format(sg.cost,2);
        if (player.highestStone >= (sg.cost / 10)) {
            document.getElementById("stoneGenerator" + i).style.display = "flex";
        }
        else {
            document.getElementById("stoneGenerator" + i).style.display = "none";
        }
    }    
        document.getElementById("stoneGenerator9.1").textContent = "StoneGenerators^9: " + format(player.stoneGenerators[9].amount,2) + "(" + format(player.stoneGenerators[9].bought,0) + ")   x" + format(player.stoneGenerators[9].mult,2);
        document.getElementById("stoneGenerator9.2").textContent = "+0.00/s(0.00%)";
        document.getElementById("stoneGenerator9.3").textContent = "Cost: " + format(player.stoneGenerators[9].cost,2);
        if (player.highestStone >= (player.stoneGenerators[9].cost / 10)) {
            document.getElementById("stoneGenerator9").style.display = "flex";
        }
        else {
            document.getElementById("stoneGenerator9").style.display = "none";
        }
}

function stoneGeneration() {
    function sg(p1) {return player.stoneGenerators[p1]};
    function sg1(p1) {return player.stoneGenerators[p1 + 1]};
    //let sga = (p1) => {(sg1.amount * sg1.mult / 50)};
    //sg(9).amount = 1;
    //player.stone += sg(0).amount / 50;
    gainStone(sg(0).amount / 50);
    for(let i = 0; i < 9; i++) {
        sg(i).amount += sg(i + 1).amount * sg(i + 1).mult / 50;
    }    
    //sg(0).amount += sg(1).amount * sg(1).mult / 50;
    player.stonePerSec = sg(0).amount * sg(0).mult;
}

function updateText(p1,p2) {
    document.getElementById(p1).innerHTML = p2;
}

function slowLoop() {
    if (player.autoSave == true) {
        save();
    }
    else {}
}
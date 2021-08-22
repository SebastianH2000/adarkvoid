function gainStone(p1) {
    //let p2 = p1 * player.stoneGain;
    if (player.particles >= player.stoneCost * p1) {
        player.particles -= player.stoneCost * p1;
        player.stone += p1;
        player.totalStone += p1;
    }
    else {
        player.particles = 0;
    }
    document.getElementById("addStoneBtn").textContent = "Compress " + player.stoneCost * player.stoneUpgrades[0].mult + " Particles Into " + player.stoneGain + " Stone";
}

function stoneGeneration() {
    function sg(p1) {return player.stoneGenerators[p1]};
    //let sga = (p1) => {(sg1.amount * sg1.mult / 50)};
    //sg(9).amount = 1;
    //player.stone += sg(0).amount / 50;
    gainStone(sg(0).amount * sg(0).mult / 50);
    for(let i = 0; i < 9; i++) {
        sg(i).amount += sg(i + 1).amount * sg(i + 1).mult / 50;
    }    
    //sg(0).amount += sg(1).amount * sg(1).mult / 50;
    player.stonePerSec = sg(0).amount * sg(0).mult;
    player.particlesLostPerSec = sg(0).amount * sg(0).mult * player.stoneCost;
}

for(let i = 0; i < 10; i++) {
let stoneGenerator = {
        cost: Math.pow(Math.pow(10, i), i + 1) * 10,
        bought: 0,
        amount: 0,
        mult: 1,
        displayed: false,
}
player.stoneGenerators.push(stoneGenerator);
}

function buyStoneGenerator(i) {
    let sg = player.stoneGenerators[i];
    let sg0 = player.stoneGenerators[0];
    if (player.stone >= sg.cost) {
        player.stone -= sg.cost;
        sg.bought += 1;
        sg.amount += 1;
        sg.mult = Math.max(1,(2 ** (sg.bought - 1)));
        sg0.mult = Math.max(1,(2 ** (sg.bought - 1)) * player.stoneUpgrades[1].mult);
        sg.cost = Math.pow(Math.pow(10, i), i + 1) * (10 ** (sg.bought * (i + 1))) * 10;
    }
}

var stoneUpgrade0 = {
    cost: 25,
    bought: 0,
    mult: 1,
    costIncrease: '(25 ** su.bought) * 25',
}
player.stoneUpgrades.push(stoneUpgrade0);

var stoneUpgrade1 = {
    cost: 100,
    bought: 0,
    mult: 1,
    costIncrease: '(10 ** su.bought) * 100',
}
player.stoneUpgrades.push(stoneUpgrade1);

function buyStoneUpgrade(i) {
    let su = player.stoneUpgrades[i];
    if (player.stone >= su.cost) {
        player.stone -= su.cost;
        su.bought += 1;
        su.cost = eval(su.costIncrease);

        if (i === 0) {
            player.stoneUpgrades[0].mult = 5 ** su.bought;
            //player.stoneCost = 10 * su.mult;
            player.stoneGain = 1 * su.mult;
        }
        if (i === 1) {
        let sg0 = player.stoneGenerators[0];  
        su.mult = 2 ** su.bought;
        sg0.mult = Math.max(1,(2 ** (sg0.bought - 1)) * su.mult);
        }

    }
}

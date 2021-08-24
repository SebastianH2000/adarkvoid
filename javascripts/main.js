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
    document.getElementById("addStoneBtn").textContent = "Compress " + format(player.stoneCost * player.stoneUpgrades[0].mult,0) + " Particles Into " + format(1 * player.stoneUpgrades[0].mult,0) + " Stone";
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
        base: Math.pow(Math.pow(10, i), i + 1) * 10,
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
        sg0.mult = Math.max(1,(2 ** (sg0.bought - 1)) * player.stoneUpgrades[1].mult);
        sg.cost = Math.pow(Math.pow(10, i), i + 1) * (10 ** (sg.bought * (i + 1))) * 10;
    }
}

function maxParticles () {
    player.particles = 1e300;
}

function buyMaxStoneGenerator(i) {
    //Math.floor(Math.log10(((c * (r - 1)) / (b * (r ** k))) + 1) / Math.log10(r));
    let sg = player.stoneGenerators[i];
    let sg0 = player.stoneGenerators[0];

    //let b = Math.pow(Math.pow(10, i), i + 1) * (10 ** (sg.bought * (i + 1))) * 10;
    let b = ((10 ** i) ** (i + 1)) * 10;
    let r = 10 ** (i + 1);
    //let r = i + 2;
    //let r = Math.log10(10 ** (i + 2))// / Math.log10(10 ** (i + 1));
    let k = sg.bought;
    let c = player.stone;
    console.log('buyMax() Values: '+ i + ',' + b + ',' + r + ',' + k + ',' + c);
    let result = Math.floor(Math.log10(((c * (r - 1)) / (b * (r ** k))) + 1) / Math.log10(r));
    console.log('Result:' + result);
    console.log('Unfloored Result: ' + Math.log10(((c * (r - 1)) / (b * (r ** k))) + 1) / Math.log10(r));

    if (result >= 1) {
        console.log("boughtMax");
        for (let u = 1; u < result; u++) {
            let sgb = sg.bought + u;
            player.stone -= Math.pow(Math.pow(10, i), i + 1) * (10 ** (sgb * (i + 1))) * 10;
        }
        player.stone -= sg.cost;
        sg.bought += result;
        sg.amount += result;
        sg.mult = Math.max(1,(2 ** (sg.bought - 1)));
        sg0.mult = Math.max(1,(2 ** (sg0.bought - 1)) * player.stoneUpgrades[1].mult);
        sg.cost = Math.pow(Math.pow(10, i), i + 1) * (10 ** (sg.bought * (i + 1))) * 10;
    }
    else {
        console.log("notBoughtMax");
    }
}

function buyMaxAllStoneGenerators() {
    for(let i = 0; i < 10; i++) {
        buyMaxStoneGenerator(i);
    }
}



var stoneUpgrade0 = {
    cost: 25,
    baseCost: 25,
    bought: 0,
    mult: 1,
    costIncrease: '(25 ** su.bought) * 25',
    costIncreaseExp: 25,
    displayed: true,
}
player.stoneUpgrades.push(stoneUpgrade0);

var stoneUpgrade1 = {
    cost: 100,
    baseCost: 100,
    bought: 0,
    mult: 1,
    costIncrease: '(100 ** su.bought) * 100',
    costIncreaseExp: 100,
    displayed: false,
}
player.stoneUpgrades.push(stoneUpgrade1);

function buyStoneUpgrade(i) {
    let su = player.stoneUpgrades[i];
    if (player.stone >= su.cost) {
        player.stone -= su.cost;
        su.bought += 1;
        //su.cost = eval(su.costIncrease);
        su.cost = (su.costIncreaseExp ** su.bought) * su.baseCost;

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

function buyMaxStoneUpgrade(i) {
    let su = player.stoneUpgrades[i];

    let b = su.baseCost;
    let r = su.costIncreaseExp;
    let k = su.bought;
    let c = player.stone;

    console.log('buyMax() Values: '+ i + ',' + b + ',' + r + ',' + k + ',' + c);
    let result = Math.floor(Math.log10(((c * (r - 1)) / (b * (r ** k))) + 1) / Math.log10(r));
    console.log('Result:' + result);
    console.log('Unfloored Result: ' + Math.log10(((c * (r - 1)) / (b * (r ** k))) + 1) / Math.log10(r));

    if (result >= 1) {
        console.log("boughtMax");
        for (let u = 1; u < result; u++) {
            let sub = su.bought + u;
            player.stone -= (su.costIncreaseExp ** sub) * su.baseCost;
        }
        player.stone -= su.cost;
        su.bought += result;
        su.cost = (su.costIncreaseExp ** su.bought) * su.baseCost;

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

function buyMaxAllStoneUpgrades() {
    for(i = 0; i < 2; i++) {
        buyMaxStoneUpgrade(i);
    }
}

/*function buyMax(p1,p2,p3,p4) {
    console.log(p1 + ',' + p2 + ',' + p4);
    if (p1 >= p2) {
        p3(p4);
        p1 -= p2;
        console.log(p1 + ',' + p2 + ',' + p4 + '-2');
        if (p1 >= p2) {
            buyMax(p1,p2,p3,p4);
        }
    }
}*/

//onclick="player.stoneGenerators[0].bought += buyMax(10, 10, player.stoneGenerators[0].bought, player.stone, buyStoneGenerator, 0, 'player.stoneGenerators[0].bought')" id="buyMaxStoneGenerator0" class="menuBtnTn">

/*function buyMax(p1,p2,p3,p4,p5,p6,p7) {
    //Math.floor(Math.log10(((c * (r - 1)) / (b * (r ** k))) + 1) / Math.log10(r));
    if (p4 >= (p2 ** p3) * p1) {
        console.log(p1 + "," + p2 + "," + p3 + "," + p4);
        return (Math.floor(Math.log10(((p4 * (p2 - 1)) / (p1 * (p2 ** p3))) + 1) / Math.log10(p2)));
        console.log(p7);
        console.log("can afford");
        if (p6 !== "undefined") {
            console.log("function passed");
            //p5(p6);
        }
        else {
            //p5();
        }
    }
    console.log(p1 + "," + p2 + "," + p3 + "," + p4);

}*/

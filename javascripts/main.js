function gainStone(p1) {
    if (player.particles >= player.stoneCost * p1) {
        player.particles -= player.stoneCost * p1;
        player.stone += p1;
    }
    else {
        player.particles = 0;
    }
}

for(let i = 0; i < 10; i++) {
let stoneGenerator = {
        cost: Math.pow(Math.pow(10, i), i + 1) * 10,
        bought: 0,
        amount: 0,
        mult: 1,
}
player.stoneGenerators.push(stoneGenerator);

}

function buyStoneGenerator(i) {
    let sg = player.stoneGenerators[i];
    if (player.stone >= sg.cost) {
        player.stone -= sg.cost;
        sg.amount += 1;
        sg.bought += 1;
        sg.mult = 2 ** (sg.bought - 1);
        sg.cost = Math.pow(Math.pow(10, i), i + 1) * (10 ** sg.bought) * 10;
    }
}

var saveGame = [];

var player = {   
    particles: 1e4,
    particlesLostPerSec: 0,
    particlesStartingPos: 1e4,
    
    stone: 0,
    stoneCost: 10,
    stoneGain: 1,
    startingStone: 0,
    stonePerSec: 0,
    highestStone: 0,
    totalStone: 0,

    serenities: 0,
    totalSerenities: 0,
    totalSerenitiesMult: 1,
    highestSerenities: 0,
    highestSerenitiesMult: 1,
    serenityDebuff: 2,

    serenityUnlocked: false,
    serenityPending: false,

    serenityMilestones: [],
    
    stoneGenerators: [],
    stoneGeneratorExp: 2,
    stoneGeneratorsDetailed: false,

    stoneUpgrades: [],

    currentTab: 'main',
    currentSubTab: ['main', 'Materials'],
    
    theme: 0,
    themeName: ['Default','Magma','Grayscale','Leaf','Baja','Violet','Sunset'],
    
    //Example Notation: themeName: ['','','','','','','','','',''],
    
    themeDefault: ['#070d12','#152737','#23415c','#315a81','#3f74a6','#598ec0','#7ea7ce','#a3c0dc','#c8d9ea','#edf2f8'],
    //themeBaja: ['','','','','','','','','',''],
    themeBaja: ['#001a14','#004d3d','#008066','#00b38f','#00e6b8','#1affd1','#4dffdc','#80ffe6','#b3fff0','#e5fffa'],
    themeGrayscale: ['#0d0d0d','#262626','#404040','#595959','#737373','#8c8c8c','#a6a6a6','#bfbfbf','#d9d9d9','#f2f2f2'],
    themeMagma: ['#1a0001','#4d0002','#800003','#b30005','#e60006','#ff1a1f','#ff4d51','#ff8083','#ffb3b4','#ffe5e6'],
    themeLeaf: ['#051a00','#0e4d00','#188000','#22b300','#2be600','#45ff1a','#6eff4d','#98ff80','#c1ffb3','#eaffe5'],
    themeViolet: ['#10001a','#31004d','#520080','#7300b3','#9300e6','#ad1aff','#bf4dff','#d180ff','#e4b3ff','#f6e5ff'],
    themeSunset: ['#1a0f00','#4d2c00','#804900','#b36600','#e68300','#ff9d1a','#ffb34d','#ffc980','#ffdeb3','#fff4e5'],

    autoSave: false,
};

/*var defaultPlayer = {
    currentTab: 'main',
    currentSubTab: ['main', 'Materials'],
    
    theme: 0,
    themeName: ['Default','Magma','Grayscale','Leaf','Baja','Violet','Sunset'],
    
    themeDefault: ['#070d12','#152737','#23415c','#315a81','#3f74a6','#598ec0','#7ea7ce','#a3c0dc','#c8d9ea','#edf2f8'],
    themeBaja: ['#001a14','#004d3d','#008066','#00b38f','#00e6b8','#1affd1','#4dffdc','#80ffe6','#b3fff0','#e5fffa'],
    themeGrayscale: ['#0d0d0d','#262626','#404040','#595959','#737373','#8c8c8c','#a6a6a6','#bfbfbf','#d9d9d9','#f2f2f2'],
    themeMagma: ['#1a0001','#4d0002','#800003','#b30005','#e60006','#ff1a1f','#ff4d51','#ff8083','#ffb3b4','#ffe5e6'],
    themeLeaf: ['#051a00','#0e4d00','#188000','#22b300','#2be600','#45ff1a','#6eff4d','#98ff80','#c1ffb3','#eaffe5'],
    themeViolet: ['#10001a','#31004d','#520080','#7300b3','#9300e6','#ad1aff','#bf4dff','#d180ff','#e4b3ff','#f6e5ff'],
    themeSunset: ['#1a0f00','#4d2c00','#804900','#b36600','#e68300','#ff9d1a','#ffb34d','#ffc980','#ffdeb3','#fff4e5'],

    autoSave: true,
}*/

function save() {
    localStorage.setItem("player",JSON.stringify(player));
    console.log('save');
}

window.onload = function() {
    if (localStorage.getItem("player") === null) {
        switchTab('main');
        switchSubTab('main', 'Materials');
        themeChange(0,'themeDefault');
        console.log('autoDefault1');
    }
    loadData();
}

function loadData() {
    saveGame = JSON.parse(localStorage.getItem("player"));
    console.log(saveGame.particles);
    if (typeof saveGame.particles !== "undefined") player.particles = saveGame.particles;
    if (typeof saveGame.particlesStartingPos !== "undefined") player.particlesStartingPos = saveGame.particlesStartingPos;

    if (typeof saveGame.stone !== "undefined") player.stone = saveGame.stone;
    if (typeof saveGame.startingStone !== "undefined") player.startingStone = saveGame.startingStone;
    if (typeof saveGame.highestStone !== "undefined") player.highestStone = saveGame.highestStone;
    if (typeof saveGame.totalStone !== "undefined") player.totalStone = saveGame.totalStone;

    if (typeof saveGame.stoneGenerators !== "undefined") player.stoneGenerators = saveGame.stoneGenerators;
    if (typeof saveGame.stoneGeneratorExp !== "undefined") player.stoneGeneratorExp = saveGame.stoneGeneratorExp;
    if (typeof saveGame.stoneGeneratorsDetailed !== "undefined") player.stoneGeneratorsDetailed = saveGame.stoneGeneratorsDetailed;

    if (typeof saveGame.stoneUpgrades !== "undefined") player.stoneUpgrades = saveGame.stoneUpgrades;

    if (typeof saveGame.serenities !== "undefined") player.serenities = saveGame.serenities;
    if (typeof saveGame.totalSerenities !== "undefined") player.totalSerenities = saveGame.totalSerenities;
    if (typeof saveGame.totalSerenitiesMult !== "undefined") player.totalSerenitiesMult = saveGame.totalSerenitiesMult;
    if (typeof saveGame.highestSerenities !== "undefined") player.highestSerenities = saveGame.highestSerenities;
    if (typeof saveGame.highestSerenitiesMult !== "undefined") player.highestSerenitiesMult = saveGame.highestSerenitiesMult;
    if (typeof saveGame.serenityUnlocked !== "undefined") player.serenityUnlocked = saveGame.serenityUnlocked;
    if (typeof saveGame.serenityPending !== "undefined") player.serenityPending = saveGame.serenityPending;
    if (typeof saveGame.serenityMilestones !== "undefined") player.serenityMilestones = saveGame.serenityMilestones;

    if (localStorage.getItem("player") !== null) {
    if (typeof saveGame.currentTab !== "undefined") player.currentTab = saveGame.currentTab;
    if (typeof saveGame.currentSubTab !== "undefined") player.currentSubTab = saveGame.currentSubTab;
    if (typeof saveGame.theme !== "undefined") player.theme = saveGame.theme;
    if (typeof saveGame.autoSave !== "undefined") player.autoSave = saveGame.autoSave;
    switchTab(player.currentTab);
    console.log('properTheme1');
    switchSubTab(player.currentSubTab);
    themeChange();
    }
    console.log('loadData');

    //safeLoadData('stone','player');
    gainStone(0);
}

function safeLoadData(p1,p2) {
    let i1 = p2 + '.' + p1;
    let i2 = 'saveGame.' + p2;
    
    console.log(p1);
    console.log(p2);
    console.log(player.p1);
    console.log(i1);
    console.log(i2);
    if (p2 !== 'undefined') {
        if (typeof i2 !== "undefined") i1 = i2;
    }
    else if (p2 === 'undefined') {
        if (typeof i2 !== "undefined") player.p1 = i2;
    }
}

function resetSave() {
    var resetSaveAnswer = prompt("To Reset Your Save, Please Type 'Yes'. Otherwise, hit cancel.");
    if (resetSaveAnswer === "Yes") {
        
        player.particles = 1e4;
        player.particlesStartingPos = 1e4,

        player.stone = 0;
        player.startingStone = 0;
        player.highestStone = 0;
        player.totalStone = 0;
        player.stoneGain = 1;

        player.autoSave = false;

        player.serenities = 0;
        player.totalSerenities = 0;
        player.totalSerenitiesMult = 1;
        player.highestSerenities = 0;
        player.highestSerenitiesMult = 1;
        player.serenityUnlocked = false;
        player.serenityPending = false;
        
        for(let i = 0; i < 10; i++) {
            player.stoneGenerators[i].cost = Math.pow(Math.pow(10, i), i + 1) * 10;
            player.stoneGenerators[i].bought = 0;
            player.stoneGenerators[i].amount = 0;
            player.stoneGenerators[i].mult = 1;
            player.stoneGenerators[i].displayed = false;
        }
        player.stoneGeneratorExp = 2;
        player.stoneGeneratorsDetailed = false;



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

        player.serenityMilestones[0].cost = 3;
        player.serenityMilestones[0].bought = false;
        player.serenityMilestones[0].displayed = true;

        player.serenityMilestones[1].cost = 10;
        player.serenityMilestones[1].bought = false;
        player.serenityMilestones[1].displayed = true;
    }
}

function toggleAutoSave() {
    console.log(player.autoSave);
    if (player.autoSave === true) {
        player.autoSave = false;
        save();
    }
    else if (player.autoSave === false) {
        player.autoSave = true;
    }
}

function inviteToDiscord() {
    //window.location.href = 'https://discord.gg/CQqcvWS2Kn';
    document.getElementById("hiddenDiscordLink").click();
}

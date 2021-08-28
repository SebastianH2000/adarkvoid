var saveGame = [];

var player = {   
    timer: 0,
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

    serenityMilestones: [serenityMilestone0,serenityMilestone1,serenityMilestone2,serenityMilestone3,serenityMilestone4],
    serenityUpgrades: [serenityUpgrade0],
    
    stoneGenerators: [],
    stoneGeneratorExp: 2,
    stoneGeneratorsDetailed: false,
    stoneGeneratorsAutobuyer: false,

    stoneUpgrades: [],
    stoneUpgradesAutobuyer: false,

    serenityAutobuyer: false,

    switchedToWinTab: false,

    currentTab: 'main',
    currentSubTab: ['main', 'Materials'],
    mainSubTab: 'Materials',
    serenitySubTab: 'Materials',
    optionsSubTab: 'Settings',
    winnerSubTab: 'Win',

    winnerDisplay: false,
    
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

    autoSave: true,
    autoTabFinder: true,
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
    localStorage.setItem("the-dark-void-saved",JSON.stringify(player));
}

window.onload = function() {
    if (localStorage.getItem('the-dark-void-saved')) {
        let tempData = localStorage.getItem('the-dark-void-saved');
        // check if it is the correct game save key so you don't accidentally remove another games save if they have the same key.
        let parsedData = JSON.parse(tempData);
        if (parsedData.serenities) { // doesnt have to be particles but something unique to your player object
          localStorage.setItem("player", tempData);
          localStorage.removeItem('the-dark-void-saved');
        }
    }
    else if (localStorage.getItem("player") === null) {
        switchTab('main');
        switchSubTab('main', 'Materials');
        themeChange(0,'themeDefault');
        //console.log('autoDefault1');
        localStorage.setItem("player",JSON.stringify(player));
    }
    // in the function called on startup or whatever
    loadData();
}

function loadData() {
    saveGame = JSON.parse(localStorage.getItem("player"));
    //console.log(saveGame.particles);
    if (typeof saveGame.timer !== "undefined") player.timer = saveGame.timer;
    if (typeof saveGame.switchedToWinTab !== "undefined") player.switchedToWinTab = saveGame.switchedToWinTab;

    if (typeof saveGame.particles !== "undefined") player.particles = saveGame.particles;
    if (typeof saveGame.particlesStartingPos !== "undefined") player.particlesStartingPos = saveGame.particlesStartingPos;

    if (typeof saveGame.stone !== "undefined") player.stone = saveGame.stone;
    if (typeof saveGame.startingStone !== "undefined") player.startingStone = saveGame.startingStone;
    if (typeof saveGame.highestStone !== "undefined") player.highestStone = saveGame.highestStone;
    if (typeof saveGame.totalStone !== "undefined") player.totalStone = saveGame.totalStone;

    if (typeof saveGame.stoneGenerators !== "undefined") player.stoneGenerators = saveGame.stoneGenerators;
    if (typeof saveGame.stoneGeneratorExp !== "undefined") player.stoneGeneratorExp = saveGame.stoneGeneratorExp;
    if (typeof saveGame.stoneGeneratorsDetailed !== "undefined") player.stoneGeneratorsDetailed = saveGame.stoneGeneratorsDetailed;
    if (typeof saveGame.stoneGeneratorsAutobuyer !== "undefined") player.stoneGeneratorsAutobuyer = saveGame.stoneGeneratorsAutobuyer;


    if (typeof saveGame.stoneUpgrades !== "undefined") player.stoneUpgrades = saveGame.stoneUpgrades;
    if (typeof saveGame.stoneUpgradesAutobuyer !== "undefined") player.stoneUpgradesAutobuyer = saveGame.stoneUpgradesAutobuyer;

    if (typeof saveGame.serenities !== "undefined") player.serenities = saveGame.serenities;
    if (typeof saveGame.totalSerenities !== "undefined") player.totalSerenities = saveGame.totalSerenities;
    if (typeof saveGame.totalSerenitiesMult !== "undefined") player.totalSerenitiesMult = saveGame.totalSerenitiesMult;
    if (typeof saveGame.highestSerenities !== "undefined") player.highestSerenities = saveGame.highestSerenities;
    if (typeof saveGame.highestSerenitiesMult !== "undefined") player.highestSerenitiesMult = saveGame.highestSerenitiesMult;
    if (typeof saveGame.serenityUnlocked !== "undefined") player.serenityUnlocked = saveGame.serenityUnlocked;
    if (typeof saveGame.serenityPending !== "undefined") player.serenityPending = saveGame.serenityPending;
    if (typeof saveGame.serenityMilestones !== "undefined") player.serenityMilestones = saveGame.serenityMilestones;
    if (typeof saveGame.serenityUpgrades !== "undefined") player.serenityUpgrades = saveGame.serenityUpgrades;
    if (typeof saveGame.serenityAutobuyer !== "undefined") player.serenityAutobuyer = saveGame.serenityAutobuyer;

    if (typeof saveGame.autoTabFinder !== "undefined") player.autoTabFinder = saveGame.autoTabFinder;
    if (typeof saveGame.mainSubTab !== "undefined") player.mainSubTab = saveGame.mainSubTab;
    if (typeof saveGame.serenitySubTab !== "undefined") player.serenitySubTab = saveGame.serenitySubTab;
    if (typeof saveGame.optionsSubTab !== "undefined") player.optionsSubTab = saveGame.optionsSubTab;
    if (typeof saveGame.winnerSubTab !== "undefined") player.winnerSubTab = saveGame.winnerSubTab;

    if (typeof saveGame.winnerDisplay !== "undefined") player.winnerDisplay = saveGame.winnerDisplay;

    if (player.serenityMilestones.length > 5) {
    for(let u = player.serenityMilestones.length; u > 5; u--) {
        player.serenityMilestones.shift();
    }
    player.serenityMilestones[0] = serenityMilestone0;
    player.serenityMilestones[1] = serenityMilestone1;
    player.serenityMilestones[2] = serenityMilestone2;
    player.serenityMilestones[3] = serenityMilestone3;
    player.serenityMilestones[4] = serenityMilestone4;
    }
    player.serenityMilestones[0] = serenityMilestone0;
    player.serenityMilestones[1] = serenityMilestone1;
    player.serenityMilestones[2] = serenityMilestone2;
    player.serenityMilestones[3] = serenityMilestone3;
    player.serenityMilestones[4] = serenityMilestone4;

    /*if (player.serenityMilestones.length > 4) {
        let i = player.serenityMilestones.length - 4;
        for(u = i; u < i + 4; u++) {
            delete player.serenityMilestones[u];
        }
    }*/

    if (localStorage.getItem("player") !== null) {
    if (typeof saveGame.currentTab !== "undefined") player.currentTab = saveGame.currentTab;
    if (typeof saveGame.currentSubTab !== "undefined") player.currentSubTab = saveGame.currentSubTab;
    if (typeof saveGame.theme !== "undefined") player.theme = saveGame.theme;
    if (typeof saveGame.autoSave !== "undefined") player.autoSave = saveGame.autoSave;
    if (player.serenityPending === true) {
        switchTab('main','force');
        switchSubTab('main','Materials','force');
        themeChange();
    }
    else if (player.serenityPending !== true) {
        switchTab(player.currentTab);
        //console.log('properTheme1');
        if (player.autoTabFinder === false) {
            switchSubTab(player.currentSubTab);
        }
        themeChange();
    }
    }
    //stoneGeneratorDetailedMode
    if (player.stoneGeneratorsDetailed === true) {
        document.getElementById("detailedStoneGeneratorsToggle").textContent = "Stone Generator Detailed Mode: On";
    }
    else {
        document.getElementById("detailedStoneGeneratorsToggle").textContent = "Stone Generator Detailed Mode: Off";
    }
    //stoneGeneratorAutobuyer
    if (player.stoneGeneratorsAutobuyer === true) {
        document.getElementById("toggleStoneGeneratorAutobuyerBtn").textContent = "Stone Generator Autobuyer: On";
    }
    else {
        document.getElementById("toggleStoneGeneratorAutobuyerBtn").textContent = "Stone Generator Autobuyer: Off";
    }
    //stoneUpgradeAutobuyer
    if (player.stoneUpgradesAutobuyer === true) {
        document.getElementById("toggleStoneUpgradeAutobuyerBtn").textContent = "Stone Upgrade Autobuyer: On";
    }
    else {
        document.getElementById("toggleStoneUpgradeAutobuyerBtn").textContent = "Stone Upgrade Autobuyer: Off";
    }
    //autoTabFinder
    if (player.autoTabFinder === true) {
        document.getElementById("tabFinderBtn").textContent = "Automatic SubTabs: On";
    }
    else {
        document.getElementById("tabFinderBtn").textContent = "Automatic SubTabs: Off";
    }
    //serenityAutobuyer
    if (player.serenityAutobuyer === true) {
        document.getElementById("toggleSerenityAutobuyerBtn").textContent = "Serenity Autobuyer: On";
    }
    else {
        document.getElementById("toggleSerenityAutobuyerBtn").textContent = "Serenity Autobuyer: Off";
    }

    //console.log('loadData');

    //safeLoadData('stone','player');
    gainStone(0);

    //Temp
    document.getElementById("transcriptsTab").style.display = "none";
    document.getElementById("optionsStatsSubTab").style.display = "none";
    //document.getElementById("serenityUpgradesSubTab").style.display = "none";
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
        player.switchedToWinTab = false;
        player.timer = 0;
        player.winnerDisplay = false;
        
        player.particles = 1e4;
        player.particlesStartingPos = 1e4,

        player.stone = 0;
        player.startingStone = 0;
        player.highestStone = 0;
        player.totalStone = 0;
        player.stoneGain = 1;

        player.autoSave = true;
        player.serenityAutobuyer = false;
        player.stoneGeneratorsAutobuyer = false;
        player.stoneUpgradesAutobuyer = false;
        player.autoTabFinder = true;

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

        player.stoneUpgrades[1].cost = 1e6;
        player.stoneUpgrades[1].baseCost = 1e6;
        player.stoneUpgrades[1].bought = 0;
        player.stoneUpgrades[1].mult = 1;
        player.stoneUpgrades[1].costIncrease = '(1e6 ** su.bought) * 1e6';
        player.stoneUpgrades[1].costIncreaseExp = 1e6;
        player.stoneUpgrades[1].displayed = false;

        let sm = player.serenityMilestones;

        sm[0].cost = 3;
        sm[0].bought = false;
        sm[0].displayed = true;

        sm[1].cost = 5;
        sm[1].bought = false;
        sm[1].displayed = true;

        sm[2].cost = 10;
        sm[2].bought = false;
        sm[2].displayed = true;

        sm[3].cost = 15;
        sm[3].bought = false;
        sm[3].displayed = true;

        sm[4].cost = 25;
        sm[4].bought = false;
        sm[4].displayed = true;

        player.serenityUpgrades[0].cost = 50;
        player.serenityUpgrades[0].bought = false;
        player.serenityUpgrades[0].displayed = true;

        //Temp
        document.getElementById("transcriptsTab").style.display = "none";
        document.getElementById("optionsStatsSubTab").style.display = "none";
        //document.getElementById("serenityUpgradesSubTab").style.display = "none";
    }
}

function toggleAutoSave() {
    if (player.autoSave === true) {
        player.autoSave = false;
        save();
    }
    else {
        player.autoSave = true;
    }
}

function toggleTabFinder() {
    if (player.autoTabFinder === true) {
        player.autoTabFinder = false;
        document.getElementById("tabFinderBtn").textContent = "Automatic SubTabs: Off";
    }
    else {
        player.autoTabFinder = true;
        document.getElementById("tabFinderBtn").textContent = "Automatic SubTabs: On";
    }
}

function inviteToDiscord() {
    document.getElementById("hiddenDiscordLink").click();
}

function inviteToGithub() {
    document.getElementById("hiddenGithubLink").click();
}

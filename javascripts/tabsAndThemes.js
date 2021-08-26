function switchTab(p1) {
  if (player.serenityPending !== true) {
    document.getElementById("mainSubTabContainer").style.display = "none";
    document.getElementById("optionsSubTabContainer").style.display = "none";
    document.getElementById("logSubTabContainer").style.display = "none";
    document.getElementById("serenitySubTabContainer").style.display = "none";

    document.getElementById("mainTab").style.backgroundColor = "var(--primary-3)";
    document.getElementById("optionsTab").style.backgroundColor = "var(--primary-3)";
    document.getElementById("logTab").style.backgroundColor = "var(--primary-3)";
    document.getElementById("serenityTab").style.backgroundColor = "var(--primary-3)";

    document.getElementById(p1 + "SubTabContainer").style.display = "flex";
    document.getElementById(p1 + "Tab").style.backgroundColor = "var(--primary-4)";
    player.currentTab = p1;
  }
}
  
function switchSubTab(p1,p2) {
  if (player.serenityPending !== true) {
    document.getElementById("mainMaterialsContainer").style.display = "none";
    document.getElementById("mainUpgradesContainer").style.display = "none";
    document.getElementById("optionsSettingsContainer").style.display = "none";
    document.getElementById("optionsCreditsContainer").style.display = "none";
    document.getElementById("optionsStatsContainer").style.display = "none";
    document.getElementById("serenityMaterialsContainer").style.display = "none";
    document.getElementById("serenityMilestonesContainer").style.display = "none";

    document.getElementById("mainMaterialsSubTab").style.backgroundColor = "var(--primary-3)";
    document.getElementById("mainUpgradesSubTab").style.backgroundColor = "var(--primary-3)";
    document.getElementById("optionsSettingsSubTab").style.backgroundColor = "var(--primary-3)";
    document.getElementById("optionsCreditsSubTab").style.backgroundColor = "var(--primary-3)";
    document.getElementById("optionsStatsSubTab").style.backgroundColor = "var(--primary-3)";
    document.getElementById("serenityMaterialsSubTab").style.backgroundColor = "var(--primary-3)";
    document.getElementById("serenityMilestonesSubTab").style.backgroundColor = "var(--primary-3)";

    if (typeof p1 === "object") {
      let one = p1[0];
      let two = p1[1];
      document.getElementById(one + two + "Container").style.display = "flex";
      document.getElementById(one + two + "SubTab").style.backgroundColor = "var(--primary-4)";
      player.currentSubTab[0] = one;
      player.currentSubTab[1] = two;
      console.log(player.currentSubTab[0] + player.currentSubTab[1] + "array");
    }
    else if (p2 !== "undefined") {
      document.getElementById(p1 + p2 + "Container").style.display = "flex";
      document.getElementById(p1 + p2 + "SubTab").style.backgroundColor = "var(--primary-4)";
      player.currentSubTab[0] = p1;
      player.currentSubTab[1] = p2;
      console.log(p1 + p2 + "string");
    }
  }

    
}
  
function themeChange(p1,p2) {
    if (p1 == 1) {
      if (player.theme >= player.themeName.length - 1) {
        player.theme = 0;
      }
      else {
        player.theme ++;
      }
    }
    
    document.getElementById("themeBtn").innerHTML = 'Default Theme: ' + player.themeName[player.theme];
    for(let i = 0; i < 10; i++) {
  
      if (p2 !== undefined) {
        document.documentElement.style.setProperty('--primary-' + i, player[p2][i]);
        document.getElementById("themeExample" + i).style.backgroundColor = 'var(--primary-' + i + ')';
        if (i > 4) {
          document.getElementById("themeExample" + i).style.color = 'var(--primary-0)';
        }
      }
      else {
        document.documentElement.style.setProperty('--primary-' + i, player['theme' + player.themeName[player.theme]][i]);
        document.getElementById("themeExample" + i).style.backgroundColor = 'var(--primary-' + i + ')';
        if (i > 4) {
          document.getElementById("themeExample" + i).style.color = 'var(--primary-0)';
        }
      }
      //document.documentElement.style.setProperty('--primary-3', '#48AA48');
    }
}

function keyM(e) {
  if(e.keyCode === 77){
     //console.log('M');
     //console.log(player.currentSubTab);
     if ((player.currentSubTab[0] === 'main') && (player.currentSubTab[1] === 'Materials')) {
         buyMaxAllStoneGenerators();
         //console.log('mainMaterialsM');
     }
     if ((player.currentSubTab[0] === 'main') && (player.currentSubTab[1] === 'Upgrades')) {
         buyMaxAllStoneUpgrades();
         //console.log('mainUpgradesM');
     }
  };
}
document.onkeydown = keyM;
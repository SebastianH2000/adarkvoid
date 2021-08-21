function switchTab(p1) {
    document.getElementById("mainSubTabContainer").style.display = "none";
    document.getElementById("optionsSubTabContainer").style.display = "none";
    document.getElementById(p1 + "SubTabContainer").style.display = "flex";
    player.currentTab = p1;
}
  
function switchSubTab(p1,p2) {
    document.getElementById("mainMaterialsContainer").style.display = "none";
    document.getElementById("mainUpgradesContainer").style.display = "none";
    document.getElementById("optionsSettingsContainer").style.display = "none";
    document.getElementById("optionsCreditsContainer").style.display = "none";
    document.getElementById("optionsStatsContainer").style.display = "none";
    document.getElementById(p1 + p2 + "Container").style.display = "flex";
    player.currentSubTab[0] = p1;
    player.currentSubTab[1] = p2;
    console.log(player.currentSubTab[0] + player.currentSubTab[1]);
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
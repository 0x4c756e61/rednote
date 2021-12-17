/**
 * @param aNom (description)
 * @param aCallback (description)
 */
function InterfaceParametres (aNom, aGenre) {
  this.nom = aNom;
  this.genre = aGenre;
  this.notificationHasPermission = true;
}

(function () {
/**
     * Construction de l'interface
     *
     * @returns {String} HTML généré
     */
InterfaceParametres.prototype.construire = function () {
  GApplication.log(GApplication.niveauxLog.TRACE, 'construire()');
  var H = [];
  H.push('<div style="padding:0 10px;"><h4 class="firstLand" tabIndex="0">', GTraductions.getValeur('MenuParametres'), '</h4></div>');

  H.push('<div style="padding:0px 10px; width: 100%;">');
  H.push('<ul role="list" class="collection">');
  H.push('<li role="listitem" class="collection-item with-action">');
  H.push('<div style="width: 100%;" class="switch"><label class="title" style="display: block; width: 100%;">',
            GTraductions.getValeur('activerPush'),
            '<input class="IFC_Parametre_AvecNotification" type="checkbox" ', (GApplication.configUtil && GApplication.configUtil.avecNotification ? 'checked' : ''), ' onchange="', this.nom, '.changeNotif(this.checked);"/>',
            '<span style="position:absolute; right:5px;" class="lever"></span>',
            '</label></div>');
  H.push('</li>');
  H.push('<li role="listitem" class="collection-item with-action">');
  H.push('<div style="width: 100%;" class="switch"><label class="title" style="display: block; width: 100%;">',
            GTraductions.getValeur('activerAnalyticsCollection'),
            '<input class="IFC_Parametre_AvecACE" type="checkbox" ', (GApplication.configUtil && GApplication.configUtil.avecAnalytics ? 'checked' : ''), ' onchange="', this.nom, '.changeACE(this.checked);"/>',
            '<span style="position:absolute; right:5px;" class="lever"></span>',
            '</label></div>');
  H.push('</li>');
  H.push('<li role="listitem" class="collection-item with-action">');
  H.push('<div style="width: 100%;" class="switch"><label class="title" style="display: block; width: 100%;">',
            GTraductions.getValeur('activerCrashlyticsCollection'),
            '<input class="IFC_Parametre_AvecACE" type="checkbox" ', (GApplication.configUtil && GApplication.configUtil.avecCrashlytics ? 'checked' : ''), ' onchange="', this.nom, '.changeCrash(this.checked);"/>',
            '<span style="position:absolute; right:5px;" class="lever"></span>',
            '</label></div>');
  H.push('</li>');
// Theme selector
  H.push('<li role="listitem" class="collection-item with-action">');
  H.push('<div style="width: 100%;"><label class="title" style="display: block; width: 100%;">',
            'Theme name:',
            `<input class="IFC_Parametre_AvecACE" type="text" onchange="${this.nom}.testFunc(this.value);"/>`,
            '<span style="position:absolute; right:5px;" class="lever"></span>',
            '</label></div>');
  H.push('</li>');
// Custom CSS input
  H.push('<li role="listitem" class="collection-item with-action">');
  H.push('<div style="width: 100%;"><label class="title" style="display: block; width: 100%;">',
            'Custom CSS: <br>',
            `<textarea id="cssarea" placeholder="Enter some CSS style"></textarea>`,
            `<button id="cssset" onclick="${this.nom}.ee();">SET CSS</button>`,
            '<span style="position:absolute; right:5px;" class="lever"></span>',
            '</label></div>');
  H.push('</li>');

  if (GApplication.configUtil && GApplication.configUtil.subscriptions) {
    for (var key in GApplication.configUtil.subscriptions) {

      H.push('<li role="listitem" class="collection-item with-action">');
      H.push('<div style="width: 100%;" class="switch"><label class="title" style="display: block; width: 100%;">',
                    GTraductions.getValeur('subscribe'), ' "', key, '"',
                    '<input class="IFC_Parametre_AvecSubscribe" name="', key, '" type="checkbox" ', (GApplication.configUtil.subscriptions[key] ? 'checked' : ''), ' onchange="', this.nom, '.changeSubscription(this.checked, this.name);"/>',
                    '<span style="position:absolute; right:5px;" class="lever"></span>',
                    '</label></div>');
      H.push('</li>');
    }
  }
  H.push('</ul>');
  H.push('<p>', GTraductions.getValeur('reloadPourParametres'), '</p>');
  H.push('</div>');
  return H.join('');
};

InterfaceParametres.prototype.changeNotif = function (aValue) {
  GApplication.log(GApplication.niveauxLog.TRACE, 'changeNotif()');
  GApplication.configUtil.avecNotification = aValue;
  GApplication.configUtil.avecRemoteConfig = aValue;
  GApplication.ecrireConfigUtil();
  if (GApplication.configUtil.avecNotification || GApplication.configUtil.avecRemoteConfig) {
    GApplication.log(GApplication.niveauxLog.TRACE, 'InterfaceParametres.js - Register');
    GApplication.firebaseConfig();
  } else {
    GApplication.log(GApplication.niveauxLog.TRACE, 'InterfaceParametres.js - Unregister');
    window.FCMHMSPlugin.unregister();
  }
};

InterfaceParametres.prototype.changeACE = function (aValue) {
  GApplication.log(GApplication.niveauxLog.TRACE, 'changeACE()');
  GApplication.configUtil.avecAnalytics = aValue;
  GApplication.ecrireConfigUtil();
  if (GApplication.configUtil.avecAnalytics) {
    window.FCMHMSPlugin.initAnalytics();
  } else {
    window.FCMHMSPlugin.setAnalyticsCollectionEnabled(false);
  }
};

InterfaceParametres.prototype.changeCrash = function (aValue) {
  GApplication.log(GApplication.niveauxLog.TRACE, 'changeCrash()');
  GApplication.configUtil.avecCrashlytics = aValue;
  GApplication.configUtil.avecPerformance = aValue;
  GApplication.ecrireConfigUtil();
  if (GApplication.configUtil.avecCrashlytics || GApplication.configUtil.avecPerformance) {
    GApplication.firebaseConfig();
  } else {
    window.FCMHMSPlugin.setPerformanceCollectionEnabled(false);
  }
};

InterfaceParametres.prototype.ee = function () {
  let area = document.getElementById("cssarea");
  document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", `<style>${area.value}</style>`)
  alert("Style set !")

};

InterfaceParametres.prototype.testFunc = function (aValue) {
  // var loc = window.location.pathname;
  // var dir = loc.substring(0, loc.lastIndexOf('/'));
  // alert(dir)
  if (aValue === "pornote") {
    document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", `
    <style>
  html {

      background-color: #000000;
  }
  
  body *{
      /* text color */
      --text-color: #bc7100;
      color: var(--text-color);
  }
  
  .ThemeMobilePN {
    --theme-foncee: #FF9900;
    --theme-moyen1: #d07d00;
    --theme-claire: #bc7100;
}
  
  .sidenav.aside-nav-right {

      --nav-color: #232527;
      --nav-panel-color: #1a1b1d;
      background: linear-gradient(to right, var(--nav-color) 0, var(--nav-color) calc(100% - 70px), var(--nav-panel-color) calc(100% - 70px), var(--nav-panel-color) 100%);
  }
  
  .collection li.with-action {
      /* Buttons background */
      background-color: #000000;
  }
  
  #idPreloaderText {
      overflow:hidden;
      position:absolute;
      top:calc(50% + 64px + 5px);
      left:0;
      width:100%;
      text-align:center;
      color: var(--text-color);
  }
    </style>
    `);
    document.getElementById("logobruh").setAttribute("src", "images/mobile/logo-pn.png");
    document.getElementById("logo_pannel").setAttribute("src", "images/mobile/logo-pn.png");
  }

  else if (aValue === "default") {
    document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", `
  <style>
  html {
      /* Change the app background */
      background-color: #3c3e42;
  }
  
  body *{
      /* text color */
      --text-color: white;
      color: var(--text-color);
  }
  
  .ThemeMobilePN {
    --theme-foncee: #d0615d;
    --theme-moyen1: #e86c68;
    --theme-claire: #ff7472;
}
  
  .sidenav.aside-nav-right {
      /* Side nav bar coloration */
      --nav-color: #232527;        /*Righ pannel*/
      --nav-panel-color: #1a1b1d;  /*Left Pannel*/
      background: linear-gradient(to right, var(--nav-color) 0, var(--nav-color) calc(100% - 70px), var(--nav-panel-color) calc(100% - 70px), var(--nav-panel-color) 100%);
  }
  
  .collection li.with-action {
      /* Buttons background */
      background-color: #1b1c1e;
  }
  
  #idPreloaderText {
      overflow:hidden;
      position:absolute;
      top:calc(50% + 64px + 5px);
      left:0;
      width:100%;
      text-align:center;
      color: var(--text-color);
  }
  </style>
    `);
    document.getElementById("logobruh").setAttribute("src", "images/mobile/ldpi.png");
    document.getElementById("logo_pannel").setAttribute("src", "images/mobile/ldpi.png");
  }

  else if (aValue === "classic") {
    document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", `
  <style>
  html {
      /* Change the app background */
      background-color: #d9d9d9;
  }
  
  body *{
      /* text color */
      --text-color: grey;
      color: var(--text-color);
  }
  
  .ThemeMobilePN {
    --theme-foncee: #00643c;
    --theme-moyen1: #65b782;
    --theme-claire: #caefe1;
}
  
  .sidenav.aside-nav-right {
      background: linear-gradient(to right, #46484d 0, #46484d calc(100% - 70px), #d9d9d9 calc(100% - 70px), #d9d9d9 100%);
      color: #d9d9d9;
  }
  
  .collection li.with-action {
      /* Buttons background */
      background-color: #ffffff;
  }
  
  #idPreloaderText {
      overflow:hidden;
      position:absolute;
      top:calc(50% + 64px + 5px);
      left:0;
      width:100%;
      text-align:center;
      color: var(--text-color);
  }
  </style>
    `);
    document.getElementById("logobruh").setAttribute("src", "images/mobile/classic.png");
    document.getElementById("logo_pannel").setAttribute("src", "images/mobile/classic.png");
  }

  else {
    alert(`Unknow theme: ${aValue}`);
  }
};

InterfaceParametres.prototype.changeSubscription = function (aValue, aName) {
  GApplication.log(GApplication.niveauxLog.TRACE, 'changeSubscription()');
  GApplication.configUtil.subscriptions[aName] = aValue;
  GApplication.ecrireConfigUtil();
  if (GApplication.configUtil.subscriptions[aName]) {
    window.FCMHMSPlugin.subscribe(aName);
  } else {
    window.FCMHMSPlugin.unsubscribe(aName);
  }
};

InterfaceParametres.prototype.executer = function () {
  GApplication.log(GApplication.niveauxLog.TRACE, 'executer()');
  if (!GApplication.configUtil.init) {
    GApplication.configUtil.init = true;
    GApplication.ecrireConfigUtil();
  }
  window.FCMHMSPlugin.hasPermission(function (data) {
    this.notificationHasPermission = data.isEnabled;
    if (!this.notificationHasPermission) {
      $('.IFC_Parametre_AvecNotification').prop("disabled", true);
      $('.IFC_Parametre_AvecSubscribe').prop("disabled", true);
    }
  }.bind(this));
};

})();
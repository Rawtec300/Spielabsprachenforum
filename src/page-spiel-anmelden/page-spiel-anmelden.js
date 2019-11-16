"use strict";
class SpielAnmelden {
  constructor(app) {
    this._app = app;
  }

  async show(matches) {
    // Anzuzeigenden Seiteninhalt nachladen
    let html = await fetch("page-spiel-anmelden/page-spiel-anmelden.html");
    let css = await fetch("page-spiel-anmelden/page-spiel-anmelden.css");

    if (html.ok && css.ok) {
      html = await html.text();
      css = await css.text();
    } else {
      console.error("Fehler beim Laden des HTML/CSS-Inhalts");
      return;
    }

    // Seite zur Anzeige bringen
    let pageDom = document.createElement("div");
    pageDom.innerHTML = html;

    this._app.setPageTitle("Spiel Anmelden", {
      isSubPage: true
    });
    this._app.setPageCss(css);
    this._app.setPageHeader(pageDom.querySelector("header"));
    this._app.setPageContent(pageDom.querySelector("main"));
    let buttonAddDate = document.getElementById("frm1_submit");
    buttonAddDate.addEventListener("click", this.addDate.bind(this));

  }
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  addDate(Event) {
    let datenbank = this._app.database;

    var gameName = document.getElementById("gameNameFeld");
    var plattformName = document.getElementById("plattformNameFeld");
    var userName = document.getElementById("userNameFeld");
    var datum = document.getElementById("datumFeld");
    var urzeit = document.getElementById("timeFeld");

    datenbank.saveItems("dates", [{
      "id": this.uuidv4(),
      "plattform": plattformName.value,
      "game": gameName.value,
      "name": userName.value,
      "day": datum.value,
      "time": urzeit.value,
    }]);
    Event.preventDefault();
  }


}

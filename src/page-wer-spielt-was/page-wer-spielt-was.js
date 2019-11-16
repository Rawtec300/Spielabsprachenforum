"use strict";
class WerSpieltWas {
  constructor(app) {
    this._app = app;
  }

  async show(matches) {
    // Anzuzeigenden Seiteninhalt nachladen
    let html = await fetch("page-wer-spielt-was/page-wer-spielt-was.html");
    let css = await fetch("page-wer-spielt-was/page-wer-spielt-was.css");

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

    this._app.setPageTitle("Wer Spielt Was", {
      isSubPage: true
    });

    this._app.setPageCss(css);
    this._app.setPageHeader(pageDom.querySelector("header"));
    this._app.setPageContent(pageDom.querySelector("main"));
    let table = new Tabulator("#data-table", {
      layout: "fitColumns",
      columns:[
            // Datenspalten
            {title: "Spiel",      field: "game"},
            {title: "Plattform",   field: "plattform"},
            {title: "Benutzername", field: "name"},
            {title: "Datum", field: "day"},
            {title: "Uhrzeit",  field: "time"},
      ],
    });
    let database = this._app.database;
    let dates = await database.selectAllItems("dates");
    table.replaceData(dates);
  }
}

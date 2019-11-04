"use strict";
class SpielAnmelden {
    constructor(title, pages) {
        this._title = title;
        this._pages = pages;
        this._currentPageObject = null;

        this.database = new Database();
    }

    async show(matches) {
        // Anzuzeigenden Seiteninhalt nachladen
        let html = await fetch("page-start/page-spiel_anmelden.html");
        let css = await fetch("page-start/page-spiel_anmelden.css");

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

        this._app.setPageTitle("Spiel Anmelden", {isSubPage: true});
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));
    }
}

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

        this._app.setPageTitle("Spiel Anmelden", {isSubPage: true});
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));
    }
}

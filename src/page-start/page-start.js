/**
 * Startseite der App.
 */
class PageStart {
    /**
     * Konstruktor. Bekommt das zentralle App-Objekt übergeben.
     */
    constructor(app) {
        this._app = app;
    }

    /**
     * Inhalt der Seite anzeigen. Wird hierfür von der App-Klasse aufgerufen.
     */
    async show(matches) {
      await this._app.database.createGamesData();
      await this._app.database.createPlattformsData();
      await this._app.database.createDatesDemo();
        // Anzuzeigenden Seiteninhalt nachladen
        let html = await fetch("page-start/page-start.html");
        let css = await fetch("page-start/page-start.css");

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

        this._app.setPageTitle("Startseite", {isSubPage: true});
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));
    }

    //_onButtonClicked() {
    //    // ...
    //}
}

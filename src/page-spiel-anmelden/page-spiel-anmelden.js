"use strict";
class SpielAnmelden {
    constructor(title, pages) {
        this._title = title;
        this._pages = pages;
        this._currentPageObject = null;

        this.database = new Database();
    }

    _handleRouting(){
        let pageUrl = location.hash.slice(1);
        
        pageUrl = "/Spiel_anmelden";


        let matches = null;
        let page = this._pages.find(p => matches = pageUrl.match(p.url));

        if (!page) {
            console.error(`Keine Seite zur URL ${pageUrl} gefunden!`);
            return;
        }

        this._currentPageObject = new page.klass(this);
        this._currentPageObject.show(matches);
    }
}

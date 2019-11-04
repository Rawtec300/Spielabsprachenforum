"use strict";

/**
 * Klasse Database: Kümmert sich um die Datenhaltung der App
 *
 * Diese Klasse beinhaltet alle Datensätze der App. Entgegen dem Namen handelt
 * es sich nicht wirklich um eine Datenbank, da sie lediglich ein paar statische
 * Testdaten enthält. Ausgefeilte Methoden zum Durchsuchen, Ändern oder Löschen
 * der Daten fehlen komplett, könnten aber in einer echten Anwendung relativ
 * einfach hinzugefügt werden.
 */
class Database {
  /**
   * Konstruktor.
   */
  constructor() {
    // Diese Informationen müssen aus der Firebase-Konsole ermittelt
    // werden, indem dort ein neues Projekt mit einer neuen Datenbank
    // angelegt und diese dann mit einer neuen App verknüpft wird.
    firebase.initializeApp({
      apiKey: "AIzaSyDXqHkN6_tmjpXiX5x4opKgAHVeDJyrEtw",
      authDomain: "gamesup-3168b.firebaseapp.com",
      databaseURL: "https://gamesup-3168b.firebaseio.com",
      projectId: "gamesup-3168b",
      storageBucket: "gamesup-3168b.appspot.com",
      messagingSenderId: "258827438269",
      appId: "1:258827438269:web:30fe7b503f90086d954fd4",
      measurementId: "G-RD4DK5N71Z"
    });

    // Dieses Objekt dient dem eigentlichen Datenbankzugriff.
    // Dabei können beliebig viele "Collections" angesprochen werden,
    // die in etwa den Tabellen einer klassischen Datenbank entsprechen.
    this._db = firebase.firestore();
    this._games = this._db.collection("games");
    this._plattforms = this._db.collection("plattforms");
    this._dates = this._db.collection("dates");
  }

  async createGamesData() {
    let games = await this.selectAllBooks();

    if (games.length < 1) {
      this.saveItems("games", [{
        "name": "GTA 5",
        "id": "gta5",
        "image": "GTA V.jpg",
        "plattform": ["pc", "ps4", "xbox"],
        "description": "",
      }]);
    }
  }

  async createPlattformsData() {
    let games = await this.selectAllBooks();

    if (games.length < 1) {
      this.saveItems("plattforms", [{
        "name": "PC",
        "id": "pc",
      }]);
    }
  }

  async saveItems(collectionName, items) {
    let collection = this._db.collection(collectionName);
    let batch = this._db.batch();

    items.forEach(item => {
      let dbItem = collection.doc(item.id);
      batch.set(dbItem, item);
    });

    return batch.commit();

    async deleteItemsById(collectionName, ids) {
        let collection = this._db.collection(collectionName);
        let batch = this._db.batch();

        items.forEach(item => {
            let dbItem = collection.doc(item.id);
            batch.delete(dbBook);
        });

        return batch.commit();
    }
    /**
     * Diese Methode sucht einen Datensazt anhand seiner ID in der Datenbank
     * und liefert den ersten, gefundenen Treffer zurück.
     *
     * @param  {Number} id Datensatz-ID
     * @return {Object} Gefundener Datensatz
     */
    getRecordById(id) {
      id = parseInt(id);
      return this._data.find(r => r.id === id);
    }

    /**
     * Diese Methode gibt eine Liste mit allen Datensätzen zurück.
     * @return {Array} Liste aller Datensätze
     */
    getAllRecords() {
      return this._data;
    }
  }

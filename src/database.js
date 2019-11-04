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
        "name": "League of Legends",
        "id": "lol",
        "image": "LoL.jpg",
        "plattform": "pc",
      }, {
        "name": "World of Warcraft",
        "id": "wow",
        "image": "WoW.jpg",
        "plattform": "pc",
      }, {
        "name": "Battlefield V",
        "id": "bfv",
        "image": "Battlefield.jpg",
        "plattform": ["pc", "ps4", "xbox"],
      }, {
        "name": "Assassin´s Creed",
        "id": "ac",
        "image": "A.Creed.jpg",
        "plattform": ["pc", "ps4", "xbox"],
      }, {
        "name": "Borderlands 3",
        "id": "borderlands3",
        "image": "Borderlands.jpg",
        "plattform": ["pc", "ps4", "xbox"],
      }, {
        "name": "Call of Duty Modern Warfare",
        "id": "codmw",
        "image": "CallOfDuty.jpg",
        "plattform": ["pc", "ps4", "xbox"],
      }, {
        "name": "Counter Strike : Global Offensive",
        "id": "csgo",
        "image": "Counter-Strike.jpg",
        "plattform": "pc",
      }, {
        "name": "Dota 2",
        "id": "dota2",
        "image": "Dota2.jpg",
        "plattform": "pc",
      }, {
        "name": "Fallout 76",
        "id": "fallout76",
        "image": "Fallout76.jpg",
        "plattform": ["pc", "ps4", "xbox"],
      }, {
        "name": "FIFA20",
        "id": "fifa",
        "image": "FIFA20.jpg",
        "plattform": ["pc", "ps4", "xbox"],
      }, {
        "name": "Fortnite",
        "id": "fortnite",
        "image": "Fortnite.jpg",
        "plattform": ["pc", "ps4", "xbox"],
      }, {
        "name": "GTA 5",
        "id": "gta5",
        "image": "GTA V.jpg",
        "plattform": ["pc", "ps4", "xbox"],
      }, {
        "name": "Minecraft ",
        "id": "minecraft",
        "image": "Minecraft.jpg",
        "plattform": ["pc", "ps4", "xbox"],
      }, {
        "name": "Monster Hunter World",
        "id": "monsterHunter",
        "image": "Monster_Hunter_World.jpg",
        "plattform": ["pc", "ps4", "xbox"],
      }, {
        "name": "Overwatch",
        "id": "overwatch",
        "image": "Overwatch.jpg",
        "plattform": ["pc", "ps4", "xbox"],
      }, {
        "name": "PUBG",
        "id": "pubg",
        "image": "P.BATTLEGROUNDS.jpg",
        "plattform": "pc",
      }, {
        "name": "Rainbow Six Siege",
        "id": "r6",
        "image": "Rainbow.jpg",
        "plattform": ["pc", "ps4", "xbox"],
      }, {
        "name": "Rocket League",
        "id": "rocketLeague",
        "image": "Rocket_League.jpg",
        "plattform": ["pc", "ps4", "xbox"],
      }, {
        "name": "Sea of Thieves",
        "id": "seaOfThiefes",
        "image": "SeaOfThiefes.jpg",
        "plattform": ["pc", "xbox"],
      }, {
        "name": "Secret Neighbor",
        "id": "secretNeighbor",
        "image": "Secret_Neighbor.jpg",
        "plattform": "pc",
      }, {
        "name": "ARK Survival Evolved",
        "id": "ark",
        "image": "ARK.jpg",
        "plattform": ["pc", "ps4", "xbox"],
      }]);
    }
  }

  async createPlattformsData() {
    let games = await this.selectAllBooks();

    if (games.length < 1) {
      this.saveItems("plattforms", [{
        "name": "PC",
        "id": "pc",
      }, {
        "name": "PS4",
        "id": "ps4",
      }, {
        "name": "xBox",
        "id": "xbox",
      }]);
    }
  }

  async selectAllBItems(collectionName) {
  let collection = this._db.collection(collectionName);
      let result = await collection.orderBy("name").get();
      let items = [];

      result.forEach(entry => {
          let item = entry.data();
          items.push(item);
      });

      return items;
  }

  async selectItemById(collectionName, id) {
      let collection = this._db.collection(collectionName);
      let result = await collection.doc(id).get();
      return result.data();
    }

  async saveItems(collectionName, items) {
    let collection = this._db.collection(collectionName);
    let batch = this._db.batch();

    items.forEach(item => {
      let dbItem = collection.doc(item.id);
      batch.set(dbItem, item);
    });

    return batch.commit();
  }

    async deleteItemsById(collectionName, ids) {
        let collection = this._db.collection(collectionName);
        let batch = this._db.batch();

        items.forEach(item => {
            let dbItem = collection.doc(item.id);
            batch.delete(dbBook);
        });

        return batch.commit();
    }
  }

export default class Produit {
  constructor(nom, qte, id) {
    this._nom = nom;
    this._qte = qte;
    this._id = id || Math.floor(Math.random() * 10); // génération d'un id
  }
  get nom() {
    return this._nom;
  }
  get id() {
    return this._id;
  }
  get qte() {
    return this._qte;
  }

  displayNom() {
    return `${this._nom} `;
  }

  displayQte() {
    return `${this._qte} `;
  }

  displayId(){
    return `${this._id} `;
  }

  pourAfficher() {
    return `--> ${this._texte} (${this._fait ? "fait" : "à faire"})`;
  }

  deleteSelf(url) {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    fetch(url + "/" + this.id, fetchOptions)
      .then((result) => result.json())
      .then((json) => {
        if (json.status == 1) {
          //update la liste
        };
      })
      .catch((e) => console.log(e));
  }

  minusOne(url) {

    if (this.qte == 1) {
      this.deleteSelf(url);
    } else {

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const fetchOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          id: this.id,
          nom: this.nom,
          qte: this.qte - 1,
        }),
      };

      fetch(url, fetchOptions)
        .then((result) => result.json())
        .then((json) => {
          if (json.status == 1) {

          };
        })
        .catch((e) => console.log(e));
    }
  }

  plusOne(url) {
    console.log(this.id);
    console.log(this.nom);
    console.log(this.qte);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const fetchOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        id: this.id,
        nom: this.nom,
        qte: this.qte + 1,
      }),
    };

    fetch(url, fetchOptions)
      .then((result) => result.json())
      .then((json) => {
        if (json.status == 1) {

        };
      })
      .catch((e) => console.log(e));
  }
}

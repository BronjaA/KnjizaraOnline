import { CartBook } from './cartBook';

export class Order {
    id: string;
    userID: string;
    userOrder: string;
    ime: string;
    prezime: string;
    ulica: string;
    grad: string;
    zip: string;
    tel: string;
    email: string;
    napomena: string;
    status: string;
    datum: Date;
    korpa?: CartBook[];

    constructor(
        id: string,
        userID: string,
        userOrder: string,
        ime: string,
        prezime: string,
        ulica: string,
        grad: string,
        zip: string,
        tel: string,
        email: string,
        napomena: string,
        status: string,
        datum: Date
    )
    {
        this.id = id;
        this.userID = userID;
        this.userOrder = userOrder;
        this.ime = ime;
        this.prezime = prezime;
        this.ulica = ulica;
        this.grad = grad;
        this.zip = zip;
        this.tel = tel;
        this.email = email;
        this.napomena = napomena;
        this.status = status;
        this.datum = datum;
        this.korpa = [];
    }
}

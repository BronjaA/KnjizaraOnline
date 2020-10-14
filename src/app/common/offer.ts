export class Offer {
    id: number;
    statusPonude: string;
    userID: number;
    naziv: string;
    autor: string;
    izdavac: string;
    brStrana: number;
    pismo: string;
    povez: string;
    format: string;
    gIzdanja: string;
    napomena: string;
    stanje: string;
    cena: number;
    ime: string;
    ulica: string;
    zip: string;
    grad: string;
    tel: string;
    email: string;
    datum: Date;

    constructor(
        userID: number,
        statusPonude: string,
        naziv: string,
        autor: string,
        izdavac: string,
        brStrana: number,
        pismo: string,
        povez: string,
        format: string,
        gIzdanja: string,
        napomena: string,
        stanje: string,
        cena: number,
        ime: string,
        ulica: string,
        zip: string,
        grad: string,
        tel: string,
        email: string,
        datum: Date,
        id?: number
    )
    {
        this.id = id;
        this.userID = userID;
        this.statusPonude = statusPonude;
        this.naziv = naziv;
        this.autor = autor;
        this.izdavac = izdavac;
        this.brStrana = brStrana;
        this.pismo = pismo;
        this.povez = povez;
        this.format = format;
        this.gIzdanja = gIzdanja;
        this.napomena = napomena;
        this.stanje = stanje;
        this.cena = cena;
        this.ime = ime;
        this.ulica = ulica;
        this.zip = zip;
        this.grad = grad;
        this.tel = tel;
        this.email = email;
        this.datum = datum;
    }
}

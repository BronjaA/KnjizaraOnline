export class Book {
    id: number;
    autor: string;
    ime: string;
    cena: number;
    kategorija: string;
    slika: string;
    izdavac: string;
    brStrana: number;
    pismo: string;
    povez: string;
    format: string;
    gIzdanja: string;
    opis: string;

    constructor(
        autor: string,
        ime: string,
        cena: number,
        kategorija: string,
        slika: string,
        izdavac: string,
        brStrana: number,
        pismo: string,
        povez: string,
        format: string,
        gIzdanja: string,
        opis: string,
        id?: number
    )
    {
        this.autor = autor;
        this.ime = ime;
        this.cena = cena;
        this.kategorija = kategorija;
        this.slika = slika;
        this.izdavac = izdavac;
        this.brStrana = brStrana;
        this.pismo = pismo;
        this.povez = povez;
        this.format = format;
        this.gIzdanja = gIzdanja;
        this.opis = opis;
        this.id = id;
    }
}

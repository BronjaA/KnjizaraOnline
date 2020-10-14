import { Book } from './book';

export class CartBook extends Book{
    kvantitet: number;
    book: Book;

    constructor(
        book: Book,
        kvantitet: number
    )
    {
        super(
            book.autor,
            book.ime,
            book.cena,
            book.kategorija,
            book.slika,
            book.izdavac,
            book.brStrana,
            book.pismo,
            book.povez,
            book.format,
            book.gIzdanja,
            book.opis,
            book.id
        );
        this.autor = book.autor;
        this.ime = book.ime;
        this.cena = book.cena;
        this.kategorija = book.kategorija;
        this.slika = book.slika;
        this.izdavac = book.izdavac;
        this.brStrana = book.brStrana;
        this.pismo = book.pismo;
        this.povez = book.povez;
        this.format = book.format;
        this.gIzdanja = book.gIzdanja;
        this.opis = book.opis;
        this.id = book.id;
        this.kvantitet = kvantitet;
    }
}

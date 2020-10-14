export class User {
    public id: number;
    public username: string;
    public password: string;
    public email: string;

    constructor(Id: number, name: string, pwd: string, email: string) {
    this.id = Id;
    this.username = name;
    this.password = pwd;
    this.email = email;
    }
}

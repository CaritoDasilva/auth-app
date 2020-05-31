export class User{
    name: string;
    picture: string;
    phone: string;
    email: string;
    uid: string;

    constructor( name:string, picture: string, email: string, uid: string, phone?: string ) {
        this.name = name;
        this.picture = picture;
        this.email = email;
        this.uid = uid;
        this.phone = phone;
    }
}
export class User {
    constructor(public email: string,
                public name: string,
                public password: string){}

    matches(another: User): boolean{
        return another !== undefined && 
        another.email === this.email && 
        another.password === this.password
    }
}

export const users: {[key:string]: User} = {
    "leandro@mail.com": new User('leandro@mail.com', 'Leandro', 'leandro19'),
    "liliane@mail.com": new User('liliane@mail.com', 'Liliane', 'liliane05')
}
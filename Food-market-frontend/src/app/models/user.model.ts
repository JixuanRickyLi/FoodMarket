export class UserModel {
  constructor(public id: number,
              public username: string,
              public password: string,
              public name: string,
              public email: string,
              public tel: string,
              public address: string) {
  }
}

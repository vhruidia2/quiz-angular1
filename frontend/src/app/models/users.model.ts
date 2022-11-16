export class User {
  _id: string;
  firtsName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;

  constructor(
    _id = '',
    firtsName = '',
    lastName = '',
    email = '',
    password = '',
    isAdmin = false
  ) {
    this._id = _id;
    this.firtsName = firtsName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}

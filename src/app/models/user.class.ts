export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string, // Firebase Auth-Aktualisierungstoken
    private _tokenExpirationDate: Date // Ablaufdatum des Loginstatus nach der Anmeldung, bei Firebase nach einer Stunde
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

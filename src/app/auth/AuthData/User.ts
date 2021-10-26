import { AuthResponse } from "./AuthenticateResponse";

export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    private _jwt: string
  ) {}

  public static FromResponse(inputData: AuthResponse) : User{
    return new User(inputData.id, inputData.username, inputData.email, inputData.jwtToken);
  }

  get JwtToken(){
    if(!this.JwtExpiry || new Date() > this.JwtExpiry){
      return null;
    }
    return this._jwt;
  }

  get JwtExpiry(){
    const jwtToken = JSON.parse(
      atob(this._jwt?.split('.')[1] ?? '')
    );
    return new Date(jwtToken.exp * 1000);
  }


}

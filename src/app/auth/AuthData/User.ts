import { HttpEvent } from "@angular/common/http";
import { MonoTypeOperatorFunction, OperatorFunction } from "rxjs";
import { AuthResponse } from "./AuthenticateResponse";
import { RefreshTokenResponse } from "./RefreshTokenResponse";

export class User {
  pipe(arg0: MonoTypeOperatorFunction<unknown>, arg1: OperatorFunction<unknown, HttpEvent<any>>) {
    throw new Error('Method not implemented.');
  }
  constructor(
    public id: string,
    public username: string,
    public email: string,
    private _jwt: string
  ) {}

  public static FromAuthResponse(inputData: AuthResponse) : User{
    return new User(inputData.id, inputData.username, inputData.email, inputData.jwtToken);
  }

  public static FromRefreshResponse(currentUserId: string, currentUserName:string, refreshResponse : RefreshTokenResponse) : User{
    return new User(currentUserId, currentUserName, refreshResponse.email, refreshResponse.jwtToken);
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

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */

export interface IUser {
  id: string;
  customer_number: string;
  name: string;
  usrname: string;
  email: string;
  email_verified_at: string;
}

export class User {
  public i: IUser;

  public permissions: string[] = [];

  constructor(user: IUser) {
    this.i = user;
  }

  test(): boolean {
    return this.i.customer_number === 'HM2600';
  }

  can(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}

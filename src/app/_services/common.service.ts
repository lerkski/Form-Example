import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//Service dedicated to common functions that are likely to be used in multiple places around the webapp.
export class CommonService {

  constructor() { }

  /**
   * Takes in an string and detrmines whether or not it is a valid email address.
   * Source: https://www.w3resource.com/javascript/form/email-validation.php
   * 
   * @param email Email to validate.
   * 
   * @returns Boolean determining the validity of the email address. True = valid, false = invalid.
   */
  public validateEmail(email:string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
    return false;
  }
}

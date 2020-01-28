import { Injectable } from '@angular/core';
import { AuthenticationToken } from '../reducers';

@Injectable({
    providedIn: 'root'
})
export class UtilService {
    private readonly lsTokenKey = 'JWT-TOKEN';
    storeToken(token: AuthenticationToken) {
        localStorage.setItem(this.lsTokenKey, JSON.stringify(token));
    }
    getStoredToken(): AuthenticationToken | null {
        const tok = JSON.parse(localStorage.getItem(this.lsTokenKey));
        return tok && {
            token: tok.token,
            expires: new Date(tok.expires)
        };
    }
}

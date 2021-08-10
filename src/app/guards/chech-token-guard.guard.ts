import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { TOKEN } from '../config/config';

@Injectable({
    providedIn: 'root'
})
export class ChechTokenGuardGuard implements CanActivate {

    constructor(private router: Router) {}
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;


    canActivate(): boolean {

        if (localStorage.getItem(TOKEN)) {
            this.router.navigate(['/todos']);
            return false;
        }

        return true;
    }

}
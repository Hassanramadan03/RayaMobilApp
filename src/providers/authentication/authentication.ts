import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
 
// import 'rxjs/add/observable/throw';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {
    currentUser: any;
    apiUrl = 'http://localhost:8000/auth';
    constructor(private http: Http) {


    }
    isLoggedIn(): boolean {
        try {
            const theUser: any = JSON.parse(localStorage.getItem('currentUser'));
            if (theUser) {
                this.currentUser = theUser.user;
            }
        } catch (e) {
            return false;
        }

        return !!this.currentUser;
    }

    login(oUser) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.apiUrl}/login`, JSON.stringify(oUser), options)
            .map((response: Response) => {

                if (response.json().success) {
                    let userObj: any = {};
                    userObj.user = response.json().user;
                    userObj.token = 'JWT ' + response.json().token;
                    userObj.userId = response.json().userId;

                    localStorage.setItem('currentUser', JSON.stringify(userObj));
                } else {
                    return response.json();
                }
                return response.json();
            });
    }
    register(oUser) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.apiUrl}/signup`, JSON.stringify(oUser), options)
            .map((response) => {
                if (response.json().success) {
                    let userObj: any = {};
                    userObj.user = response.json().user;
                    userObj.token = 'JWT ' + response.json().token;
                    userObj.userId = response.json().userId;

                    localStorage.setItem('currentUser', JSON.stringify(userObj));
                } else {
                    return response.json();
                }
                return response.json();
            });
    }
    menu(): any {
        if (this.isLoggedIn()) return [
            { title: 'Home', component: 'HomePage', active: true, icon: 'home' },
            { title: 'AddProduct', component: 'IonicNativePage', active: false, icon: 'ionic' },
            { title: 'Lists', component: 'ListPage', active: false, icon: 'body' },
            { title: 'Logout', component: 'LoginListPage', active: false, icon: 'power' },
            { title: 'Theming', component: 'ThemingPage', active: false, icon: 'power' },
        ];
        else return [
            { title: 'Home', component: 'HomePage', active: true, icon: 'home' },
            { title: 'Login', component: 'LoginListPage', active: false, icon: 'archive' },
            { title: 'Theming', component: 'ThemingPage', active: false, icon: 'power' },
        ];
    }
    
    logout(): void {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
}
    
 
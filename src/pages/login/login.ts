import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/authentication/authentication';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the LoginListPageModule page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginListPage {
  user: any = {};
  public loginForm: any;
  registerForm: FormGroup;
  Login: FormGroup;
  firstName: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  loginFlage: boolean = false;
  constructor(
    private auth: AuthService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
      this.registerForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
      });

      this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      })
    
      this.firstName = this.registerForm.controls['firstName'];
      this.lastName = this.registerForm.controls['lastName'];
      this.email = this.registerForm.controls['email'];
      this.password = this.registerForm.controls['password'];

  }




  presentLoading(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    // loading.onDidDismiss(() => {
    //   const alert = this.alertCtrl.create({
    //     title: 'Success',
    //     subTitle: message,
    //     buttons: ['Dismiss']
    //   });
    //   alert.present();
    // });

    loading.present();
  }

  login(formdata: any): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      const theForm = this.loginForm.value;
      console.log(theForm)
      this.auth.login(theForm)
        .subscribe(data => {
           
          if (data.success) this.navCtrl.push('ListPage')
          else if (!data.success) this.presentToast(data.message)
          else this.presentToast('Login Failed try again !')
          this.loginForm.reset();
        });
    } else {
      this.presentToast('Fill the Form plz ')
    }
  }

  register(formdata: any): void {
    if (this.registerForm.dirty && this.registerForm.valid) {
      const theForm = this.registerForm.value;
      console.log(theForm)
      this.auth.register(theForm)
        .subscribe(data => {
          if (data.success) this.navCtrl.setRoot('ListPage')
          else if (!data.success) this.presentToast(data.message)
          else this.presentToast('Login Failed try again !')
          this.loginForm.reset();
          this.registerForm.reset();
        });
    } else {
      console.log(this.registerForm)
      this.presentToast('Fill the Form plz ')
    }
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  toggleForm() {
    this.registerForm.reset();
    this.loginFlage = !this.loginFlage
  }

}

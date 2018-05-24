import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { FeedService } from '../../providers/feed/feed';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-ionic-native',
  templateUrl: 'ionic-native.html',
})
export class IonicNativePage {
  user: any = {};
  public loginForm: any;
  addForm: FormGroup;
  Login: FormGroup;
  title: AbstractControl;
  price: AbstractControl;
  email: AbstractControl;
  card: any = {};
  Updateflage: boolean = false;
  constructor(public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private fb: FormBuilder,
    public feed: FeedService,
    private navParams: NavParams,
    private navCtrl:NavController) {
    if (navParams.get('param1')) {
      this.Updateflage = true;

      this.card = navParams.get('param1');
      console.log(this.Updateflage);

    } else {
      this.Updateflage = false;

    }
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      des: ['', Validators.required],
    });
    this.title = this.addForm.controls['title'];
    this.price = this.addForm.controls['price'];
    this.email = this.addForm.controls['email'];

  }
  
  addProduct(formdata: any): void {
    if (this.addForm.dirty && this.addForm.valid) {
      const theForm = this.addForm.value;
      theForm._id = this.card._id;
      this.feed.addProduct(theForm)
        .subscribe(data => {
          if (data.success) {
            this.navCtrl.setRoot('ListPage')
            this.presentToast(data.message)
          }
          else if (!data.success) this.presentToast(data.message)
          else this.presentToast('Login Failed try again !')
          this.addForm.reset();
        });
    } else {
      console.log(this.addForm)
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
  updateProduct(formdata: any): void {
    if (this.addForm.valid) {
      const theForm = this.addForm.value;
      theForm._id = this.card._id;
      this.feed.updateProduct(theForm)
        .subscribe(data => {
          if (data.success) {
            this.navCtrl.setRoot('ListPage')
            this.presentToast(data.message)
          }
          else if (!data.success) this.presentToast(data.message)
          else this.presentToast('Login Failed try again !')
          this.addForm.reset();
        });
    } else {
      console.log(this.addForm)
      this.presentToast('Fill the Form plz ')
    }
  }
  
}

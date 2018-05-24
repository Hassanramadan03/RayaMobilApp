import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/authentication/authentication';
import { FeedService } from '../../providers/feed/feed';
import { FilterPipe } from '../../pipes/filter/filter';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [FilterPipe]
})
export class ListPage {
  rootPage: any;
  items: any = [];
  reload: any;
  constructor(public navCtrl: NavController,
    public auth: AuthService,
    public feed: FeedService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.getProducts();
  }

  go(item) {
    this.navCtrl.push('IonicNativePage', {
      param1: item
    })
  }
  Delete(item) {
    let alert = this.setAlert(`Are You Sure To Delete ${item.title}?`);
    alert.present();
    alert.onDidDismiss((data) => {
      if (data) {
        this.feed.deleteProduct(item._id)
          .subscribe(data => {
            if (data.success) {
              this.navCtrl.setRoot('ListPage')
              this.presentToast(data.message)
            }
            else if (!data.success) this.presentToast(data.message)
            else this.presentToast('Login Failed try again !')
          });
      }
    });
  }

  setAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Delete Product..!',
      subTitle: message,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            alert.dismiss(true);
            return false;
          }
        }, {
          text: 'No',
          handler: () => {
            alert.dismiss(false);
            return false;
          }
        }
      ]
    });

    return alert;
  }
  getProducts() {
    this.feed.getProducts().subscribe((data) => {
      this.items = data.allProducts;
      console.log(this.items);

    })
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}

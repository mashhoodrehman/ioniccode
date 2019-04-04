import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, App } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the CommonserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonserviceProvider {

  loading=null;
  public baseUrl='https://seller.wbminternational.pk/public/';
   public apiUrl='api/';
  constructor( public http: Http,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public app: App,
    private toastCtrl: ToastController) {
    console.log('Hello CommonserviceProvider Provider');
    
  }
  startLoading() {
    if (this.loading == null) {
      this.loading = this.loadingCtrl.create({
        //spinner: 'hide',
        content: 'Loading Please Wait...'
      });

      this.loading.present();
    }
  }
getApiData(url, isLoading = true) {
    if (isLoading)
      this.startLoading();
    return new Promise((resolve, reject) => {
      this.http.get(

        this.baseUrl+this.apiUrl + url //+ '?token=' + localStorage.getItem('token')
        ,{headers: new Headers({'Authorization':'Bearer '+localStorage.getItem('token')})}

      ).subscribe(res => {
        if (isLoading)
          this.closeLoading();
        resolve(res.json());
      }, (err) => {
        this.closeLoading();
           let er = JSON.parse(err._body);
        reject(err);
      });
    });
  }

  postApi(url, values = {}, isLoading = true) {
    if (isLoading)
    this.startLoading();
  return new Promise((resolve, reject) => {

    this.http.post(

      this.baseUrl+this.apiUrl + url
      , values
      ,{headers: new Headers({'Authorization':'Bearer '+localStorage.getItem('token')})}

    ).subscribe(res => {
      if (isLoading)
        this.closeLoading();
      resolve(res.json());
    }, (err) => {
      this.closeLoading();
        let er = JSON.parse(err._body);
        reject(err);
    });
  });
}

  closeLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }



}

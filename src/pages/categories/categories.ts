import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  public result:any;
  segment='today';
  constructor(public navCtrl: NavController, public navParams: NavParams , public provider: CommonserviceProvider) {

    this.provider.getApiData('geteventscategories/'+this.segment)
        .then(res => {
          this.result = res;
          console.log(this.result , 'resutl')
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  datewise(segment){

    this.provider.getApiData('geteventscategories/'+segment)
        .then(res => {
          this.result = res;
          console.log(this.result , 'resutl')
        })
  }

}

import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {FormControl} from "@angular/forms";
import {  } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the AddPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})

export class AddPostPage {

    public event_title:string = '';
  public address:string = '';
  public start_date='';
  public end_date='';
  public token:string;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public result:any;
  public pic:any = 'dfsdfd';
  public imageLists = [];
  public categories = [];
  public category ;

  @ViewChild("search")
  public searchElementRef;

constructor(public navCtrl: NavController,  public forgotCtrl: AlertController,private mapsAPILoader: MapsAPILoader,
            private ngZone: NgZone , public provider: CommonserviceProvider , private camera: Camera)  {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.token = localStorage.getItem('token');
    //create search FormControl
    this.searchControl = new FormControl();
    this.provider.getApiData('getcategories').then((res:any ) => {
        this.categories = res;
    })
    //set current position
    this.setCurrentPosition();

}

ionViewDidLoad() { 
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
        let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
        let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
            types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
                //get the place result
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                console.log(place.name , 'ddd')
                //verify result
                if (place.geometry === undefined || place.geometry === null) {
                    return;
                }

                //set latitude, longitude and zoom
                this.latitude = place.geometry.location.lat();
                this.longitude = place.geometry.location.lng();
                this.zoom = 12;
                this.address = place.name;
            });
        });
        console.log(autocomplete , 'sdfsdf');
    });
}

  private setCurrentPosition() {
      if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              this.zoom = 12;
          });
      }
  }

  public storepost(){
    let data = {
        address: this.address,
        event_title: this.event_title,
        lat: this.latitude,
        lon: this.longitude,
        start_date: this.start_date,
        end_date: this.end_date,
        profile: 'profile image',
        images: this.imageLists,
        category: this.category,
    }
    console.log(data);
    this.provider.postApi('storeevent' , data)
    .then(res => {
    console.log(res , 'info')
    this.result = res;
    let alert = this.forgotCtrl.create({
      
        title:"Success",
        
        subTitle:"Event has been saved!",
        
        buttons: ['OK']
        
        });
        alert.present();
    this.navCtrl.setRoot(TabsPage);
    });

}


storepic(){
    const options: CameraOptions = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
        mediaType: this.camera.MediaType.PICTURE
      }
      
      this.camera.getPicture(options).then((imageData) => { 
            //here iam converting image data to base64 data and push a data to array value.  
            // this.imageLists.push('data:image/jpeg;base64,' + results[index]);  
            this.imageLists.push('data:image/jpeg;base64,' + imageData);  
       this.pic = 'data:image/jpeg;base64,' + imageData;
        
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
      }, (err) => {
       // Handle error
      });
}

selectfieldonchange(val) {
    this.category = val;
    console.log(val, 'value')
  }

imgremove(ii){
    console.log(this.imageLists , 'images')
    this.imageLists.splice(ii , 1);
    console.log(this.imageLists , 'images')
   console.log(ii)
}


}

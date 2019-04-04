import {Component, ViewChild, ElementRef} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {CheckoutTripPage} from "../checkout-trip/checkout-trip";
import { CommonserviceProvider } from "../../providers/commonservice/commonservice";
declare var google;

@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {
  // trip info
  public trip: any;
  // number of adult
  public adults = 2;
  // number of children
  public children = 0;
  public result:any;
  public comment:string;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public nav: NavController, public tripService: TripService , public provider: CommonserviceProvider , public navParams: NavParams) {
    // set sample dat
    this.result = this.provider.getApiData('postdetail/'+navParams.get('id')).then((res: any)=> {
      this.result = res.data;
      console.log(this.result , 'fdf')
      this.initMap();
    })
    this.trip = tripService.getItem(1);    
  }
  ionViewDidEnter(){
    
    
  }
  
  // minus adult when click minus button
  minusAdult() {
    this.adults--;
  }

  // plus adult when click plus button
  plusAdult() {
    this.adults++;
  }

  // minus children when click minus button
  minusChildren() {
    this.children--;
  }

  // plus children when click plus button
  plusChildren() {
    this.children++;
  }

  // go to checkout page
  checkout() {
    this.nav.push(CheckoutTripPage);
  }
  loadMap(){

    let latLng = new google.maps.LatLng(this.result.lat, this.result.long);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }
  initMap() {
    var map;
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: new google.maps.LatLng(this.result.lat, this.result.long),
      //mapTypeId: 'ROADMAP'.toLowerCase()
      //mapTypeId: 'SATELLITE'.toLowerCase()
      //mapTypeId: 'HYBRID'.toLowerCase()
      mapTypeId: 'TERRAIN'.toLowerCase()
    });

   // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = {
      parking: {
        icon: 'https://freeiconshop.com/wp-content/uploads/edd/person-girl-flat.png'
      },
      library: {
        icon: 'https://cdn2.iconfinder.com/data/icons/circle-avatars-1/128/050_girl_avatar_profile_woman_suit_student_officer-512.png'
      },
      info: {
        icon: 'https://www.shareicon.net/data/2016/05/24/769978_man_512x512.png'
      }
    };

    var features = [
      {
        position: new google.maps.LatLng(-33.91721, 151.22630),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91539, 151.22820),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91747, 151.22912),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91910, 151.22907),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91725, 151.23011),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91872, 151.23089),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91784, 151.23094),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91682, 151.23149),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91790, 151.23463),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91666, 151.23468),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.916988, 151.233640),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
        type: 'library'
      }
    ];

    // Create markers.
    features.forEach(function(feature) {
      var marker = new google.maps.Marker({
        position: feature.position,
        icon: {
          url: icons[feature.type].icon, // url
          scaledSize: new google.maps.Size(50, 50), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        },
        map: map
      });
    });
  }

  addcomment(){
    let data = {
      postid: this.navParams.get('id'),
      comment: this.comment
    }
    this.provider.postApi('savecomment' , data).then((res: any) => {
      this.result = res.data;
      this.comment = '';
    })
  }

}

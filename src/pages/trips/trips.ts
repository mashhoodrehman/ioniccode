import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {TripDetailPage} from "../trip-detail/trip-detail";
import { AddPostPage } from "../add-post/add-post";
import { CommonserviceProvider } from "../../providers/commonservice/commonservice";

@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  // list of trips
  public trips: any;
  public result: any;
  public imagesrc = 'assets/img/trip/thumb/trip_5.jpg';

  constructor(public nav: NavController, public tripService: TripService , public provider: CommonserviceProvider) {
    // set sample data
     this.provider.getApiData('getevents').then((res: any) =>  {
      console.log(res)
      this.result = res.data;
      console.log(this.result);

    });
  }

  // view trip detail
  viewDetail(id) {
    this.nav.push(TripDetailPage, {id: id});
  }
  newPost()
  {
    this.nav.push(AddPostPage);
  }

  like(like_id , triplike , event , getid){
    let elem = document.getElementById(like_id+'like');
    let split = elem.textContent.split(' ');
    this.provider.getApiData('likeset/'+like_id).then((res:any)=>{
        if(res == "matched"){
          let likes = parseFloat(split[0]) - 1;
          let str = likes+ " Likes"
          elem.textContent = str;
        }
        else{
          let likes = parseFloat(split[0]) + 1;
          let str = likes+ " Likes"
          elem.textContent = str;
        }
      });
  }

  showinterest(interest_id){
    let elem = document.getElementById(interest_id+'interest');
    let split = elem.textContent.split(' ');
    this.provider.getApiData('interestset/'+interest_id).then((res:any)=>{
        if(res == "matched"){
          let str = "Interest";
          elem.textContent = str;
        }
        else{
          let str = "Interested"
          elem.textContent = str;
        }
      });
  }

}

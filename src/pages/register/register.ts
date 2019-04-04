import {Component , ViewChild} from "@angular/core";
import {NavController, AlertController, MenuController, ToastController, LoadingController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { TabsPage } from "../tabs/tabs";
import {Http, Headers, RequestOptions}  from "@angular/http";
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import 'rxjs/Rx';
import { CommonserviceProvider } from "../../providers/commonservice/commonservice";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  @ViewChild("name") name;
  @ViewChild("email") email;
  @ViewChild("password") password;
  @ViewChild("password_confirmation") password_confirmation;
  public token:string;
  public result:any;

  constructor(public nav: NavController , public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController  , public loading: LoadingController , public http: HttpClient , public provider: CommonserviceProvider) {
  }

  // register and go to home page
  register() {
   


    if(this.email.value==""){
      let alert = this.forgotCtrl.create({
      
      title:"ATTENTION",
      
      subTitle:"Email is empty",
      
      buttons: ['OK']
      
      });
      alert.present();
    }
    else if(this.password.value==""){
      let alert = this.forgotCtrl.create({
      
        title:"ATTENTION",
        
        subTitle:"Password is empty",
        
        buttons: ['OK']
        
        });
        alert.present();
    }
    else{


    let loader = this.loading.create({

      content: 'Processing please wait…',
      
      });
      loader.present().then(() => { 
        let data = {

          email: this.email.value,
          
          password: this.password.value,
          name: this.name.value,
          password_confirmation: this.password_confirmation.value
              };
              this.token = "";
        this.provider.postApi('register' , data)
        .then(res => {
        
        console.log(res , 'info')
        this.result = res;

        
        loader.dismiss()
        
        if(this.result.token){
          let alert = this.forgotCtrl.create({
          
          title:'CONGRATS',
          
          subTitle:("token has been saved"),
          
          buttons: ['OK']
          
          });
          
          alert.present();
          localStorage.setItem('token' , this.result.token);
          this.nav.setRoot(TabsPage);
          
          }else
          
          {
          
          let alert = this.forgotCtrl.create({
          
          title:'ERROR',
          
          subTitle:'Your Login Username or Password is invalid',
          
          buttons: ['OK']
          
          });
          
          alert.present();
          
          }
        });

      });
      
      }
    
  }
  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}

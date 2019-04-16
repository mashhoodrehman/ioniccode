import {Component , ViewChild} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {Http, Headers, RequestOptions}  from "@angular/http";
import {RegisterPage} from "../register/register";
import { LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import 'rxjs/add/operator/map';


import { TabsPage } from "../tabs/tabs";
import { CommonserviceProvider } from "../../providers/commonservice/commonservice";
import { AddPostPage } from "../add-post/add-post";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  @ViewChild("email") email;
  @ViewChild("password") password;

  data:string;
  token:string;
  public result:any;


  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController  , public loading: LoadingController , private http: HttpClient , public provider: CommonserviceProvider) {
    this.token = localStorage.getItem('token')
    if(this.token){
      this.provider.getApiData('check').then((res: any) => {
        if(res.status == "Token is Invalid"){
          localStorage.removeItem('token')
        }
        else{
          
          this.nav.setRoot(TabsPage);
        }
      })
    }
    
    // this.nav.setRoot(TabsPage);
    // this.nav.setRoot(TabsPage);
    this.menu.swipeEnable(false);
  }


  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }
  // login and go to home page
  login() {
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
          
          password: this.password.value
              };
              this.token = "";
        this.provider.postApi('login' ,  data)
        .then(res => {
        
        console.log(res , 'info')
        this.result = res;

        
        loader.dismiss()
        
        if(this.result.token){
          
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

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}

import {Component , ViewChild} from "@angular/core";
import {NavController, AlertController, MenuController, ToastController, LoadingController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { TabsPage } from "../tabs/tabs";
import {Http, Headers, RequestOptions}  from "@angular/http";
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import 'rxjs/Rx';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  @ViewChild("name") name;
  @ViewChild("email") email;
  @ViewChild("password") password;
  public token:string;

  constructor(public nav: NavController , public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController  , public loading: LoadingController , public http: HttpClient) {
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
      else if(this.name.value==""){
        let alert = this.forgotCtrl.create({
        
          title:"ATTENTION",
          
          subTitle:"Name is empty",
          
          buttons: ['OK']
          
          });
          alert.present();
      }
      else{
        var headers = new Headers();
  
  headers.append("Accept", "application/json");
  
  headers.append("Content-Type", "application/json" );
  
  let options = new RequestOptions({ headers: headers });
  
  let data = {
  
  email: this.email.value,
  
  password: this.password.value,
  name: this.name.value
      };
      let loader = this.loading.create({
  
        content: 'Processing please wait…',
        
        });
        loader.present().then(() => {
          this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU1MzQzNzUyMCwiZXhwIjoxNTUzNDQxMTIwLCJuYmYiOjE1NTM0Mzc1MjAsImp0aSI6Ik4wZ2lYOHg5M1J2NDU5aVgiLCJzdWIiOjIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.PyzAsNTVp_ZLoR3CS5yUQjVfG6yFohLp98DkIjdcAPU";  
          this.http.post('http://127.0.0.1:8000/api/register',data,{ headers: new HttpHeaders().set('Content-Type', 'application/json').set('value' , 'Bearer' + this.token)})
          
          .map(res => res)
          
          .subscribe(res=> {
          
          console.log(res)
          
          loader.dismiss()
          if(res){
            localStorage.setItem('token' , res.token);
            let alert = this.forgotCtrl.create({
            
            title:'CONGRATS',
            
            subTitle:("token has been saved"),
            
            buttons: ['OK']
            
            });
            
            alert.present();
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

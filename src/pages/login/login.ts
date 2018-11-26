import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Validators, FormGroup, FormControl  } from '@angular/forms';


@Component({
  selector: 'page-login',
  templateUrl: 'Login.html'
})
export class LoginPage {

  loginForm: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController) {

                this.loginForm = new FormGroup({
                  name: new FormControl('', Validators.required),
                  password: new FormControl('', Validators.required),
                });    

  }
  toHomePage(){
    
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Sending ...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss(this.navCtrl.push(HomePage));
    }, 3000);
  }
}
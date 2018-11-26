import { Component, ValueProvider } from '@angular/core';
import { NavController, AlertController, LoadingController} from 'ionic-angular';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';

import { ReportPage } from '../report/report';
//import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fm: FormGroup;
  private reportForm : FormGroup;
  tester : any;
  myphoto:any;
  section: string;
  url: string;
  headers: Headers;
  currentDate;
  formattedDate;

  constructor(public navCtrl: NavController,
              private alertController:AlertController,
              public loadingCtrl: LoadingController,
              private camera: Camera,
              private formBuilder : FormBuilder,
              private httpClient : HttpClient
              ) {
                this.currentDate = new Date();
                this.getFormattedDate()

                
                this.tester = this.httpClient.get('http://127.0.0.1:3000/api/puppies');
                this.tester.subscribe(data=>{console.log('mynewdata',data)})

                this.reportForm = this.formBuilder.group({
                  fullname: [''],
                  date: [this.formattedDate],
                  category: [''],
                  message: [''],
                })
  }
  getFormattedDate(){
    var dateObj = new Date()

    var year = dateObj.getFullYear().toString()
    var month = dateObj.getMonth().toString()
    var date = dateObj.getDate().toString()
     
    var monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

    this.formattedDate = monthArray[month] +' '+ date +', '+ year;
  }

  reportmo(){
    this.popuplogin();
  }
    

 ionViewDidLoad() {
    this.takePhoto();
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.myphoto = ('data:image/jpeg;base64,' + imageData);
    }, (err) => {
     
    });
  }
  popuplogin(){
    let alert = this.alertController.create({
      title: 'Login',
      message:'Please Verify your account',
      inputs: [
       
        {
          name: 'password',
          placeholder: 'Your Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            /*if (User.isValid(data.username, data.password)) {*/
             console.log('etona:', this.reportForm.value);

                this.httpClient.post('http://127.0.0.1:3000/api/puppies', this.reportForm.value)
                  .subscribe(data => {
                    console.log('pasok sa banga!');
                  }, error =>{
                    console.log('ayoko na');
                  });
    
           /* } else {
              // invalid login
              return false;
            }*/
              this.navCtrl.push(ReportPage);
          }
        }
      ]
    });
    alert.present();
  }
}
  
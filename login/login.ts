import { MyserviceProvider } from './../../providers/myservice/myservice';
import { HomePage } from './../home/home';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { IonicPage, NavController,LoadingController, NavParams, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
usernamee: string;
passwordd: string;
namee: string;
signined: any;
local:any;
touristnameset= false;
loggedin = false;
loadingctr: any;
profiledata: any;
userDetailsForm : FormGroup;

// error messages
account_validation_messages = {
  'username': [
    { type: 'required', message: 'Username is required' },
    // { type: 'minlength', message: 'Username must be at least 5 characters long' },
    // { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
    // { type: 'pattern', message: 'Your username must contain only numbers and letters' },
    // { type: 'validUsername', message: 'Your username has already been taken' }
  ],
  'name': [
    { type: 'required', message: 'Name is required' },
    // { type: 'minlength', message: 'Username must be at least 5 characters long' },
    // { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
    // { type: 'pattern', message: 'Your username must contain only numbers and letters' },
    // { type: 'validUsername', message: 'Your username has already been taken' }
  ],
  'email': [
    { type: 'required', message: 'Email is required' },
    { type: 'pattern', message: 'Enter a valid email' }
  ],
  'confirm_password': [
    { type: 'required', message: 'Confirm password is required' },
    { type: 'areEqual', message: 'Password mismatch' }
  ],
  'password': [
    { type: 'required', message: 'Password is required' }
    // { type: 'email', message: 'email is not valid' },
    // { type: 'minlength', message: 'Password must be at least 5 characters long' },

    // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
  ],
  'terms': [
    { type: 'pattern', message: 'You must accept terms and conditions' }
  ]
  }
  constructor(public navCtrl: NavController, private fb: FormBuilder,private toastCtrl: ToastController, public platform: Platform, public navParams: NavParams, private Service: MyserviceProvider, private alertCtrl: AlertController, public loadingCtrl: LoadingController,private storage: Storage) {
     this.storage.get('touristnameset').then(data => {

       if(data) {
        this.touristnameset = data;
       }
     });

    this.storage.get('touruser').then(data=>
      {
        if(data)
        {
          //this.fetchdetails (data)

          this.storage.get('touristname').then(dataa=> {
            this.successtoast('succescolor','Welcome Back '+dataa+'!', 'top');
          } );

          console.log("loogedin already"+ data);
          this.navCtrl.setRoot(HomePage);
          // if already looged in take him to home page

          // this.navCtrl.push(HomePage);
        }
        else {
          console.log("not logedin");
             }

        });


    this.userDetailsForm = this.fb.group({
      name: new FormControl('', {
        validators: Validators.required,
        // updateOn: 'blur'
     }),
      username: new FormControl('', {
        validators: Validators.required,
        // updateOn: 'blur'
     }),
      password: new FormControl('',

      {
        // validators: Validators.compose([Validators.required, Validators.required]),
         validators: Validators.compose([Validators.required]),
        // updateOn: 'blur'
     }

      )
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');


  }

  // ionViewWillLeave() {
  //   this.loadingctr.dismiss();


  // }


  logmein() {
    this.navCtrl.setRoot(HomePage);
  }

  gotoregister(){
    this.successtoast('succescolor','Hello, Just Login!', 'top');
  }



    onsubmitpin(loginval: any){

    // this.presentLoadingDefault();
    this.loadingctr = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Hang On Tight, Signing you in....'
    });


    this.loadingctr.present().then(() => {

    console.log(loginval);


   // start uncomment

     if(this.usernamee=='Kollatunez' && this.passwordd=='Tours') {
    //  this.presentLoadingDefault();
     this.loggedin == true;
     this.navCtrl.setRoot(HomePage, {'nuban': this.usernamee});
     this.storage.set('touruser', this.usernamee);

     if(loginval.name== undefined) {

      this.storage.get('touristname').then(myname => {
       // this.namee=myname;
        this.storage.set('touristname', myname);
        this.successtoast('succescolor',myname+', Login Was Successful!', 'top');
        console.log(this.namee + 'name2 '+myname);
      });

    }
    else {
      // this.storage.set('touristname', this.namee);
      // this.successtoast('succescolor',this.namee+', Login Was Successful!', 'top');
      // console.log('name3 '+this.namee);
      this.storage.get('touristname').then(myname => {
        // this.namee=myname;
         this.storage.set('touristname', loginval.name);
         this.successtoast('succescolor',loginval.name+', Login Was Successful!', 'top');
         console.log(this.namee + 'name3 '+loginval.name);
       });
    }

     this.touristnameset = true;
     this.storage.set('loggedinn', this.loggedin);
     this.storage.set('touristnameset', this.touristnameset );
     this.userDetailsForm.get('username').reset();
     this.userDetailsForm.get('password').reset();

        // if(myname==null) {

        // }

    //  this.storage.get('loggedinn');
    //  console.log(this.storage.get('touruser'));
    //  console.log(this.storage.get('touristname'));


    // console.log(this.storage.get('usernamedriver')+ ' '+ this.storage.get('loggedinn'));
     }

     else {
     this.userDetailsForm.get('username').reset();
     this.userDetailsForm.get('password').reset();
     this.presentAlert();
     this.successtoast('errorcolor','Invalid Login', 'bottom');

     }

    //start

 });


 this.loadingctr.dismiss();
  }
  //end

   presentAlert() {
    this.userDetailsForm.get('username').reset();
    this.userDetailsForm.get('password').reset();
    let alert = this.alertCtrl.create({
      title: 'Invalid Login',
      subTitle: 'Invalid Username or Password',
      buttons: ['Dismiss']
    });
    alert.present();
  }




gotoresetpass () {
  this.navCtrl.push(HomePage);
}
// presentpriceToast() {
//   let toast = this.toastCtrl.create({
//     message: 'Please make sure you are connected',
//     duration: 2000,
//     position: 'bottom'
//   });

//   // toast.onDidDismiss(() => {
//   //   console.log('Dismissed toast');
//   // });

//   toast.present();
// }

// presentpriceToastoops() {
//   let toast = this.toastCtrl.create({
//     message: 'Oops something went wrong!',
//     duration: 2000,
//     position: 'bottom'
//   });

//   // toast.onDidDismiss(() => {
//   //   console.log('Dismissed toast');
//   // });

//   toast.present();
// }
// presentpriceToastnotloggedin() {
//   let toast = this.toastCtrl.create({
//     message: 'Logged Out, Please login',
//     duration: 2000,
//     position: 'bottom'
//   });


//   toast.present();
// }



  closeap() {
    this.exit();
    }

    exit(){
      let alert = this.alertCtrl.create({
        title: 'Confirm',
        message: 'Do you want to exit?',
        buttons: [{
          text: "exit?",
          handler: () => { this.exitApp() }
        }, {
          text: "Cancel",
          role: 'cancel'
        }]
      })
      alert.present();
    }
    exitApp(){
    this.platform.exitApp();
    }

    successtoast(colrtype, message, position) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 2000,
        cssClass: colrtype,
        position: position
      });

      toast.present();
    }
}

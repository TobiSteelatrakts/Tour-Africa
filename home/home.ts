import { LoginPage } from './../login/login';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { MyserviceProvider } from './../../providers/myservice/myservice';

declare let google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  addressuser: any;
  getdevicepostion: any;
  logoutresponse: any;
  user: string;
  loggedin = false;
  marker: any;
  markers = [];
  driverid: any;
  profiledata: any;
  loadingctr: any
  addressme: string;
  fbdata: any;
  showbutton= false;
  userdistance: any;
  usertime: any;
  destinationtakwa ='Tarkwa Bay, Lagos, Nigeria'
  destinationvi = 'cms bus stop nigeria';
   directionsService = new google.maps.DirectionsService();

   directionsDisplayy = new google.maps.DirectionsRenderer();

  constructor(public navCtrl: NavController,private toastCtrl: ToastController, public loadingCtrl: LoadingController,private alertCtrl: AlertController, public platform: Platform, private Service: MyserviceProvider, private storage: Storage, public geolocation: Geolocation) {

    this.storage.get('touristname').then(data=>
      {
        if(data)
        {
       this.user = data

        }
        else {
          console.log("not logedin");
             }

        });

  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      // this.user = localStorage.getItem('touruser');

      this.loadMap();
  });

  }

  ionViewDidLoad() {
    // let str = '1437203995000';
    // str = str.toString();
    // console.log("Original data: ",str);
    // str = str.slice(0, -3);
    // // str = parseInt(str);
    // console.log("After truncate: ",str);
  //  this.welcometotakwabay();

  }



  loadMap(){

let myLatLngg = new google.maps.LatLng(3.4447962,  6.1653944);
let mapOptions = {
  center: myLatLngg,
  zoom: 15,
  disableDefaultUI: true,
  mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  var polylineOptionsActual = new google.maps.Polyline({
    strokeColor: '#87cefa',

    strokeWeight: 3
    });
 //this.addMarker(latLng);
 // hide the default A B route icon of the direction api
 this.directionsDisplayy.setOptions(

  {suppressMarkers: true, polylineOptions: polylineOptionsActual}

  );

  this.directionsDisplayy.setMap(this.map);
  this.pushtofirebase() ;
  // setInterval(() =>
  //   {

  //    }, 60000);

}



pushtofirebase() {

  this.loadingctr = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Loading Takwabay...'
  });


  let options: GeolocationOptions= {
    enableHighAccuracy : true
  };
  this.loadingctr.present().then(() => {
  this.getdevicepostion = this.geolocation.getCurrentPosition(options).then
      // .filter((p) => p.coords !== undefined) //Filter Out Errors
      (position => {
  //console.log(position.coords.longitude + ' ' + position.coords.latitude);
  console.log(position);
  // let myLatLngg = new google.maps.LatLng({lat: 3.4447962, lng: 6.1653944});
   let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


  if(latLng) {
    this.reversegeocodingmylocation(latLng);
  }

  var pusharray = [];
  pusharray.push(latLng);
  console.log(pusharray);
  if(latLng!= null) {
    console.log(latLng);
    this.addMarker(latLng);
  }
  this.loadingctr.dismiss();
  }, (err) => {
  console.log(err);
  });

});
}


reversegeocodingmylocation(mylatlng: any) {
  // let latLng = new google.maps.LatLng(this.lat, this.long);
  var geocoder = new google.maps.Geocoder;
  geocoder.geocode({'location': mylatlng}, (results, status) => {
    if (status === 'OK') {

    if(results[0]) {

       this.addressme = results[0].formatted_address;
      this.calculateAndDisplayRoutebus(this.directionsDisplayy, this.addressme );
      console.log(this.addressme);

      this.harraytoast('bluecolor', 'your current location: '+this.addressme, 'top')
    }

    else {
      // console.log(this.addressme);
      //window.alert('No results found');
    }
    console.log(this.addressme);
    // console.log(this.addressme);
    }

    else {
      //   window.alert('Geocoder failed due to: ' + status);
      }
  });
}


  addMarker(latlong){
  //  let latLng = new google.maps.LatLng(3.3632583, 6.5697245);
    //var old = new google.maps.LatLng(3.5676755, 6.1976744);

    if (this.marker !== undefined || this.marker !== null) {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
       this.markers = [];
      }

      }


   this.marker = new google.maps.Marker({
      position: latlong,
      title: 'God is goood always',
      snippet: 'good',
      icon: {

        url: "http://thewinehouseng.com/nudrivefile/destination.png",
        scaledSize: new google.maps.Size(5, 5), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor

        },
      map: this.map,
      duration: 2000,
      easing: "easeOutExpo",
       animation: google.maps.Animation.DROP,
      // icon: {
      //   path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      //   scale: 5,
      //   rotation: 30
      // },
       draggable: true
      // map: this.map,
    });

    //this.markers.push(this.marker);
    let content = this.addressme;
      // this.marker.showInfoWindow();
    this.addInfoWindow(this.marker, content);
    //this.marker.setPosition(latlong);
   // this.map.setCenter(latlong);

     let myLatLngg = new google.maps.LatLng(4.4447962, 6.1653944);
    // let allbound = [[latlong],[myLatLngg] ];


  //  let bounds= new google.maps.LatLngBounds(allbound);

 //  console.log(pusharray);
   // bounds.extend(myLatLng);
   //this.map.setCameraTarget(this.pushallmarkerposition);

  //  this.map.animateCamera({
  //    'target': bounds,
  //    'tilt': 60,
  //    'zoom': 18,
  //    'bearing': 140,
  //    'duration': 2000
  //      });


   }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    // infoWindow.open(this.map, marker);
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });




  }

  ionViewDidLeave() {
   this. loadingctr.dismiss();
    this.getdevicepostion.unsubscribe();
  }



  logout () {


        this.storage.remove('touruser').then(() => {
          console.log('username has been removed');
          this.navCtrl.setRoot(LoginPage);
          this.loggedin = false;
          this.successtoast('succescolor','Logged out Successfully!', 'top');
        });


  }




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



newrequestalert() {
  let alert = this.alertCtrl.create({
    title: 'Hurray!!!',
    subTitle: 'Welcome To TakwaBay!',
    buttons: [ {
      text: 'Go To Map',
      role: 'destructive',
      handler: () => {
        console.log('Destructive clicked');
        this.navCtrl.pop();
        this.navCtrl.setRoot(HomePage);
      }
    }],
    enableBackdropDismiss: false
  });
  alert.present();
}



addInfoWindowpolyline(marker, content){

  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
  infoWindow.open(this.map, marker);
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);

  });

}



calculateAndDisplayRoutebus(directionway: any, addressuser:any) {


var starticon ={

url: 'http://thewinehouseng.com/nudrivefile/mapuser.png',
scaledSize: new google.maps.Size(35, 35), // scaled size
origin: new google.maps.Point(0,0), // origin
anchor: new google.maps.Point(0, 0) // anchor
}

var endicon ={


  url: 'http://thewinehouseng.com/nudrivefile/kolladestination.png',
  scaledSize: new google.maps.Size(35, 35), // scaled size
  origin: new google.maps.Point(0,0), // origin
  anchor: new google.maps.Point(0, 0) // anchor
  }

var request = {
  origin: addressuser,
    destination: this.destinationvi,
    travelMode: 'DRIVING'
};



this.directionsService.route(request, (result, status) => {



  directionway.setDirections(result);
    console.log(result.routes[0].legs[0].distance.text);
    console.log(result.routes[0].legs[0].duration.text);
    if(result!= null && result!= undefined ) {
     this.showbutton = true;
     this.userdistance = result.routes[0].legs[0].distance.text;
     this.usertime = result.routes[0].legs[0].duration.text;

     var leg = result.routes[ 0 ].legs[ 0 ];
     this.makeMarker( leg.start_location, starticon, 'You: '+ addressuser );
     this.makeMarker( leg.end_location, endicon, 'Destination: '+ this.destinationvi );

     this.map.setCenter(leg.start_location);

    }

});
 }

 makeMarker( position, icon, title ) {
  var markerloc =   new google.maps.Marker({
      position: position,
      map: this.map,
      icon: icon,
      title: title
     });

     // Add circle overlay and bind to marker
    //  var circle = new google.maps.Circle({
    //  map: this.map,
    //  radius: 500,    // 10 miles in metres
    //  fillColor: '#fff'
    //  });
    //  circle.bindTo('center', markerloc, 'position');
    this.addInfoWindowpolyline(markerloc, title);
    }

welcometotakwabay() {
  let str = '1437203995000';
    str = str.toString();
    console.log("Original data: ",str);
    str = str.slice(0, -3);
    let strr = parseInt(str);
    let strr2 = parseInt('1437203995');
    console.log("After truncate: ",str);
    this.harraytoast('bluecolor',"hurray you are <br/> now in takwabay", 'top');
  if(strr == strr2 ) {
    this.newrequestalert();
  }
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

    harraytoast(colrtype, message, position) {
      let toast = this.toastCtrl.create({
        message: message,
        cssClass: colrtype,
        position: position,
        duration: 5000,
        showCloseButton: true,
        closeButtonText:'X'
      });

      toast.present();
    }



    closeddriverdetails () {
      this.showbutton = false;
    }
}

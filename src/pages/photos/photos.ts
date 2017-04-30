import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Camera, Transfer, ImagePicker } from 'ionic-native';

import { TournamentData } from '../../providers/tournamentData';

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html'
})
export class Photos {

	imageSrc: string;
	counter: number;

	tournamentData: TournamentData;

  constructor(public navCtrl: NavController,
  						public _tData: TournamentData) {
  	this.tournamentData = _tData;

    this.imageSrc = "";
    this.counter = 0;
  }

  openCamera(){
	  let cameraOptions = {
	    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
	    destinationType: Camera.DestinationType.FILE_URI,      
	    quality: 100,
	    targetWidth: 1000,
	    targetHeight: 1000,
	    encodingType: Camera.EncodingType.JPEG,      
	    correctOrientation: true
	  }
	  Camera.getPicture(cameraOptions)
	    .then(file_uri => this.uploadImage(file_uri),
	    err => {
	    	console.log(err);
	    	alert(err);
	    });   
	}

	getImage(){

		return ImagePicker.getPictures({
			quality: 100,
			maximumImagesCount: 15
		}).then((imageUrls) => {
			alert(imageUrls);
			return imageUrls;
		}, (err) => {                              
      if(err.error == "cordova_not_available") {               
          alert("Cordova is not available, please make sure you have your app deployed on a simulator or device");                                   
      } else {                
          alert("Failed to open albums: " + err.error);
      }
		})
	}

	uploadImage(image){
		alert("uploading image " + image);
		let ft = new Transfer();
    let filename = "test-image-upload.jpg";
    let options = {
        fileKey: 'file',
        fileName: filename,
        mimeType: 'image/jpeg',
        chunkedMode: false,
        headers: {
            'Content-Type' : undefined
        },
        params: {
            fileName: filename,
            author: 'giovanni',
            text: 'questo è un testo abbastanza lungo giusto per provare...'
        }
    }; 
    //ft.onProgress(this.onProgress);
    ft.upload(image, "http://192.168.1.104:3000/testUpload", options, false)
	    .then((result: any) => {
	      this.success(result);
	    }, (err) => {
	    	this.failed(err);
	    }); 
	}

	onProgress(){
		this.counter += 1;
		alert("progressing " + this.counter );
	}

	success(result){
		alert("SUCCESS " + result );
	}

	failed = (err: any) : void => {
    let code = err.code;
    alert("Failed to upload image. Code: " + code);
    alert(err);
  }

}
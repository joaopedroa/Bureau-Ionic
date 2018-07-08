import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController  } from 'ionic-angular';

import {ServicesProvider} from '../../providers/services/services';
import {User} from '../../providers/user';

import { AngularFireAuth } from 'angularfire2/auth';

import {HomePage} from '../home/home';




@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})


export class LoginPage {

  typePageRegister:boolean = false;
  messageFooter:string = 'Não possui conta?';
  messageLink:string = 'Cadastre-se';
  messageHome:string = 'Bem Vindo!';
  user = {} as User;

  constructor(
          public navCtrl: NavController,
          public navParams: NavParams,
          private service:ServicesProvider,
          public loadingCtrl: LoadingController,
          private toastCtrl: ToastController,
          private fire:AngularFireAuth
        
        ) {
  }

  ionViewDidLoad() {
   
  }

  goRegisterOrLogin(){
    if(!this.typePageRegister){
    this.typePageRegister = true;
    this.messageFooter = 'Já possui conta?';
    this.messageLink = 'Entre';
    this.messageHome = 'Cadastre-se';
    }
    else{
      this.typePageRegister = false;
      this.messageFooter = 'Não possui conta?';
      this.messageLink = 'Cadastre-se';
      this.messageHome = 'Bem Vindo!';
    }
  }

  signIn(){
    
    if(Object.keys(this.user).length >= 2){
     
      let loading = this.loadingCtrl.create({
        showBackdrop: true,
        content: `Fazendo login...`
      });
      loading.present();

      this.service.emailLogin(this.user)
      .then((authUser:any) => {
       console.log(authUser);
        localStorage.setItem('user', authUser);
       
        this.navCtrl.setRoot(HomePage).then(() => {
          loading.dismiss();
          let toast = this.toastCtrl.create({
            duration: 3000,
            position: "bottom"
          });
          toast.setMessage(`Olá ${authUser.user.displayName}.`);
          toast.present();
        });
      })
      .catch((error: any) => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          duration: 3000,
          position: "bottom"
        });

        if (error.code == "auth/invalid-email") {
          toast.setMessage("O endereço de e-mail não é válido.");
        }

        if (error.code == "auth/user-disabled") {
          toast.setMessage(
            "O endereço de email pode ter sido desativado."
          );
        }

        if (error.code == "auth/user-not-found") {
          toast.setMessage(
            "Email não está cadastrado no sistema."
          );
        }

        if (error.code == "auth/wrong-password") {
          toast.setMessage(
            "Endereço de email ou senha inválidos."
          );
        }
        toast.present();
      });
    }
  }

  signUp(){
    if(Object.keys(this.user).length === 3){

        let loading = this.loadingCtrl.create({

          showBackdrop: true,
          content: `Criando conta...`,
          duration: 5000
        });
        loading.present();

        let toast = this.toastCtrl.create({ 
          duration: 3000, position: 'bottom' 
        });

        this.service.createUser(this.user)
        .then((user:any) => {                    
         user.user.sendEmailVerification();
         user.user.updateProfile({displayName: this.user.displayName});        
          this.navCtrl.setRoot(HomePage).then(() => {
            toast.setMessage(`Olá ${this.user.displayName}`);
            loading.dismiss();
            toast.present();
          });
        })
        .catch((error: any) => {
          console.log(error);
          loading.dismiss();
          if (error.code == 'auth/email-already-in-use') {
            toast.setMessage('Este e-mail já está cadastrado.');
          }
          if (error.code == 'auth/weak-password') {
            toast.setMessage('A senha deve possuir mais de 6 caracteres.');
          }
          toast.present();

        })
    }
    
  }
  signInAnonymous(){

    let loading = this.loadingCtrl.create({

      showBackdrop: true,
      content: `Criando conta...`,
      duration: 5000
    });
    loading.present();

    let toast = this.toastCtrl.create({ 
      duration: 3000, position: 'bottom' 
    });

    this.service.anonymousLogin()
    .then((success:any) =>{
        this.navCtrl.setRoot(HomePage).then(() => {
          loading.dismiss();
          let toast = this.toastCtrl.create({
            duration: 3000,
            position: "bottom"
          });
          toast.setMessage("Você entrou no modo anônimo");
          toast.present();
        });
    });
  }
  githubLogin(){
    this.service.githubLogin()
    .then(success => {
        this.navCtrl.setRoot(HomePage);
    })
  }
  
  facebookLogin(){
    this.service.facebookLogin();
  }

  





}

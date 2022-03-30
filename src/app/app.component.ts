import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    /*{ title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },*/
    
    /* { title: 'Login', url: '/login', icon: 'paper-plane' },
    { title: 'Registo', url: '/register', icon: 'paper-plane' },
    { title: 'Esqueci minha senha', url: '/forgot-my-password', icon: 'paper-plane'},
    */

    { title: 'Página Inicial', url: '/main', icon: 'paper-plane' },
    { title: 'Escanear', url: '/scan', icon: 'paper-plane'}
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public isLogged(){
    // localStorage.clear();
    // console.log(localStorage.getItem("UserEmail"));
    return localStorage.getItem("UserEmail") !== null;
  }

  logout(){
    localStorage.removeItem("UserEmail");
    this.navController.navigateRoot("/login");
  }
  
  constructor(private navController: NavController) {}
}

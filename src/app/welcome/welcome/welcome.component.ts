import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
addToCart(arg0: string,arg1: number,arg2: string) {
throw new Error('Method not implemented.');
}
  constructor(private router: Router){}
onClickLogin() {
this.router.navigate(['/login']);
}

}

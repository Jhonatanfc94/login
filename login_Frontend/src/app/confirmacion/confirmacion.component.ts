import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [],
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.css'
})
export class ConfirmacionComponent {
  constructor(private router: Router) {}

  loggout() {
    this.router.navigate(['']);
  }

}

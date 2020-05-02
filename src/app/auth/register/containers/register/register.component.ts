import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error: string

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async registerUser(event: FormGroup) {
        
    const { email, password } = event.value;
    try {
        await this.authService.createUser(email, password);
        this.router.navigate(['/']);
    } catch (err) {
        this.error = err.message
    }        
  }
}

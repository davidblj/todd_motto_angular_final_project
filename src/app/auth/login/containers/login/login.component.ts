import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async loginUser(event: FormGroup) {
        
    const { email, password } = event.value;
    try {
        await this.authService.loginUser(email, password);
        this.router.navigate(['/']);
    } catch (err) {
        this.error = err.message
    }                
  }
}

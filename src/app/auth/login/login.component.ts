import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(
    private uiService: UIService,
    private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  ngOnDestroy() {
    if(this.loadingSubs) this.loadingSubs.unsubscribe();
  }
}

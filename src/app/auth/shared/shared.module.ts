import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { AuthService } from './services/auth.service';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

/* 
do note that we are registering the auth service inside the 'for root' method.
This strategy stops the auth service duplication every time its imported
inside a module. But there is a catch: you need to call the 'for root' method in the
parent module of these modules you are trying to import the shared module on: 

    auth-module             // forRoot invocation
        register-module     // default module declaration
        login-module        // default module declaration
*/

@NgModule({
  declarations: [
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthFormComponent
  ]
})
export class SharedModule {
  
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: SharedModule,
        providers: [
            AuthService
        ]
    }        
  }
}

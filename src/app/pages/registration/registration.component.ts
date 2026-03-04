import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IGX_INPUT_GROUP_DIRECTIVES } from 'igniteui-angular/input-group';
import { IGX_SELECT_DIRECTIVES } from 'igniteui-angular/select';
import { IGX_RADIO_GROUP_DIRECTIVES } from 'igniteui-angular/radio';
import { IgxCheckboxComponent } from 'igniteui-angular/checkbox';

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [
        FormsModule,
        IGX_INPUT_GROUP_DIRECTIVES,
        IGX_SELECT_DIRECTIVES,
        IGX_RADIO_GROUP_DIRECTIVES,
        IgxCheckboxComponent
    ],
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  public fullName?: string;
  public email?: string;
  public password?: string;
  public confirmPassword?: string;
  public phoneNumber?: string;
  public experienceLevel?: string;
  public accountType: string = 'personal';
  public acceptTerms: boolean = false;

  onSubmit() {
    if (this.validateForm()) {
      console.log('Registration data:', {
        fullName: this.fullName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        experienceLevel: this.experienceLevel,
        accountType: this.accountType
      });
      // Add your registration logic here
    }
  }

  onClear() {
    this.fullName = undefined;
    this.email = undefined;
    this.password = undefined;
    this.confirmPassword = undefined;
    this.phoneNumber = undefined;
    this.experienceLevel = undefined;
    this.accountType = 'personal';
    this.acceptTerms = false;
  }

  private validateForm(): boolean {
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      alert('Please fill in all required fields');
      return false;
    }
    
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }

    if (this.password.length < 8) {
      alert('Password must be at least 8 characters');
      return false;
    }

    if (!this.acceptTerms) {
      alert('Please accept the Terms and Conditions');
      return false;
    }

    return true;
  }
}

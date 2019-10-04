import { Component } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { Validators, FormBuilder, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-example-form',
  templateUrl: './example-form.component.html',
  styleUrls: ['./example-form.component.scss']
})
export class ExampleFormComponent {

  @Input() colours;
  constructor(private formBuilder: FormBuilder, private common: CommonService) {}

  public submitted = false;

  //Formbuilder representation of the form - Used for Angular form validation functionality.
  exampleForm = this.formBuilder.group({
    email: [null, [Validators.required, this.validateEmail()]],
    password: ['', [Validators.required, Validators.minLength(9)]],
    colour: ['', Validators.required],
    animal: this.formBuilder.group({
      bear: [false],
      tiger: [false],
      snake: [false],
      donkey: [false],
    }, { validator: this.checkMinAnimals() }),
    typeOfTiger: ['', [this.checkTigerType()]]
  });

  //Shows the user what they submitted.
  onSubmit() {
    this.submitted = true;
    alert(JSON.stringify(this.exampleForm.value));
  }

  //Custom form item validator. Checks that the min number of animals (2) is selected.
  checkMinAnimals(): ValidatorFn {
    
    return (control: AbstractControl): {[key: string]: any} | null => {

      //Maps user selections into an array of booleans.
      var x = Object.keys(control.value).map(function(key) {
        return control.value[key];
      });

      var count = 0;

      //Cycles through mapped array of selected animals and counts them. Returns a validator if count reaches 2.
      for (var v of x) {
        if (v) count++;
        if (count >= 2) return null; 
      }

      //Returns an error object citing the quantity of selected items.
      return { invalidQty: count };
    };
  }

  //Checks that the user has entered a valid value for the tiger type provided that tiger is selected.
  checkTigerType() {
    return (control: AbstractControl): {[key: string]: any} | null => {

      //Checks the parent form group has initialized/is available.
      if(control.parent) {
        //If tiger is selected and is a non-empty string.
        if (control.parent.value.animal.tiger && typeof control.value == 'string' && control.value != '') return null;
        //If tiger is not selected.
        else if (!control.parent.value.animal.tiger) return null;
        else return { invalidTigerType: control.value };
      }
      return { invalidTigerType: "Tiger Selection Not Available." }
    };
  }

  //This is created to demonstrate use of a custom service (commonService). There is a built in validator for email (Validators.email) which
  //I am ignoring in this demo. 
  validateEmail() {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (this.common.validateEmail(control.value)) return null;
      else return { invalidEmail: control.value };
    };
  }

  //Returns true if the box for Tiger is checked.
  tigerSelected() {
    if (this.exampleForm.value.animal.tiger) return true;
    else return false;
  }

}

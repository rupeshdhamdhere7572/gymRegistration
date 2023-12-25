import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  public packages: string[] = ['Monthly', 'Quarterly', 'Yearly'];
  public genders: string[] = ['Male', 'Female'];
  public importantLists: string[] = [
    'Toxic Fat Reduction',
    'Energry and Endurence',
    'Building lean Muscle',
    'Healthier Digestive System',
    'Sugar Craving Body',
    'Fitness',
  ];

  public registerForm!: FormGroup;
  public userIdToUpdate!:number
  public isUpdateActive:boolean=false
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastservice: NgToastService
  ) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      Weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requiredTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });
    this.registerForm.controls['height'].valueChanges.subscribe((res) => {
      this.calculateBmi(res);
    });
    this.activatedRoute.params.subscribe(val=>{
      this.userIdToUpdate=val['id']
      console.log(val)
      this.api.getRegisteredUserId(this.userIdToUpdate).subscribe(res=>{
        this.isUpdateActive=true
        this.fillFormToUpdate(res)

      })
    })
  }
  onSubmit() {
    this.api.postRegistration(this.registerForm.value).subscribe((res) => {
      this.toastservice.success({
        detail: 'success',
        summary: 'Enquiry Added',
        duration: 3000,
      });
      this.registerForm.reset();
    });
  }
  update(){
    this.api.updateRegisterUser(this.registerForm.value,this.userIdToUpdate).subscribe((res) => {
      this.toastservice.success({
        detail: 'success',
        summary: 'Enquiry Updated',
        duration: 3000,
      });
      this.registerForm.reset();
      this.router.navigate(['list'])
    });
  }

  fillFormToUpdate(user:User){
    this.registerForm.setValue({
      firstName:user.firstName,
      lastName: user.lastName,
      email:user.email,
      mobile:user.mobile,
      Weight:user.Weight, 
      height:user.height, 
      bmi:user.bmi,
      bmiResult:user.bmiResult, 
      gender:user.gender,
      requiredTrainer:user.requiredTrainer, 
      package:user.package, 
      important:user.important, 
      haveGymBefore:user.haveGymBefore,
      enquiryDate:user.enquiryDate,
      id:user.id
    })

  }
  calculateBmi(heightvalue: number) {
    const weight = this.registerForm.value.height;
    const height = heightvalue;
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue('underweight');
        break;

      case bmi >= 18.5 && bmi < 25:
        this.registerForm.controls['bmiResult'].patchValue('Normal');
        break;

      case bmi >= 25 && bmi < 30:
        this.registerForm.controls['bmiResult'].patchValue('Overrweight');
        break;

      default:
        this.registerForm.controls['bmiResult'].patchValue('obese');
        break;
    }
  }
}

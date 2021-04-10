import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  completedTest: boolean = false; // set to false once test has been complete
  isLinear: boolean = true;
  finalScore: number;

  homeSizeControl = new FormControl('0');
  foodChoiceControl = new FormControl('0');
  peopleControl = new FormControl('0');
  wasteControl = new FormControl('0');
  dishwasherControl = new FormControl('0');
  washingMachineControl = new FormControl('0');
  showerLengthControl = new FormControl('0');
  milesDrivenControl = new FormControl('0');
  electricityControl = new FormControl('0');

  allControls = [
    this.homeSizeControl,
    this.foodChoiceControl,
    this.peopleControl,
    this.wasteControl,
    this.dishwasherControl,
    this.washingMachineControl,
    this.showerLengthControl,
    this.milesDrivenControl,
    this.electricityControl
  ]

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  recycleItems: Array<any> = [
    {name: 'Glass', selected: false},
    {name: 'Plastic', selected: false},
    {name: 'Paper', selected: false},
    {name: 'Aluminum', selected: false},
    {name: 'Steel', selected: false},
    {name: 'Compost', selected: false}
  ]

  scoreMap = {
    electricity: {
      "12": 1000,
      "10": 850,
      "6": 550,
      "4": 400
    },
    miles: {
      "12": 15000,
      "10": 12500,
      "6": 5000,
      "4": 1000
    },
    shower: {
      "15": 30,
      "10": 20,
      "5": 10,
      "1": 5
    },
    garbage: {
      "50": 4,
      "40": 3,
      "30": 2,
      "20": 1,
      "5": 0
    }
  }

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }


  test() {
    console.log(this.recycleItems);
    console.log("Home size control", this.homeSizeControl.value)
    console.log(this.calculateScore());
    this.finalScore = this.calculateScore();
    this.completedTest = true;
  }

  resetTest() {
    this.completedTest = false;
  }

  finishTest() {
    this.finalScore = this.calculateScore();
    this.completedTest = true;
  }

  calculateScore(): number {
    return this.allControls
      .reduce((accu, curr) => accu + parseFloat(curr.value), 0) + (24 - 4 * this.recycleItems.filter(x => x.selected).length);
  }

  optimizeScore() {
    scoreMap.electricity[this.electricity.value]
  }
}

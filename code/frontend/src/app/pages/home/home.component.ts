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
  optimizedChoices: Array<number> = [];

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
      "12": 200,
      "10": 100,
      "6": 0,
      "4": 0,
      "0": 0
    },
    miles: {
      "12": 2000,
      "10": 1500,
      "6": 0,
      "4": 0,
      "0": 0
    },
    shower: {
      "15": 5,
      "10": 5,
      "5": 0,
      "1": 0,
      "0": 0
    },
    garbage: {
      "50": 1,
      "40": 1,
      "30": 1,
      "20": 0,
      "5": 0,
      "0": 0
    },
    food: {
      "0": 0,
      "2": 0,
      "4": 0,
      "8": 0,
      "10": 1
    },
    washingMachine: {
      "4": 3,
      "3": 2,
      "2": 1,
      "1": 0,
      "0": 0
    },
    dishWasher: {
      "4": 3,
      "3": 2,
      "2": 1,
      "1": 0,
      "0": 0
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
    this.recycleItems = [
      {name: 'Glass', selected: false},
      {name: 'Plastic', selected: false},
      {name: 'Paper', selected: false},
      {name: 'Aluminum', selected: false},
      {name: 'Steel', selected: false},
      {name: 'Compost', selected: false}
    ];
    this.homeSizeControl = new FormControl('0');
    this.foodChoiceControl = new FormControl('0');
    this.peopleControl = new FormControl('0');
    this.wasteControl = new FormControl('0');
    this.dishwasherControl = new FormControl('0');
    this.washingMachineControl = new FormControl('0');
    this.showerLengthControl = new FormControl('0');
    this.milesDrivenControl = new FormControl('0');
    this.electricityControl = new FormControl('0');
  }

  finishTest() {
    this.finalScore = this.calculateScore();
    this.optimizedChoices = this.optimizeScore();
    this.completedTest = true;
  }

  calculateScore(): number {
    return this.allControls
      .reduce((accu, curr) => accu + parseFloat(curr.value), 0) + (24 - 4 * this.recycleItems.filter(x => x.selected).length);
  }

  optimizeScore(): Array<number> {
    return [
      this.scoreMap.shower[this.showerLengthControl.value],
      parseInt((this.scoreMap.miles[this.milesDrivenControl.value]/52).toString()),
      this.scoreMap.food[this.foodChoiceControl.value],
      this.scoreMap.garbage[this.wasteControl.value],
      this.scoreMap.electricity[this.electricityControl.value],
      this.scoreMap.dishWasher[this.dishwasherControl.value] + this.scoreMap.washingMachine[this.washingMachineControl.value],
    ]
  }
}

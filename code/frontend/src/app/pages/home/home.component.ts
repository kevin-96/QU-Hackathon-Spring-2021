import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  completedTest: boolean = true; // set to false once test has been complete

  constructor() { }

  ngOnInit(): void {

  }



}

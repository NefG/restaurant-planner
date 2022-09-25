import { Component, OnInit } from '@angular/core';
import { FloorPlan, ComponentList } from '../plateup';

@Component({
  selector: 'nf-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  public componentList:ComponentList = new ComponentList();
  public floorPlan:FloorPlan = new FloorPlan();

  public constructor() {

  }

  ngOnInit(): void {}
  
}

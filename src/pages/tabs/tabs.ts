import { Component, ViewChild } from '@angular/core';

import { Tabs, NavController } from 'ionic-angular';
import { TripsPage } from '../trips/trips';
import { CategoriesPage } from '../categories/categories';
import { MessagesPage } from '../messages/messages';
import { ProfilePage } from '../profile/profile';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage { 

  HomePage       = TripsPage;
  CategoriesPage  = CategoriesPage;
  MessagesPage       = MessagesPage;
  AdoutPagesPage = TripsPage;
  ProfilePage=ProfilePage;

  @ViewChild('myTabs') tabRef: Tabs;


  constructor(public navCtrl: NavController) {
    
  }
  tabChanged($ev) {
    //$ev.popToRoot();
  }
}

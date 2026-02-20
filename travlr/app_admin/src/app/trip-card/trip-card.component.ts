import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';
import { TripListingComponent } from '../trip-listing/trip-listing.component';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit  {

  @Input('trip') trip: Trip;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tripListing: TripListingComponent,) { }

  ngOnInit(): void {
    
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

   editTrip(trip: Trip): void {
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']);    
  }

  deleteTrip(trip: Trip): void {
    localStorage.removeItem("tripCode");
    this.router.navigate(['delete-trip']);
    this.tripListing.deleteTrip(trip);
  }
}
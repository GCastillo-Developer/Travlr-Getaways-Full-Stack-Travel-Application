import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"; 
import { Router } from "@angular/router"; 
import { TripDataService } from '../services/trip-data.service'; 

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent implements OnInit {

  deleteForm: FormGroup; 
  submitted = false; 

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private tripService: TripDataService) { }

  ngOnInit() {

    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) { 
      alert("Something wrong, couldn't find where I stashed tripCode!"); 
      this.router.navigate(['']); 
      return; 
    } 

    this.deleteForm = this.formBuilder.group({ 
      code: [tripCode, Validators.required] // Assuming the trip code is required for deletion
    });
    
  }

  onSubmit() { 
    this.submitted = true; 
    if (this.deleteForm.valid) { 
      const tripCode = this.deleteForm.value.code;
      this.tripService.deleteTrip(tripCode) 
        .then(data => { 
          console.log(data); 
          alert("Trip was deleted");
          this.router.navigate(['']); 
        })
      } 
    }
}

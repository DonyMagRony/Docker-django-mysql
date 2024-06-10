import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Region, Store } from '../models';
import { StoresService } from '../services/stores.service';
import { RegionsService } from '../services/regions.service';
import { StoreDetailsComponent } from '../store-details/store-details.component';
@Component({
    selector: 'app-store',
    standalone: true,
    templateUrl: './store.component.html',
    styleUrl: './store.component.css',
    imports: [NgFor, NgIf, RouterOutlet, RouterModule, FormsModule, StoreDetailsComponent]
})
export class StoreComponent implements OnInit {

  // Array to store retrieved stores
  stores: Store[] = [];

  // New store name (user input for creating a new store)
  newStoreName: string = '';

  // Optional parent region for the new store (nullable to allow creation anywhere)
  newStoreLocation: Region | null = null;

  // Array to store retrieved regions (used for displaying location selection)
  regions: Region[] = [];

  constructor(
    private storeService: StoresService,
    private regionService: RegionsService
  ) {}

  ngOnInit(): void {
    // Fetch regions for location selection dropdown
    this.getRegions();

    // Fetch stores to display in the component
    this.getStores();
  }

  getRegions() {
    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    });
  }

  getStores() {
    this.storeService.getStores().subscribe(stores => {
      this.stores = stores;

      // You can add logic to process each store after fetching them (optional)
      // this.stores.forEach(store => {
      //   // Do something with each store
      // });
    });
  }

  addStore() {
    const newStoreData = {
      name: this.newStoreName,
      // Set location to the parent region's ID if provided, otherwise null
      location: this.newStoreLocation ? this.newStoreLocation.id : null
    };

    this.storeService.createStore(newStoreData).subscribe(
      () => {
        // Reload stores after adding a new one to reflect changes
        this.getStores();

        // Reset the form fields after successful creation
        this.newStoreName = '';
        this.newStoreLocation = null;
      },
      error => console.error(error)
    );
  }
}

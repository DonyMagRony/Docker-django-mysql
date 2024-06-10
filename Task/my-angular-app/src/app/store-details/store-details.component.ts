import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoresService } from '../services/stores.service';
import { Region, Store } from '../models';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegionsService } from '../services/regions.service';

@Component({
  selector: 'app-store-details',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, FormsModule],
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent implements OnInit {

  // Optional store data passed from parent component (e.g., `app-store`)
  @Input() store: Store | undefined;

  // Array to store retrieved regions (used for displaying location selection)
  regions: Region[] = [];

  // New store name for potential updates (user input)
  newStoreName: string = '';

  // New store location ID (user input)
  newStoreLocation: number = 0;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoresService,
    private regionService: RegionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check for store ID in route parameters (if component is accessed directly)
    this.route.paramMap.subscribe(params => {
      const storeId = params.get('id');
      if (storeId) {
        this.getStore(parseInt(storeId, 10));
      }
    });

    // Regardless of route parameters, fetch regions for location selection
    this.getRegions();
  }

  getRegions() {
    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    });
  }

  getStore(id: number) {
    this.storeService.getStore(id).subscribe(store => {
      this.store = store;
    });
  }

  delete() {
    // Ensure store ID exists before deletion
    if (this.store?.id !== undefined) {
      this.storeService.deleteStore(this.store.id).subscribe(() => {
        this.router.navigate(['/store/']);
      });
    }
  }

  update() {
    // Ensure store object is defined before update
    if (!this.store) return;

    const updatedStore: Store = {
      // Update store data based on user input (name and location)
      id: this.store.id,
      name: this.newStoreName !== '' ? this.newStoreName : this.store.name,
      location: this.newStoreLocation !== 0 ? this.newStoreLocation : this.store.location
    };

    this.storeService.updateStore(this.store.id!, updatedStore).subscribe(
      () => {
        // Refetch store details after update (optional for real-time UI updates)
        if (this.store?.id !== undefined) {
          this.getStore(this.store.id!);
        }

        // Clear form fields after successful update
        this.newStoreName = '';
        this.newStoreLocation = 0;

        // Consider using a service or behavior subject to notify parent component
        // about changes instead of window.location.reload()
        window.location.reload();
      },
      error => console.error(error)
    );
  }

  getLocationName(id: number): string {
    const region = this.regions.find(region => region.id === id);
    return region ? region.name : 'Unknown';
  }

  // Check if the current route is for a specific store detail
  isStoreRoute(): boolean {
    // Leverage route snapshot to check for specific URL patterns
    return this.route.snapshot.url[0]?.path === 'store' && !!this.route.snapshot.params['id'];
  }
}

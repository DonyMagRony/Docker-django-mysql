import { Component, Input, OnInit } from '@angular/core';
import { User, Region, Store } from '../models';
import { UsersService } from '../services/users.service';
import { RegionsService } from '../services/regions.service';
import { StoresService } from '../services/stores.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [NgIf, NgFor,FormsModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {

  // Optional user data passed from parent component (e.g., `app-user`)
  @Input() user: User | undefined;

  // User data for updates (bound to form fields)
  updatedName: string = '';
  updatedLocation: number = 0;
  updatedStores: number[] = [];

  // Derived data from user object
  regionName: string = '';
  storeNames: string[] = [];

  // Arrays to store retrieved regions and stores
  regions: Region[] = [];
  stores: Store[] = [];

  constructor(
    private userService: UsersService,
    private regionService: RegionsService,
    private storeService: StoresService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check for user ID in route parameters (if component is accessed directly)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getUser(parseInt(id, 10));
      }
    });

    // Regardless of route parameters, fetch regions and stores for display options
    this.getRegions();
    this.getStores();
  }

  getUser(id: number): void {
    this.userService.getUser(id).subscribe(data => {
      this.user = data;
      if (this.user) {
        // Fetch region name based on user's location ID (if provided)
        this.getRegionName(this.user.location);
        // Fetch store names based on user's associated store IDs (if provided)
        this.getStoreNames(this.user.stores);
      }
    });
  }

  getRegionName(regionId: number | undefined): void {
    if (regionId !== undefined) {
      this.regionService.getRegion(regionId).subscribe(region => {
        this.regionName = region.name;
      });
    }
  }

  getStoreNames(storeIds: number[] | undefined): void {
    if (storeIds !== undefined) {
      this.storeNames = [];
      storeIds.forEach(id => {
        this.storeService.getStore(id).subscribe(store => {
          this.storeNames.push(store.name);
        });
      });
    }
  }

  delete(): void {
    if (this.user?.id !== undefined) {
      this.userService.deleteUser(this.user.id).subscribe(() => {
        this.router.navigate(['/user/']);
      });
    }
  }

  update(): void {
    if (!this.user) {
      return; // Exit the function if user is not defined
    }

    const updatedUser: User = {
      id: this.user.id,
      name: this.updatedName || this.user.name, // Use updated name or original name if not provided
      location: this.updatedLocation,
      stores: this.updatedStores
    };

    if (this.user.id) {
      this.userService.updateUser(this.user.id, updatedUser).subscribe(
        () => {
          // Update successful, reset the update variables
          this.updatedName = '';
          this.updatedLocation = 0;
          this.updatedStores = [];
        },
        error => console.error('Error updating user:', error)
      );
    }

    // Consider using a service or behavior subject to notify parent component
    // about changes instead of window.location.reload()
    window.location.reload();
  }

  getRegions() {
    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    });
  }

  getStores() {
    this.storeService.getStores().subscribe(store => {
      this.stores = store; // Might be a typo, consider using 'stores' consistently
    });
  }
}

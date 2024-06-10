import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RegionsService } from '../services/regions.service';
import { Region, Store, User } from '../models';
import { UsersService } from '../services/users.service';
import { StoresService } from '../services/stores.service';
import { UserDetailsComponent } from "../user-details/user-details.component";

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
    imports: [NgFor, NgIf, RouterOutlet, RouterModule, FormsModule, UserDetailsComponent]
})
export class UsersComponent {

  // Array to store retrieved user data
  users: User[] = [];

  // Object representing a new user for creation
  newUser: User = {
    name: '',
    location: 0,
    stores: [],
  };

  // Arrays to store retrieved region and store data (for display options)
  regions: Region[] = [];
  stores: Store[] = [];

  constructor(
    private userService: UsersService,
    private regionService: RegionsService,
    private storeService: StoresService
  ) {}

  ngOnInit(): void {
    // Fetch users, regions, and stores on component initialization
    this.getUsers();
    this.getRegions();
    this.getStores();
  }

  getUsers(): void {
    // Get users from the UsersService and update the users array
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  createUser(): void {
    // Prepare a payload object with user data
    const payload = {
      name: this.newUser.name,
      location: this.newUser.location,
      stores: this.newUser.stores.map(store => store), // Copy store references
    };

    console.log('Payload:', payload); // Log payload for debugging (optional)

    // Call the user service to create the user on the backend
    this.userService.createUser(payload).subscribe(
      newUser => {
        // On successful creation, add the new user to the users array
        // and reset the newUser object for the next user
        this.users.push(newUser);
        this.newUser = {
          name: '',
          location: 0,
          stores: [],
        };
      },
      error => {
        console.error('Error creating user:', error); // Handle errors
      }
    );
  }

  getRegions(): void {
    // Get regions from the RegionsService and update the regions array
    this.regionService.getRegions().subscribe((data) => {
      this.regions = data;
    });
  }

  getStores(): void {
    // Get stores from the StoresService and update the stores array
    this.storeService.getStores().subscribe((stores) => {
      this.stores = stores;
    });
  }
}

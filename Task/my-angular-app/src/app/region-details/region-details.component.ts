import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RegionsService } from '../services/regions.service';
import { Region } from '../models';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-region-details',
  standalone: true,
  imports: [NgIf,NgFor,RouterModule,RouterModule,FormsModule],
  templateUrl: './region-details.component.html',
  styleUrl: './region-details.component.css'
})
export class RegionDetailsComponent implements OnInit {

  // ID of the region to display details for (extracted from route)
  id: number = 0;

  // Current region data (populated from the API)
  region: Region = {
    id: 0,
    name: '',
    location: 0,
  };

  // Array to store all retrieved regions (used for displaying location name)
  regions: Region[] = [];

  // New region name for potential updates (user input)
  newRegionName: string = '';

  // Optional parent region for the new region to be located under (nullable)
  newRegionLocation: Region | null = null;

  constructor(
    private route: ActivatedRoute,
    private regionService: RegionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameters to retrieve the region ID
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));

      // If an ID is provided, fetch the specific region details
      if (this.id) {
        this.getRegion();
      }

      // Regardless of ID, fetch the complete list of regions (used for location name lookup)
      this.getRegions();
    });
  }

  getRegion() {
    // Fetch a specific region by its ID from the RegionsService
    this.regionService.getRegion(this.id).subscribe(region => {
      this.region = region;
    });
  }

  getRegions() {
    // Fetch all regions from the RegionsService
    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    });
  }

  delete() {
    // Delete the current region using the RegionsService
    this.regionService.deleteRegion(this.id).subscribe(() => {
      // After successful deletion, navigate back to the region list view
      this.router.navigate(['/region/']);
    });
  }

  update() {
    const newRegionData = {
      name: this.newRegionName,
      // Set location to the parent region's ID if provided, otherwise null
      location: this.newRegionLocation ? this.newRegionLocation.id : null
    };

    // Update the current region using the RegionsService
    this.regionService.updateRegion(this.id, newRegionData).subscribe(
      () => {
        // After successful update, refetch region details and clear form fields
        this.getRegion();
        this.newRegionName = '';
        this.newRegionLocation = null;
      },
      error => console.error(error)
    );
  }

  getLocationName(id: number): string {
    // Find the region with the given ID from the regions array
    const region = this.regions.find(region => region.id === id);
    // Return the region name if found, otherwise "Unknown"
    return region ? region.name : 'Unknown';
  }
}
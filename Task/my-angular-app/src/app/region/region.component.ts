import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RegionsService } from '../services/regions.service';
import { Region } from '../models';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgFor, FormsModule],
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  // Array to store retrieved regions
  regions: Region[] = [];

  // Array to represent regions in a hierarchical tree structure
  regionTreeMap: { region: Region; depth: number }[] = [];

  // New region name (user input for creating a new region)
  newRegionName: string = '';

  // Optional parent region for the new region (nullable to allow creation at root level)
  newRegionLocation: Region | null = null;

  constructor(private regionService: RegionsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Fetch regions on component initialization
    this.getRegions();
  }

  getRegions(): void {
    this.regionService.getRegions()
      .subscribe(
        data => {
          // Ensure regions is always an array, even if the API response is empty
          this.regions = data || [];

          // Build the region tree map for hierarchical display
          this.regionTreeMap = this.buildRegionTree();

          // Log the built region tree map for debugging purposes
          console.log('Built region tree map:', this.regionTreeMap);

          // Trigger change detection to update the view with new data
          this.cdr.detectChanges();
        },
        error => console.error(error)
      );
  }

  buildRegionTree(): { region: Region; depth: number }[] {
    const regionList: { region: Region; depth: number }[] = [];

    // Filter regions that represent root nodes (no parent location)
    const rootRegions = this.regions.filter(r => !r.location);

    // Log root regions for debugging
    console.log('Root regions:', rootRegions);

    // Recursive function to traverse and build the region tree
    const addRegionWithChildren = (region: Region, depth: number): void => {
      regionList.push({ region, depth });

      // Filter child regions based on current region's ID
      const children = this.regions.filter(r => r.location === region.id);

      // Recursively add child regions to the tree, incrementing depth for each level
      children.forEach(child => addRegionWithChildren(child, depth + 1));
    };

    // Start tree building from root regions
    rootRegions.forEach(root => addRegionWithChildren(root, 0));

    return regionList;
  }

  addRegion(): void {
    const newRegionData = {
      name: this.newRegionName,
      // Set location to the parent region's ID if provided, otherwise null
      location: this.newRegionLocation ? this.newRegionLocation.id : null
    };

    this.regionService.createRegion(newRegionData)
      .subscribe(
        () => {
          // Reload regions after adding a new one to reflect changes
          this.getRegions();

          // Reset the form fields after successful creation
          this.newRegionName = '';
          this.newRegionLocation = null;
        },
        error => console.error(error)
      );
  }
}

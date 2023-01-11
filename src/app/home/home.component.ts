import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Flight } from '../flight.model';
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Flights';

  loading = true;

  flights: Flight[] = [];
  selectedOrigin: string = '';
  selectedDestination: string = '';
  filteredOriginList: any[] = [];
  filteredDestinationList: any[] = [];
  noFlightsFound: boolean = false;

  constructor(private flightService: FlightsService, private titleService: Title) { 
    this.titleService.setTitle('Flights');
  }

  ngOnInit(): void {
    this.flightService.getAllOrigins().subscribe(data => {
      this.filteredOriginList = data;
      this.loading = false;
    });

    this.flightService.getAllDestinations().subscribe(data => {
      this.filteredDestinationList = data;
      this.loading = false;
    });
  }

  query(): void {
    this.noFlightsFound = false;
    const origin = this.selectedOrigin;
    const destination = this.selectedDestination;

    this.flightService.getFlights(origin, destination).subscribe(data => {
      this.flights = data;
      if (data.length === 0) {
        this.noFlightsFound = true;
      }
    })
  }

}

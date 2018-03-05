import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';

import 'rxjs/add/operator/map';
import { fade, slideRight, slideDown } from './../animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fade,
    slideRight,
    slideDown
  ]
})
export class AppComponent {
  title = 'Stock Lookup';

  stocks: Array<any> = [];
  detailClear = true;
  stockDetails: Array<any> = [];
  singleTag: any;
  tags: string;
  error: string;

  constructor(private http: Http) { }

  // Retrieve data from the API
  getData(url) {
    return this.http.get(url)
      .map(response => response.json());
  }

  // Close the detail window
  closeDetail() {
    this.stockDetails = [];
    this.singleTag = null;

    setTimeout(() => {
      this.detailClear = true;
    }, 1000);
  }

  // Get details for single stock
  getStockDetails(singleTag) {

    this.detailClear = false;
    const base = '/api/stocks';
    const url = `${base}/detail/${singleTag}`;

    this.getData(url)
      .subscribe(data => {

        this.singleTag = singleTag;

        setTimeout(() => {
          this.stockDetails = data;
        }, 100);
      });
  }


  onSubmit(e: Event, form: NgForm) {
    e.preventDefault();

    // Clear any previous error message
    this.error = null;

    // Close the detail component
    this.closeDetail();

    // Setup API components
    const base = '/api/stocks';

    // Get tags from user input, trim spaces and convert to uppercase
    let tags = this.tags.toUpperCase();
    tags = tags.replace(/\s+/g, '');

    // Assemble API call
    const url = `${base}/${tags}`;

    // Return the data
    this.getData(url)
      .subscribe(data => {

        this.stocks = data['Stock Quotes'];

        // Display an error message if no stocks were found
        if (this.stocks.length === 0) {
          this.error = 'No tags found!';
        }

        form.resetForm();

      });

  }
}

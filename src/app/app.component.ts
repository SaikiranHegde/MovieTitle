import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '../../node_modules/@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  titles: string[];
  @ViewChild('f') movieForm: NgForm;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.titlesChanged.subscribe(
      (titles: string[]) => {
        this.titles = titles;
      }
    );
  }

  onSubmit() {
    this.appService.getTitles(this.movieForm.value.substr);
    this.movieForm.reset();
  }
}

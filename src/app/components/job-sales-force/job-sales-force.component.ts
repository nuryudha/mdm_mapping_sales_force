import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-job-sales-force',
  templateUrl: './job-sales-force.component.html',
  styleUrls: ['./job-sales-force.component.css'],
})
export class JobSalesForceComponent implements OnInit {
  constructor(private title: Title, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.title.setTitle('Mapping Sales Force');
  }
}

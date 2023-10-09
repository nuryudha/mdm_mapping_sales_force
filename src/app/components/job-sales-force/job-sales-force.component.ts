import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DetailSalesComponent } from './detail-sales/detail-sales.component';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { listAllJob } from 'src/app/models/job-sales-force-models/job-sales-force-models';
import { MainService } from 'src/app/services/main.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-job-sales-force',
  templateUrl: './job-sales-force.component.html',
  styleUrls: ['./job-sales-force.component.css'],
})
export class JobSalesForceComponent implements OnInit {
  constructor(
    private title: Title,
    private dialog: MatDialog,
    private services: MainService
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      this.dataYangDitampilkan_ListAllJob
    );
    this.title.setTitle('Mapping Sales Force');
    this.getListAllJob();
  }

  // @ViewChild(MatPaginator) matPaginator!

  displayedColumns: string[] = ['jobCode', 'jobDesc', 'action'];

  dataSource!: MatTableDataSource<listAllJob>;
  dataYangDitampilkan_ListAllJob: listAllJob[] = [];

  detailJob(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '90%';
    dialogConfig.data = element; // Mengirimkan elemen ke dialog menggunakan properti 'data'
    this.dialog
      .open(DetailSalesComponent, dialogConfig)
      .afterClosed()
      .subscribe(
        (res) => {
          console.log(res);
          if (res == undefined) {
            console.log('data tidak ada');
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getListAllJob() {
    this.dataYangDitampilkan_ListAllJob = []; // biar ga duplikasi saat di refresh
    this.services.getJob('job').subscribe(
      (res) => {
        console.log(res);
        res.body.data.forEach((element: any) => {
          this.dataYangDitampilkan_ListAllJob.push({
            emplJobCode: element.emplJobCode,
            emplJobDesc: element.emplJobDesc,
          });
        });
        this.dataSource = new MatTableDataSource(
          this.dataYangDitampilkan_ListAllJob
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

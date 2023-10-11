import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DetailSalesComponent } from './detail-sales/detail-sales.component';
import { MainService } from 'src/app/services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { listAllJob } from 'src/app/models/job-sales-force-models/job-sales-force-models';

@Component({
  selector: 'app-job-sales-force',
  templateUrl: './job-sales-force.component.html',
  styleUrls: ['./job-sales-force.component.css'],
})
export class JobSalesForceComponent implements OnInit {
  constructor(
    private title: Title,
    private dialog: MatDialog,
    private services: MainService,
    private viewportRuler: ViewportRuler
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      this.dataYangDitampilkan_ListAllJob
    );
    this.title.setTitle('Mapping Sales Force');
    this.getListAllJob();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.matPaginator;
  }

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  displayedColumns: string[] = [
    'jobCode',
    'jobDesc',
    'comId',
    'jobStatus',
    'action',
  ];

  dataSource!: MatTableDataSource<listAllJob>;
  dataYangDitampilkan_ListAllJob: listAllJob[] = [];
  searchJobText: any;

  searchJobs() {
    this.dataSource.filter = this.searchJobText.trim().toLowerCase();
  }
  onSearchChange() {
    if (this.searchJobText === '') this.getListAllJob();
  }

  getListAllJob() {
    let jobStatus: any;
    let jobDesc: any;
    let comId: any;
    this.dataYangDitampilkan_ListAllJob = []; // biar ga duplikasi saat di refresh
    this.services.getJob('job').subscribe(
      (res) => {
        console.log(res);
        res.body.data.forEach((element: any) => {
          if (element.emplJobStatus == 'I') {
            jobStatus = 'Internal';
          } else if (element.emplJobStatus == 'E') {
            jobStatus = 'External';
          } else if (element.emplJobStatus == 'IE') {
            jobStatus = 'Internal dan External';
          } else {
            jobStatus = 'ERROR';
          }

          if (element.emplJobDesc != null) {
            jobDesc = element.emplJobDesc;
          } else {
            jobDesc = 'ERROR';
          }

          if (element.emplComId != null) {
            comId = element.emplComId;
          } else {
            comId = 'ERROR';
          }

          this.dataYangDitampilkan_ListAllJob.push({
            jobCode: element.emplJobCode,
            jobDesc: jobDesc,
            comId: comId,
            jobStatus: jobStatus,
          });
        });
        this.dataSource = new MatTableDataSource(
          this.dataYangDitampilkan_ListAllJob
        );
        this.ngAfterViewInit(); // paginator dan sorting
      },
      (err) => {
        console.log(err);
      }
    );
  }

  detailJob(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-dialog';
    dialogConfig.width = '55%';
    // dialogConfig.height = '90%';
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
}

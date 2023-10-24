import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  listAllJob,
  listCompany,
} from 'src/app/models/job-sales-force-models/job-sales-force-models';

import { DetailSalesComponent } from './detail-sales/detail-sales.component';
import { MainService } from 'src/app/services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

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
    this.getCompanyCode();
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
    'comDesc',
    'jobStatus',
    'action',
  ];

  dataSource!: MatTableDataSource<listAllJob>;
  dataYangDitampilkan_ListAllJob: listAllJob[] = [];
  searchJobText: any;
  dataYangDitampilkan_listCompany: listCompany[] = [];
  isLoading: any;
  noData: any;
  error: any;

  searchJobs() {
    this.dataSource.filter = this.searchJobText.trim().toLowerCase();
    if (this.dataSource.filteredData.length === 0) {
      this.noData = true;
      this.isLoading = false;
      this.error = false;
    }
  }
  onSearchChange() {
    if (this.searchJobText === '') this.getListAllJob();
  }

  getListAllJob() {
    this.noData = false;
    this.isLoading = true;
    this.error = false;

    let jobStatus: any;
    let jobDesc: any;
    let comDesc: any;
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

          // Mencari companyCode yang sesuai
          let hasilPencocokanCompanyCode =
            this.dataYangDitampilkan_listCompany.find(
              (element_listCompany) =>
                element_listCompany.channelComId == element.emplComId
            );

          if (hasilPencocokanCompanyCode) {
            comDesc = hasilPencocokanCompanyCode.channelDesc;
          } else {
            comDesc = 'ERROR';
          }

          this.dataYangDitampilkan_ListAllJob.push({
            jobCode: element.emplJobCode,
            jobDesc: jobDesc,
            comDesc: comDesc,
            jobStatus: jobStatus,
          });
        });

        this.noData = true;
        this.isLoading = false;
        this.error = false;

        this.dataSource = new MatTableDataSource(
          this.dataYangDitampilkan_ListAllJob
        );
        this.ngAfterViewInit(); // paginator dan sorting
      },
      (err) => {
        console.log(err);

        this.noData = false;
        this.isLoading = false;
        this.error = true;

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,

          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: 'Service Unavailable',
        });
      }
    );
  }

  getCompanyCode() {
    this.dataYangDitampilkan_listCompany = [];
    this.services.getJob('jobMapping/getChannelCode').subscribe(
      (res) => {
        console.log(res);
        res.body.data.forEach((element: any) => {
          this.dataYangDitampilkan_listCompany.push({
            channelId: element.channelId,
            channelComId: element.channelComId,
            channelDesc: element.channelDesc,
          });
        });
      },
      (err) => {
        console.log(err);

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,

          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: 'Service Unavailable',
        });
      }
    );
  }

  detailJob(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-dialog';
    dialogConfig.width = '55%';
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

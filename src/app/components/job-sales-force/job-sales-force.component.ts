import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DetailSalesComponent } from './detail-sales/detail-sales.component';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { listAllJob } from 'src/app/models/job-sales-force-models/job-sales-force-models';

@Component({
  selector: 'app-job-sales-force',
  templateUrl: './job-sales-force.component.html',
  styleUrls: ['./job-sales-force.component.css'],
})
export class JobSalesForceComponent implements OnInit {
  constructor(private title: Title, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      this.dataYangDitampilkan_ListAllJob
    );
    this.title.setTitle('Mapping Sales Force');
  }

  displayedColumns: string[] = ['jobCode', 'jobDesc', 'action'];

  dataSource!: MatTableDataSource<listAllJob>;
  dataYangDitampilkan_ListAllJob: listAllJob[] = [
    {
      emplJobCode: 'JOB001',
      emplJobDesc: 'Deskripsi pekerjaan 1',
    },
    {
      emplJobCode: 'JOB002',
      emplJobDesc: 'Deskripsi pekerjaan 2',
    },
  ];

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
          console.log(res.body.message);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}

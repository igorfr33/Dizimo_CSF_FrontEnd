import { Component, Inject, OnInit } from '@angular/core';
import { PeriodicElement } from 'src/app/views/home/home.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {

  element!: PeriodicElement;
  isChange!: boolean

  constructor(
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement) { }

  ngOnInit(): void {
    if (this.data.id !== null){
      this.isChange = true
    } else {
      this.isChange = false
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

import {Component, Inject} from '@angular/core';
import {MdDialogRef, MdDialog, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'img-dialog',
  template: `<img src="{{ data }}" style="max-height:100%;max-width:100%;" img>`
})
export class DialogComponent {
  constructor (
    public dialogRef: MdDialogRef<DialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) {
     }
}


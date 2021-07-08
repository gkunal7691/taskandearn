import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfessionalsService } from 'src/app/services/professionals.service';
const swal = require('sweetalert');

@Component({
  selector: 'app-shared-professional',
  templateUrl: './shared-professional.component.html',
  styleUrls: ['./shared-professional.component.css']
})
export class SharedProfessionalComponent {
  @Input() allProfessionalsList: any
  @Input() allCategories: any
  @Input() showFilter: boolean
  @Input() catId: any
  @Output() filterEvent = new EventEmitter()
  @Output() clearEvent = new EventEmitter()

  constructor(private professionalService: ProfessionalsService) { }
  archiveUserDetails: any;

  public onClear() {
    this.clearEvent.emit('clear');
  }

  public filter(value) {
    this.filterEvent.emit(value);
  }

  public onClickArchive(professional) {
    let fullName = professional.firstName;
    if (professional.lastName) {
      fullName = fullName + ' ' + professional.lastName;
    }
    let isArchive: boolean = professional.isArchive ? false : true;
    let archiveText = isArchive ? "archive" : "unarchive";
    swal({
      title: "Do you want to " + archiveText + "(" + fullName + ")?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((isConfirm) => {
      if (isConfirm) {
        this.onArchivePopup(professional.proId, isArchive);
      } else {
        swal('Cancelled', fullName + ' is not archived.', 'error');
      }
    });
  }

  private onArchivePopup(proId: number, isArchive: boolean) {
    let data: any = {};
    data.proId = proId;
    data.isArchive = isArchive;

    this.professionalService.updateProfessional(data).subscribe((res: any) => {
      if (res.success) {
        this.clearEvent.emit('clear');
        let text = isArchive ? "Archived" : "Unarchived";
        swal('Success', text, 'success');
      } else {
        swal('Error', 'Something went wrong', 'error');
      }
    })
  }

  getArchieveUsers(isChecked) {
    this.professionalService.getUnArchive({ isArchive: isChecked}).subscribe(res => {
      this.allProfessionalsList = res.data
    })
  }
}
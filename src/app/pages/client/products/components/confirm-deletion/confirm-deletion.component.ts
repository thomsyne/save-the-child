import { Product } from './../../model';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Output, Input } from '@angular/core';
import { AlertService } from '@ga/utility';
import { ProductService } from '../../services/products.service';
import { deletionModalData } from './confirm-deletion-constants';

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDeletionComponent implements OnInit {

  @Input() checkedItems: Product[]
  @Output() closeModal = new EventEmitter();
  @Output() refreshData = new EventEmitter();
  modalData = deletionModalData;

  constructor(
    private alertService: AlertService,
    private productService: ProductService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  toggleShowDeletionModal() {
    this.closeModal.emit();
  }

  submit(){
    this.alertService.warn('Deletion in progress...')

    let ids = this.checkedItems.map((i) => i.id)

    this.productService.deleteProductsBulk(ids).subscribe(async (response) => {

      console.log(response['numberOfFailed'])

      if(response['numberOfSuccess'] > 0){
        for (let i = 1; i <= response['numberOfSuccess']; i++){
          this.alertService.success(response['successMessage'].toString())
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1200));
      this.alertService.clear()

      if(response['numberOfFailed'] > 0){
        for (let i = 1; i <= response['numberOfFailed']; i++){
          this.alertService.warn(response['failureMessage'].toString())
        }
      }

      this.refreshData.emit()
      this.toggleShowDeletionModal()
    })
  }

}

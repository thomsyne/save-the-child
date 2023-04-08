import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Filter, FilterFieldTag, FilterFormat } from "../model";

@Component({
  selector: "lib-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  @Input() filters: Filter[]; // List of filters
  @Output() filter = new EventEmitter<any>(); // Used to pass data back to parent

  tagList: FilterFieldTag[]; // List of filter field tags

  filterForm: FormGroup;
  showFilter = false;

  ngOnInit() {
    this.initializeForm();
    this.checkUrlForInitValues();
    this.applyFilters();
  }

  initializeForm() {
    // Initialize the form group with dynamic data
    let store = {};
    this.filters.forEach((el) => {
      store[el.filterName] = el.defaultValue || "";
    });

    this.filterForm = this.formBuilder.group(store);

    this.tagList = [];
  }

  applyFilters() {
    // Send value to parent component
    this.filter.emit(this.filterForm.value);

    this.tagList = [];

    /*
      Loop through the form group values and
      push truthy values into the tagList[]
     */
    for (const field in this.filterForm.value) {
      if (this.filterForm.value[field]) {
        this.tagList.push({
          text: `${field}: ${this.filterForm.value[field]}`,
          id: field,
        });
      }
    }

    // Hide
    this.showFilter = false;
  }

  checkUrlForInitValues() {
    const urlParams = {};
    this.filters.forEach((filter) => {
      urlParams[filter.filterName] = this.route.snapshot.queryParamMap.get(
        filter.filterName
      );
    });

    this.filterForm.patchValue(urlParams, {
      emitEvent: true,
    });
  }

  clearField(id: string) {
    // Reset formcontrol
    this.filterForm.get(id).patchValue("");

    // Trick to trigger change detetion
    this.tagList = JSON.parse(
      JSON.stringify(this.tagList.filter((el) => el.id !== id))
    );

    // Send value to parent component
    this.filter.emit(this.filterForm.value);
  }

  clearFilter() {
    // Reset whole form
    this.initializeForm();

    // Send value to parent component
    this.filter.emit(this.filterForm.value);
  }
}

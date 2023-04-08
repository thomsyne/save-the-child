import {
    ColumnSetting,
    Filter,
    FilterFormat,
    PipeFormat,
  } from "@ga/dynamic-table";
  import { defaultDateFilterValues } from "src/app/core/constants/constants";

  export const filters: Filter[] = [

    {
      displayName: "Start Date",
      filterName: "startDate",
      type: FilterFormat.DATE
    },
    {
      displayName: "End Date",
      filterName: "endDate",
      type: FilterFormat.DATE
    }
  ];

import {
    ColumnSetting,
    Filter,
    FilterFormat,
    PipeFormat,
  } from "@ga/dynamic-table";
  import { defaultDateFilterValues } from "src/app/core/constants/constants";

  export const filters: Filter[] = [

    {
      displayName: "Action Type",
      filterName: "actionType",
      type: FilterFormat.SELECT,
      options: new Map([
        ["Created", "Created"],
        ["Updated", "Updated"],
        ["Deleted","Deleted"],
        ["Get","Get"]
      ]),
    },
    {
      displayName: "Severity Level",
      filterName: "severityLevel",
      type: FilterFormat.SELECT,
      options: new Map([
        ["Low", "low"],
        ["Medium", "medium"],
        ["High", "high"]
      ]),
    },
    {
      displayName: "Start Date",
      filterName: "startDate",
      type: FilterFormat.DATE,
    },
    {
      displayName: "Modified Date",
      filterName: "modifiedDate",
      type: FilterFormat.DATE,
    },
  ];

  export const auditLogsTableSettings: ColumnSetting[] = [
    {
      primaryKey: "createdOn",
      header: "Created Date",
      format: PipeFormat.DATE
    },
    {
      primaryKey: "actionType",
      header: "Action Type",
    },
    {
      primaryKey: "severityLevel",
      header: "Severity Level",
    },
    {
      primaryKey: "affectedUser",
      header: "Affected User",
    },
    {
      primaryKey: "modifiedOn",
      header: "Modified Date",
      format: PipeFormat.DATE
    },

  ];

  export const downloadCSvheaders: string[] = [
    "Created Date",
    "Action Type",
    "Severity Level",
    "Affected User",
    "Last Modified Date",
  ];

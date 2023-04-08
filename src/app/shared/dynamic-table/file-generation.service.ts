import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FileGenerationService {
  constructor() {}

  generateCSV(downloadData, dataName, downloadHeaders) {
    const line = (row: Record<string, any>) =>
      Object.values(row)
        .map((val) => `"${val}"`)
        .join(",");

    const csv = downloadData.map((row) => line(row)).join("\n");

    const fullCsv = `${downloadHeaders.join(",")}\n${csv}`;

    var blob = new Blob([fullCsv], { type: "text/csv;charset=utf8;" });
    var uri = "data:attachment/csv;charset=utf-8," + encodeURI(fullCsv);
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("visibility", "hidden");
    link.download = `${dataName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

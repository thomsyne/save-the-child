import { FileUploadMetadata } from "@ga/file-upload";

const fileMetaData: FileUploadMetadata = {
  type: "single",
  supportedFileTypes: [".csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"],
};

export const documentUploadMetadata: FileUploadMetadata =
  {
    label: "Document",
    name: "document",
    ...fileMetaData,
  }

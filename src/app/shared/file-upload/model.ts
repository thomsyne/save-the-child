export interface FileUploadMetadata {
  type: "single" | "multiple";
  supportedFileTypes: string[];
  label?: string;
  accept?: string;
  name?: string; // Used to identify the file upload field in the form.
}

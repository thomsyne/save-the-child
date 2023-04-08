import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Config } from '../constants';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class UploadService {

constructor(
  private httpClient: HttpClient,
  private config: Config,
) { }

singleDocumentUpload(fileData: FormData): Observable<
{
  documentLink: string;
  url: string;
}[]
> {
return this.httpClient.post<
  {
    documentLink: string;
    url: string;
  }[]
>(`${BASE_URL}${this.config.publicV2DocumentUpload}`, fileData);
}

getSingleDocumentData(id: string): Observable<
{
  fileName: string,
  contentType: string,
  content: string
}>{
  return this.httpClient.get<
  {
    fileName: string,
    contentType: string,
    content: string
  }
  >(`${BASE_URL}${this.config.getUploadedFile}/${id}`)
}

}

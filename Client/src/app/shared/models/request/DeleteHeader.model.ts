import {HttpHeaders} from '@angular/common/http';

export class DeleteHeader {

  constructor(docId: string, token: string) {
    this.docId = docId;
    this.token = token;
  }

  private docId: string;
  private token: string;

  private static getMap(deleteHeader: DeleteHeader): { docId: string, token: string } {
    return {
      docId: deleteHeader.docId,
      token: deleteHeader.token
    };
  }

  getHeader(deleteHeader: DeleteHeader): HttpHeaders {
    return new HttpHeaders(JSON.parse(JSON.stringify(DeleteHeader.getMap(deleteHeader))));
  }
}

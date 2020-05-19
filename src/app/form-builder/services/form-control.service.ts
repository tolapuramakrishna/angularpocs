import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class FormControlService {
    
   
    constructor(private _http: HttpClient){
    }

    //public PushRFQTransactionDataToVB(request: IRequestInputID): Observable<ResponseModel<IResultModel>> {
    //    let url = this._user._app.appUrl.apiUrl + '/' + FormBuilder_SERVICE_URL.PUSH_RFQ_TRANSACTION_DATA_TO_PE;
    //    let requestParam: RequestModel<IRequestInputID> = {
    //        RequestParameter: request
    //    };
    //    return this._http.post<ResponseModel<IResultModel>>(url, requestParam)
    //        .pipe(catchError(this._user._app.handleError));
    //}

    
}
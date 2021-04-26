import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, of } from "rxjs";
import { map } from "rxjs/operators";
import { ApproverHierarchyModel } from '../../common/models/user-model/user-base.model';
import { UserSharedService } from '../../common/services';

@Injectable()
export class ApproversChainService {

    newID = 30;
    currentChain = [
    ];

     maxParalledApprovers: number = 3;
     maxSerial: number = 15;
    currentWorkflowID:number = null;
    private treeChange = new Subject<any>();
    treeChange$ = this.treeChange.asObservable();

    private ovarlayChanges = new Subject<any>();
    ovarlayChanges$ = this.ovarlayChanges.asObservable();

    private submitChanges = new Subject<any>();
    submitChanges$ = this.submitChanges.asObservable();

    private deleteChanges = new Subject<any>();
    deleteChanges$ = this.deleteChanges.asObservable();

    constructor( public _user: UserSharedService) { }

    getApprovalChain(): Observable<any[]> {
        //return this._http.get("/assets/approver-chain.json").pipe(
        //    map((res: any[]) => {
        //        console.log(res);
        //        this.currentChain = res;
        //        return res;
        //    })
        //);
        return of(this.currentChain);
    }

    openOverlay(isLevel: boolean, levelIndex: number, index: number,event) {
        if (isLevel) {
            this.ovarlayChanges.next({ open: true, isLevel, levelIndex, index,event});
        } else {
            this.ovarlayChanges.next({ open: true, isLevel, levelIndex, index, event});
        }
    }

    EditNode(levelIndex: number, index?: number) {
        this.ovarlayChanges.next({ edit: true, levelIndex, index });
    }

    removeNode(child: ApproverHierarchyModel,levelIndex: number, index?: number) {
        this.deleteChanges.next({ remove: true, child,levelIndex, index });
    }

    

    identifyUniqListByKey(key, list: any): any[]{
        // Filter by looking at the next objects if the key is present a second time
        return list.filter(
            (x, xi) =>
                !list.slice(xi + 1).some(y => y[key] === x[key])
        ).sort((a, b) => a[key] - b[key]).map(y=> y[key]);
        
    }

    returnModifiedApproverList(key, originalList:ApproverHierarchyModel[]): ApproverModelByWflow[] {
        return this.identifyUniqListByKey('WorkflowID', originalList).map(x => {
            return {
                WorkflowID: x,
                approverList: this.identifyUniqListByKey('SequenceNumber', originalList.filter(y => y['WorkflowID'] ==x)).
                    map(appr => {
                        const list:ApproverHierarchyModel[] = originalList.filter(org => org['SequenceNumber'] == appr && org['WorkflowID'] == x)
                        return {
                            SequenceNumber: appr,
                            approverList: list,
                            canAddNxtlevel: true,
                            seqDollerLevel: list[0].DollerLevel
                        };
                    })
                
            };
        }) 
    }
}

export interface ApproverModelByWflow {
    WorkflowID: number;
    approverList: ApproverModelBySeq[],
    
}

export interface ApproverModelBySeq {
    
    SequenceNumber: number;
    approverList: ApproverHierarchyModel[],
    canAddNxtlevel: boolean,
    seqDollerLevel: number
}
import { Component, OnInit, Input } from '@angular/core';
import { ApproversChainService } from '../../../services/approvers-chain.service';
import { SharedService } from '../../../../common/services/shared.service';
import { LocationConfig } from '../../../../common/enums';
@Component({
  selector: 'approval-level-hierarchy',
  templateUrl: './approval-level-hierarchy.component.html',
  styleUrls: ['./approval-level-hierarchy.component.scss']
})
export class ApprovalLevelHierarchyComponent implements OnInit {

    @Input() treelist = [];
    @Input() workFlowId = null;
    @Input() disableDynamicAppChain=null;
    constructor(public _approverService: ApproversChainService, private _sharedSrvc: SharedService) { }

    ngOnInit() {
        this.disableDynamicAppChain = this._sharedSrvc._user.GetLocationAccess(LocationConfig.Enable_Adding_approvers_to_ApprovalChain_Dynamic, this._sharedSrvc._user.userLocationInfo.LocationInfo.ID) > 0;



    }
    //get disableDynamicAppChain(): boolean {
    //    return this._sharedSrvc._user.GetLocationAccess(LocationConfig.Enable_Adding_approvers_to_ApprovalChain_Dynamic, this._sharedSrvc._user.userLocationInfo.LocationInfo.ID) > 0;
    //}
    addNewLevel(tree, levIndex, event) {
        //add new level
        this._approverService.currentWorkflowID = this.workFlowId;
        this._approverService.openOverlay(true, levIndex, null,event);
        //this._service.addNewLevel(tree,levIndex);
    }

}

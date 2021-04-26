import { Component, OnInit, Input } from '@angular/core';
import { ApproversChainService, ApproverModelBySeq } from '../../../services/approvers-chain.service';
import { ApproverHierarchyModel } from '../../../../common/models/user-model/user-base.model';
import { DecimalLimitTypeEnum } from '../../../../common/models/html-control';
import { SharedService } from '../../../../common/services/shared.service';
import { LocationConfig } from '../../../../common/enums';

@Component({
    selector: 'approver-node',
    templateUrl: './approver-node.component.html',
    styleUrls: ['./approver-node.component.scss']
})
export class ApproverNodeComponent implements OnInit {

    @Input() node: ApproverModelBySeq;
    @Input() disableDynamicAppChain = null;
    @Input() levelIndex;
    @Input() levelLength;
    @Input() totalSeq: number = 0;
    selectedNodeID: string;
    nodeId: string;
    ticks = 0;
    public hideChildrenList;
    mouseDownX: string;
    mouseDownY: string;

    currentlyHoveringId: string;

    constructor(public _approverService: ApproversChainService, private _sharedSrvc: SharedService ) {

    }


    ngOnInit() {
        this.disableDynamicAppChain = this._sharedSrvc._user.GetLocationAccess(LocationConfig.Enable_Adding_approvers_to_ApprovalChain_Dynamic, this._sharedSrvc._user.userLocationInfo.LocationInfo.ID) > 0;

    }

    shouldShowPopup(id) {
        return this.currentlyHoveringId === id;
    }

    hideChilren(id) {

    }

    mouseDown(nodeID: string, selectedNode, event) {
        // console.log('mouse down: ' + this.ticks);
        if (event.target.id !== 'expandbutton') {
            this.mouseDownX = event.clientX;
            this.mouseDownY = event.clientY;
        }
    }

    mouseUp(nodeID: string, selectedNode, event) {
        if (event.target.id !== 'expandbutton' && event.target.id !== 'addbutton') {
            if (this.mouseDownX === event.clientX && this.mouseDownY === event.clientY) {

            } else if (selectedNode !== this.getFocusNode()) {

            }
        }
    }

    getSelectedNodeID() {
        return this.getFocusNodeId();
    }

    mouseEnter(id, event) {
        console.log('enter');
        //this.setCurrentlyHoveringId(id);
    }

    mouseLeave(id, event) {
        console.log('leaving');
        // this.setCurrentlyHoveringId('');
    }

    nodeClicked(index: number, selectedNode, event) {
        // this.sidenav.setFocusNode(nodeID, selectedNode);
        // console.log(this.ticks);
        this._approverService.EditNode(this.levelIndex, index);
    }
    getFocusNode() {

    }
    getFocusNodeId() {

    }
    shouldHideChildren(id) {
        return //this.hideChildrenOfIds.includes(id);
    }

    addNextToNode(child: ApproverHierarchyModel, index, $event) {

        //console.log('add child to ' + child);
        this._approverService.currentWorkflowID = child.WorkflowID;
        this._approverService.openOverlay(false, this.levelIndex, index, $event);
        // this._service.addNewChild(this.levelIndex,index);
    }
    deleteNode(child: ApproverHierarchyModel, index) {
        //console.log('remove child ' + child);
        this._approverService.currentWorkflowID = child.WorkflowID;
        this._approverService.removeNode(child, this.levelIndex, index);
    }

    getHoverText(child: ApproverHierarchyModel): string {
        // this._sharedSrvc._user.GetCurruncyFormatModel(numebrValue, this._sharedSrvc._user.userLocationInfo.LocationInfo.Currency.Code, ctrlType)
        if (child) {
            if (this._approverService._user.userLocationInfo.LocationInfo && this._approverService._user.userLocationInfo.LocationInfo.Currency) {
                //console.log(this._approverService._user._translate.numberToCurrencyFormat(child.DollerLevel))

                return `${child.Approver.Name} - ${this._approverService._user._translate.numberToCurrencyFormat(child.DollerLevel, this._approverService._user.userLocationInfo.LocationInfo.Currency.Code, this._approverService._user.userLocationInfo.LocationInfo.DecimalLimit)}`
                // ${this._approverService._user.userLocationInfo.LocationInfo.Currency.Code} ${child.DollerLevel.toFixed(this._approverService._user.userLocationInfo.LocationInfo.DecimalLimit)}
            }
            else
                return `${child.Approver.Name}`;
        }
        //{{child.Approver?.Name}} - ${{child.DollerLevel}}
        return ''
    }
}

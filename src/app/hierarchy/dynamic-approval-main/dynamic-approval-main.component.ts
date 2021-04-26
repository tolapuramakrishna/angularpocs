import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,

    Input,
    Output,
    EventEmitter
} from "@angular/core";
import panzoom from "panzoom";

import {
    trigger,
    state,
    style,
    transition,
    animate
} from "@angular/animations";
import { ApproversChainService, ApproverModelByWflow, ApproverModelBySeq } from '../../../services/approvers-chain.service';
import { IUserBaseModel } from '../../../../common/models/user-model';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderDetailSerice } from '../../../services/order-detail.service';
import { ApproverSearchModel } from '../../../models/orders/index';
import { MessageTypeEnum } from '../../../../common/enums';
import { ApproverHierarchyModel } from '../../../../common/models/user-model/user-base.model';
import { AppBaseService, UserSharedService  } from '../../../../common/services';
import { SharedService } from '../../../../common/services/shared.service';
import { LocationConfig } from '../../../../common/enums';

import { debug } from 'util';




@Component({
    selector: 'dynamic-approval-main',
    templateUrl: './dynamic-approval-main.component.html',
    styleUrls: ['./dynamic-approval-main.component.scss'],
    animations: [
        trigger("detailExpand", [
            state(
                "collapsed",
                style({ width: "0px", minHeight: "0", display: "none" })
            ),
            state("expanded", style({ width: "*", display: "flex"})),
            transition(
                "expanded <=> collapsed",
                animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
            )
        ])
    ]
})
export class DynamicApprovalMainComponent implements OnInit {

    @Input('list')
    currentlySelectedTree: ApproverModelByWflow[] = [];
    @Input('masterList') masterApproverList: IUserBaseModel[] = [];
    approverName = "";
    elepanzoom;
    overlay: boolean = false;
    currentOverlay;
    currentNode = null;
    @ViewChild("panel", { read: ElementRef, static: false }) scene: ElementRef;


    filteredApproverList: Observable<IUserBaseModel[]>;
    approver: FormControl = new FormControl()
    leftPos = null;
    topPos = null;

    @Output('close') close: EventEmitter<any> = new EventEmitter();

    @Output('add') addApprover: EventEmitter<any> = new EventEmitter<any>();

    @Output('save') save: EventEmitter<any> = new EventEmitter();
    @Input('chainChanged')
    changeCountInApproverChain: number = 0;

    constructor(private _approverService: ApproversChainService, private _sharedSrvc: SharedService, private _app: AppBaseService, private _userSrvc: UserSharedService) { }
    get disableDynamicAppChain(): boolean {

        return this._userSrvc.GetLocationAccess(LocationConfig.Enable_Adding_approvers_to_ApprovalChain_Dynamic, this._sharedSrvc._user.userLocationInfo.LocationInfo.ID) > 0;
    }
    ngOnInit() {
        //this._approverService.getApprovalChain().subscribe(res => {
        //    this.currentlySelectedTree = res;
        //});

        //this._approverService.treeChange$.subscribe(chain => {
        //    this.currentlySelectedTree = chain;
        //});
        this._approverService.ovarlayChanges$.subscribe(res => {
            if (res.event) {
                //console.log(res.event.target);
                this.topPos = res.isLevel ? res.event.clientY - res.event.target.offsetTop - 150 : res.event.clientY - res.event.target.offsetTop - 70;
                this.leftPos = res.event.target.offsetLeft > 300 ? res.event.target.offsetLeft - 50 : res.event.target.offsetLeft + 100;
            } else {
                this.topPos = 70;
                this.leftPos = 250;
            }

            if (res.hasOwnProperty("edit")) {
                this.overlay = true;
                this.currentOverlay = res;
                // this.approverName = res.
                this.currentNode = {
                    ...this.currentlySelectedTree[res.levelIndex].approverList[res.index]
                };
            } else if (res && res.open) {
                //this.currentNode = this._approverService.returnEmptyApprover();
                this.overlay = res.open;
                this.currentOverlay = res;
            } else {
                this.overlay = res.open;
                //this.currentNode = this._approverService.returnEmptyApprover();
            }
        });
        this.filteredApproverList = this.approver.valueChanges 
            .pipe(
                startWith(''),
                map(name => name ? this.filterList(name) : this.masterApproverList.slice())
            );
    }



    
    ngAfterViewInit() {
        // panzoom(document.querySelector('#scene'));
        this.elepanzoom = panzoom(this.scene.nativeElement, {
            zoomSpeed: 0.065, // 6.5% per mouse wheel event
            bounds: true,
            boundsPadding: 0.1
        });

        //ele.
    }
    

    filterList(value: string): IUserBaseModel[] {
        if (typeof value == 'string') {
            const filterValue = value ? value.toLowerCase() : value;

            return this.masterApproverList.filter(appr => appr.Name && appr.Name.toLowerCase().indexOf(filterValue) === 0);

        }
    }
    autoCompleteDisplayFn(appr: IUserBaseModel): string {
        return (appr && appr.Name) ? appr.Name : '';
    }
    onResetZoom() {
        this.elepanzoom.moveTo(0, 0);
        this.elepanzoom.zoomAbs(0, 0, 1);
    }

    onFirstNode(evt) {
        this._approverService.currentWorkflowID = this._approverService.currentWorkflowID ? this._approverService.currentWorkflowID : this.currentlySelectedTree[0].WorkflowID;
        const wfArr = this.currentlySelectedTree.find(x => x.WorkflowID == this._approverService.currentWorkflowID);
        if (wfArr.approverList.length < this._approverService.maxSerial) {
            this._approverService.openOverlay(true, -1, null, null);

        } else {
            this._app.SetMessage(MessageTypeEnum.ERROR,"exceeds limit of serial approver addition in a workflow")//this._orderSrvc._userSrvc._translate.instant("UpdateCartItemAddMsg")
        }
    }
    OnLastLevl() {
        this._approverService.openOverlay(true, this.currentlySelectedTree.length - 1, null, null);
    }
    onConfirm() {
        const appr: IUserBaseModel = this.approver.value
        if (appr && appr.Name) {
            if (this.currentOverlay.hasOwnProperty("edit")) {
                //there is no edit part as of now 
                this.currentlySelectedTree[this.currentOverlay.levelIndex].approverList[this.currentOverlay.index] = { ... this.currentNode }
            } else {

                const appObj: ApproverHierarchyModel = {
                    SequenceNumber: this.currentOverlay.levelIndex > -1 ? this.currentOverlay.levelIndex:1,
                    WorkflowID: this._approverService.currentWorkflowID ? this._approverService.currentWorkflowID : this.currentlySelectedTree[0].WorkflowID,
                    RoleName: appr.BaseRoleID,
                    IsOriginalApprover: 1,
                    DelegatedTo: null,
                    DelegatedFrom: null,
                    IsAdded: true,
                    canRemove: true,
                    Approver: appr,
                    DollerLevel: 0,
                    CreatedBy: null,
                    IsPresent: 1,
                   
                };
                
                this.addApprover.emit({ appObj, conditons: this.currentOverlay });
                this.approver.setValue(null);
            }
        }
        this.overlay = false;
    }

    onClose() {
     
        this.overlay = false;
    }

    onSave() {

        this.save.emit();
    }

    checkDollerlevel() {
        const WorkflowID = this._approverService.currentWorkflowID ? this._approverService.currentWorkflowID : this.currentlySelectedTree[0] ? this.currentlySelectedTree[0].WorkflowID : null;
        const wfList = this.currentlySelectedTree.find(x => x.WorkflowID == WorkflowID);
        if (wfList) {
            return wfList.approverList[0] ? wfList.approverList[0].approverList[0] ? wfList.approverList[0].approverList[0].DollerLevel : null : null
        }
        return null;
    }
}

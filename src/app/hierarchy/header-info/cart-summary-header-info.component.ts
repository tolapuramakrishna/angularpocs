import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalLimitTypeEnum } from '../../../../common/models/html-control';
import { OrderDetailSerice } from '../../../services/order-detail.service';
import { OverAllStatus } from '../../../../common/enums/over-all-status.enum';
import { OrderReturnRequestModel, OrderRequestModel, OrderHeaderInfoResponseModel, OrderResponseInfoModel, ApproverSearchModel, OrderTabInfoModel } from '../../../models/orders/index';
import { trigger, state, style, transition, animate } from "@angular/animations";
import { ApproversChainService, ApproverModelByWflow, ApproverModelBySeq } from '../../../services/approvers-chain.service';
import { ApproverHierarchyModel, IUserBaseModel } from '../../../../common/models/user-model/user-base.model';
import { DashboardOrderType, MessageTypeEnum, LocationConfig, CustomerPrivilege } from '../../../../common/enums';


@Component({
    moduleId: module.id.toString(),
    templateUrl: 'cart-summary-header-info.component.html',
    selector: 'cart-summary-header-info',
    animations: [
        trigger("detailExpand", [
            state(
                "collapsed",
                style({ width: "0px", })
            ),
            state("expanded", style({ width: "*", })),
            transition(
                "expanded <=> collapsed",
                animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
            )
        ])
    ]
})
export class CartSummaryHeaderInfoComponent implements OnInit {
    emptyCartMsg: string = '';


    @Input()
    OrderInfo: OrderHeaderInfoResponseModel;
    isActive: boolean = true;
    public isFull: boolean = true;
    OverAllStatus = OverAllStatus;
    returnOrderModel: OrderReturnRequestModel = null;
    overlay: boolean = false;
    currentApproverChain: ApproverModelByWflow[] = [];
    existingFirstApprover: ApproverHierarchyModel = null;
    masterApproverList: IUserBaseModel[] = [];
    changeCountInApproverChain: number = 0;

    PCartID: any;
    subTotal: any;
    ShipToID: any;
    CartID: number;

    currentChain = {
        ReqNo: null,
        RfqId: null,
        ModuleId: null
    }

    @Output('approverChainUpdated') update: EventEmitter<any> = new EventEmitter()

    isPrintContent: boolean = true;
    constructor(public _orderSrvc: OrderDetailSerice, public _route: Router, private _approverService: ApproversChainService) {
        this._orderSrvc._userSrvc.userLocationInfo.LocationInfo.ID;

        this._approverService.deleteChanges$.subscribe(res => {
            if (res.remove) {
                this.deleteNode(res.child, res.levelIndex, res.index);
            }
        })
        //this.ShipToID = this.OrderInfo.ShippingAddress.ID;
        //this.CartID = this.OrderInfo.OrderId;
        //this.PCartID = this.OrderInfo.Card.CardNumber;
    }
    ngOnInit() {
        //console.log("This is header info " + JSON.stringify(this.OrderInfo));
       // console.log("Order Tabs Info info " + JSON.stringify(this.OrderInfo.OrderTabs));

    }


    getApproverSearchList(workFlowId: number) {

        if (this.masterApproverList == null || this.masterApproverList.length == 0) {
            var requestModel: ApproverSearchModel = {
                workFlowId: workFlowId,
                locationId: this.OrderInfo.Location.ID,
                searchText: ""
            }
            this._orderSrvc.getApproverSearchList(requestModel).subscribe(x => {
                if (x.ResponseData != null) {
                    this.masterApproverList = x.ResponseData;
                    //console.log('app Data ' + JSON.stringify(x.ResponseData));
                }
            });

        }
        //   this.filteredApproverList

    }

    public getextend(obj) {
        this.OrderInfo.OrderTabs.forEach(e => {
            if (obj.Id != e.Id) {
                e.isExpand = false;
            }
        });
    }
    public getGTotal(items: OrderResponseInfoModel[]) {
        let Gtotal = 0;
        if (items != null)
            items.forEach(x => { Gtotal += x.Quantity * x.LocationUnitPrice; });
        return this._orderSrvc.getCurruncyFormatModel(Gtotal, this.OrderInfo.Location.Currency.Code, DecimalLimitTypeEnum.TOTAL_PRICE);
    }





    public EditReturnOrder() {
        this._orderSrvc.isReutnEdit = this._orderSrvc.isReutnEdit ? false : true;
    }

    viewApprover(myModel: OrderTabInfoModel) {

        let rfqId = myModel.ModuleId == DashboardOrderType.RFQ ? myModel.Id : null;
        let reqId = myModel.ModuleId == DashboardOrderType.REQ ? myModel.Id : null;
        this.currentChain = {
            ReqNo: reqId,
            RfqId: rfqId,
            ModuleId: myModel.ModuleId
        }

        if (myModel.ApproverList == null || myModel.ApproverList.length == 0) {

            this._orderSrvc.getOrderWFList({
                ReqId: reqId, RfqId: rfqId

            }).subscribe(x => {
                if (x != null && x.ResponseData != null) {
                    myModel.ApproverList = x.ResponseData;
                    if (myModel && myModel.ApproverList && myModel.ApproverList.length) {

                        myModel.ApproverList.forEach(x => {
                            x.IsAdded = x.IsAdded == null ? false : x.IsAdded;
                            x.canRemove = x.IsAdded
                        });

                        this.existingFirstApprover = myModel.ApproverList.find(x => x.IsAdded == false);

                        this.currentApproverChain = this._approverService.returnModifiedApproverList('SequenceNumber', myModel.ApproverList)
                        this.overlay = true;

                        this.getApproverSearchList(this.currentApproverChain[0].WorkflowID);
                    }

                }
            });
        }
        else if (myModel && myModel.ApproverList && myModel.ApproverList.length) {
            this.existingFirstApprover = myModel.ApproverList.find(x => x.IsAdded == false);

            this.currentApproverChain = this._approverService.returnModifiedApproverList('SequenceNumber', myModel.ApproverList)
            this.overlay = true;
        }
    }

    addApprover(evt) {
        if (evt && evt.conditons.isLevel) {
            // adding new sequence or level

            // this._approverService.addNewLevel(evt.conditons.levelIndex, evt.appObj);
            const appObj: ApproverHierarchyModel = evt.appObj;
            this._approverService.currentWorkflowID = this._approverService.currentWorkflowID ? this._approverService.currentWorkflowID : this.currentApproverChain[0].WorkflowID;
            const wfArr = this.currentApproverChain.find(x => x.WorkflowID == this._approverService.currentWorkflowID);
            let decim = 10 ^ this._approverService._user.userLocationInfo.LocationInfo.DecimalLimit;
            //Math.round((data / total) * 10000) / 100;
            appObj.DollerLevel = Math.round((((wfArr.approverList[evt.conditons.levelIndex] ? wfArr.approverList[evt.conditons.levelIndex].approverList[0].DollerLevel : 0) + (wfArr.approverList[evt.conditons.levelIndex + 1] ? wfArr.approverList[evt.conditons.levelIndex + 1].approverList[0].DollerLevel : 0)) / 2) * decim) / decim;
            const arr = [];
            arr.push(
                ...wfArr.approverList.slice(0, evt.conditons.levelIndex + 1),
                { SequenceNumber: null, approverList: [appObj], canAddNxtlevel: true },
                ...wfArr.approverList.slice(
                    evt.conditons.levelIndex + 1,
                    wfArr.approverList.length
                )
            );
            this.currentApproverChain = this.currentApproverChain.map(x => {
                if (x.WorkflowID == this._approverService.currentWorkflowID) {
                    x.approverList = arr;
                    x.approverList = x.approverList.map((y, index) => {
                        if (index <= evt.conditons.levelIndex) {
                            return y
                        } else {
                            if (index > 0) {
                                //console.log(x.approverList[index - 1].SequenceNumber + 1);

                                y.SequenceNumber = x.approverList[index - 1].SequenceNumber + 1;
                            } else {
                                y.SequenceNumber = 1
                            }
                            return y

                        }

                    })
                    return x;
                } else {
                    return x;
                }
            })
            this.changeCountInApproverChain = this.changeCountInApproverChain + 1;
        } else if (
            evt.conditons &&
            evt.conditons.levelIndex > -1 &&
            evt.conditons.index > -1
        ) {
            // adding new approver in a sequence or level
            const appObj: ApproverHierarchyModel = evt.appObj;

            const wfArr = this.currentApproverChain.find(x => x.WorkflowID == this._approverService.currentWorkflowID);
            let appArr: ApproverModelBySeq = wfArr.approverList[evt.conditons.levelIndex];
            let dupliIndex = appArr.approverList.findIndex(x => x.Approver.ID === appObj.Approver.ID);
            if (dupliIndex == -1) {
                appObj.SequenceNumber = appArr.SequenceNumber;
                appObj.DollerLevel = appArr.approverList[0].DollerLevel;
                const arr = [];
                arr.push(
                    ...appArr.approverList.slice(0, evt.conditons.index + 1),
                    { ...appObj },
                    ...appArr.approverList.slice(
                        evt.conditons.index + 1,
                        appArr.approverList.length
                    )
                );

                this.currentApproverChain = this.currentApproverChain.map(x => {
                    if (x.WorkflowID == this._approverService.currentWorkflowID) {
                        x.approverList = x.approverList.map((y, index) => {
                            if (evt.conditons.levelIndex == index) {
                                y.approverList = arr;
                                return y
                            } else
                                return y
                        })
                        return x;
                    } else {
                        return x;
                    }
                })
                this.changeCountInApproverChain = this.changeCountInApproverChain + 1;
            } else {
                this._orderSrvc._userSrvc._app.SetMessage(MessageTypeEnum.ERROR, this._orderSrvc._userSrvc._translate.instant("lbl_approver_already_present"))
            }
            //wfArr.approverList[evt.conditons.levelIndex].approverList = appArr.approverList = arr;
        }
    }

    deleteNode(child: ApproverHierarchyModel, levelIndex: number, index?: number) {
        this._approverService.currentWorkflowID = this._approverService.currentWorkflowID ? this._approverService.currentWorkflowID : this.currentApproverChain[0].WorkflowID;
        const wfArr = this.currentApproverChain.find(x => x.WorkflowID == this._approverService.currentWorkflowID);

        this.currentApproverChain.forEach(x => {
            if (x.WorkflowID == this._approverService.currentWorkflowID) {
                //x.approverList = arr;
                x.approverList.forEach((y, ind) => {
                    if (ind == levelIndex) {
                        y.approverList.splice(index, 1);
                        if (y.approverList.length == 0) {
                            x.approverList.splice(levelIndex, 1);
                        }
                    }
                });

            }
        });
        this.changeCountInApproverChain = this.changeCountInApproverChain + 1;
        this.currentApproverChain = this.currentApproverChain.map(x => {
            if (x.WorkflowID == this._approverService.currentWorkflowID) {

                x.approverList = x.approverList.map((y, _ind) => {
                    if (_ind == 0) {
                        y.SequenceNumber = 1;
                        return y
                    } else {
                        y.SequenceNumber = x.approverList[_ind - 1].SequenceNumber + 1;

                        return y
                    }

                })
                return x;
            } else {
                return x;
            }
        })
    }
    closeChain() {
        this.overlay = false;
        this.changeCountInApproverChain = 0;

    }
    saveApproverChain(evt) {
        //save functionality

        if (this.changeCountInApproverChain != 0) {

            const currentWFlist = this.currentApproverChain.find(x => x.WorkflowID == this._approverService.currentWorkflowID);
            let currentApproverChain: ApproverHierarchyModel[] = [];
            currentWFlist.approverList.forEach(x => {
                x.approverList.forEach(y => {

                    y.SequenceNumber = x.SequenceNumber;
                    y.WorkflowID = currentWFlist.WorkflowID;
                    y.ReqWorkFlows = this.existingFirstApprover.ReqWorkFlows;
                    y.CatTypeId = this.existingFirstApprover.CatTypeId;
                    y.CostcenterId = this.existingFirstApprover.CostcenterId;
                    y.LocationId = this.existingFirstApprover.LocationId;
                    y.CustomerCode = this.existingFirstApprover.CustomerCode;
                    y.SortOrder = this.existingFirstApprover.SortOrder;
                    y.DisplayOrder = this.existingFirstApprover.DisplayOrder;
                    y.CreatedBy = y.IsAdded ? this._orderSrvc._userSrvc.userLocationInfo.ID : y.CreatedBy
                    currentApproverChain.push(y);
                })
            })

            //console.log(currentApproverChain);
            let inputModel = {
                ReqNo: this.currentChain.ReqNo,
                RfqId: this.currentChain.RfqId,
                UserId: this._orderSrvc._userSrvc.userLocationInfo.ID,
                ApproverDetailList: currentApproverChain,
                ApproverChainJson: JSON.stringify(currentApproverChain)
            }
            this._orderSrvc.setDynamicApproverChain(inputModel).subscribe((res) => {
                if (res && res.ResponseData) {
                    this.update.emit(this.currentChain);
                    this.OrderInfo.OrderTabs.filter(x => (this.currentChain.ModuleId == DashboardOrderType.RFQ && x.Id == this.currentChain.RfqId)
                        || (this.currentChain.ModuleId == DashboardOrderType.REQ && x.Id == this.currentChain.ReqNo)).forEach(x => x.ApproverList = []);
                    this._orderSrvc._userSrvc._app.SetMessage(MessageTypeEnum.SUCCESS, this._orderSrvc._userSrvc._translate.instant("lbl_updated_success_chain"));
                    this.changeCountInApproverChain = 0;
                    this.overlay = false;
                }
            })
        } else {
            this._orderSrvc._userSrvc._app.SetMessage(MessageTypeEnum.ERROR, this._orderSrvc._userSrvc._translate.instant("lbl_nochanges_done_chain"));//
        }
    }
    get isPCartEnabled(): boolean {
        return this._orderSrvc._userSrvc.GetLocationAccess(LocationConfig.ENABLE_P_CARD, this.OrderInfo.Location.ID) > 0 && this._orderSrvc._userSrvc.GetCustomerAccess(CustomerPrivilege.PCard) > 0;
    }

    isApproverEnable(tab: OrderTabInfoModel): boolean {
        let result = true;
        if (tab.ModuleId == 3 || (tab.ModuleId == 1 && tab.OverAllStatus.ID != 16)) {
            result = false;
        }
        return result;

    }

    get getCSSList() {
        return `${this._orderSrvc._userSrvc._app.appUrl.appRoot}Content/css/bootstrap-3.3.7.css,
        ${this._orderSrvc._userSrvc._app.appUrl.appRoot}xeeva-p2p-home/styles/style.css,
        ${this._orderSrvc._userSrvc._app.appUrl.appRoot}xeeva-p2p-home/styles/rd-subjective-styles.css,`
    }
    printSummary() {
        this.isPrintContent = false;


        let style = `
body{-webkit-print-color-adjust: exact !important;  
    color-adjust: exact !important; }
html, body, h1, h2, h3, h4, p {  margin: 0;}
.msg_OrderPlace{ color: #67ae16;  font-size: 14px; margin-top: 20px;font-weight: 600;}
.msg_OrderDesc h4 {  padding:10px 0 10px 0;font-size: 13px;font-weight: 600;color: #969595;text-transform: uppercase;  }
.msg_AddressDiv{width:100%;display:block;}
.msg_AddressDiv .col-sm-4{display:inline-block;width:33%;vertical-align:top}
.msg_AddressDiv h4 { font-size: 13px;color: #969595;font-weight: 600;text-transform: uppercase;padding: 20px 0 10px 0;}
.msg_AddressDiv h4 span {text-transform: capitalize;font-weight: normal;display: inline-block; padding-left: 3px;}
.font-weight-bold{font-weight:bold}
.add-app{display:none}

.cartSummaryGroup .panel-default > .panel-heading {
margin:10px 0;
    color: #333;
    background-color: transparent;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px;
}
.cartSummaryLine .panel-title  a {
    font-weight: 600;
    font-size: 16px ;
    color: #212121;
text-decoration:none;
}
.cartSummaryLine .panel-title  label {
  padding: 0 10px;
}
.RFQtxt{ border-right: 1px solid #ddd; }
.row{display:block;width:100%;}
.col-sm-12{width:100%;display:block;padding:7px}
.col-sm-9 {width:72%;display:inline-block;padding:7px;vertical-align:top;}
.col-sm-3 {display:inline-block;width:22%;padding:7px;vertical-align:top;}
.col-md-2,.col-sm-2{display:inline-block;width:16%;padding:7px;vertical-align:top;}
.col-md-1 {display:inline-block;width:8%;padding:7px}

.cart-summ-lineDIV {display:block;width:100%;}
.cart-summ-lineDIV .col-md-2{display:inline-block;width:24%;vertical-align:top;}
.cart-summ-lineDIV .col-md-10{display:inline-block;width:72%;vertical-align:top;}
.print-block .col-md-2 ,.print-block .col-md-1 { width: 30%}
.col-md-2 .form-group ,.col-md-1 .form-group{ width: 30%}
 .print-block .form-label{ padding:7px 0;display:block;width:100%;font-size: 11px !important;text-transform: uppercase;
    font-weight: bold;color: #9e9e9e;}
.prod-img {  position:reltaive;display:block;vertical-align:middle;}
img{  visibility: visible;    display: inline; width: 100% !important;height: 100px !important;font-size:100%;font:inherit;vertical-align:baseline }

.total-USD-value{vertical-align:top;text-alighn-right}
`;
        var b = document.getElementById('printBody').innerHTML;
        //window.frames["print_frame"].document.title = 'ORDER DETAILS';
        //window.frames["print_frame"].document.body.innerHTML = '<style>' + style + '</style> ' + b;

        //window.frames["print_frame"].window.focus();
        //window.frames["print_frame"].window.print();
        this.isPrintContent = true;
        //return style

        //2nd method
        let popupWin = window.open("", "_blank", "top=0,left=0,height=auto,width=auto");
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
          <title>${ this._orderSrvc._userSrvc._translate.instant("labl_order_details") }</title>
             <style> ${ style } </style> 
        </head>
        <body>
          ${ b} 
          <script defer>
            function triggerPrint(event) {
              window.removeEventListener('load', triggerPrint, false);
              setTimeout(function() {
                window.print();
                setTimeout(function() { window.close(); }, 0);
              }, 1);
            }
            window.addEventListener('load', triggerPrint, false);
          </script>
        </body>
      </html>`);
        popupWin.document.close();
    }
}
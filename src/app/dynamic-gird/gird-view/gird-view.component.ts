import {
  Component,
  OnInit,
  Renderer,
  ElementRef,
  TemplateRef,
  HostListener,
  ViewChild,
  Renderer2,
  ViewEncapsulation,
} from "@angular/core";
import {
  CdkDragStart,
  CdkDropList,
  moveItemInArray,
  CdkDragDrop,
  CdkDrag,
} from "@angular/cdk/drag-drop";
import { PageChangedEvent } from "ngx-bootstrap/pagination";

@Component({
  selector: "app-gird-view",
  templateUrl: "./gird-view.component.html",
  styleUrls: ["./gird-view.component.scss"],
  //encapsulation: ViewEncapsulation.ShadowDom
})
export class GirdViewComponent implements OnInit {
  allColoumns = [
    {
      propName: "Order Description",
      propKey: "orderDesc",
      col: ["HeaderData", "OrderDescription"],
      active: true,
    },
    {
      propName: "Order",
      propKey: "orderId",
      col: ["HeaderData", "OrderId"],
      active: true,
    },
    {
      propName: "Order Status",
      propKey: "orderStatus",
      col: ["HeaderData", "HeaderStatus"],
      active: true,
    },
    {
      propName: "Supplier",
      propKey: "supplier",
      col: ["HeaderData", "SupplierName"],
      active: true,
    },
    {
      propName: "Order Tracking Id",
      propKey: "orderTracking",
      col: ["HeaderData", "OrderTrackingId"],
      active: false,
    },
    {
      propName: "Location",
      propKey: "location",
      col: ["HeaderData", "LocationName"],
      active: false,
    },
    {
      propName: "Item",
      propKey: "item",
      col: ["HeaderData", "ItemName"],
      active: false,
    },
    {
      propName: "Created Date",
      propKey: "createdDate",
      col: ["HeaderData", "StrCreatedDate"],
      active: false,
    },
    {
      propName: "Total",
      propKey: "total",
      col: ["HeaderData", "grandTotal"],
      active: false,
    },
  ];
  currentDisplayCols = [];
  oldcols = [];
  start;
  pressed = false;
  startX;
  startWidth = 0;
  tableData = []; // TableData;
  renderedData = []; // TableData;
  colDropdown: boolean = false;
  currentResizeIndex: number = null;
  isResizingRight: boolean = false;
  resizableMousemove;
  resizableMouseup;
  previousIndex: number;
  disPlayedcols = [];
  @ViewChild("glowTable", {read:ElementRef}) private tableRef: ElementRef;

  totalItems: number = 30;
  CurrentPage: 0;

  isAscending: boolean = false;
  currentSortID: number = null;
  itemsPerPage=10
  constructor(public renderer: Renderer2) {}

  ngOnInit() {
    //this.setDisplayedColumns();
    //this.tableData=TableData;
    this.currentDisplayCols = this.allColoumns.slice(0, 4);
    for (let i = 0; i < this.totalItems; i++) {
      let num = Math.round(Math.random() * 2);
      console.log(num);
      this.tableData.push(JSON.parse(JSON.stringify(TableData[num])));
      this.tableData[i].Id = i;
    }
    this.renderedData = this.tableData.slice(0, 10);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.currentSortID = null;
    this.renderedData = this.tableData.slice(startItem, endItem);
  }

  duplicate = (item: CdkDrag<any>) => {
    if (item) {
      console.log(item);
      return true;
    }
  };
  sort(i: number) {
    let col: string[] = this.currentDisplayCols[i].col
      ? this.currentDisplayCols[i].col
      : [];
    this.isAscending = !this.isAscending;
    if (col) {
      this.currentSortID = i;
      if (this.isAscending) {
        this.renderedData.sort((a, b) => {
          let ft = a;
          let rt = b;
          col.forEach((x) => {
            ft = ft[x] ?  ft[x] : '';
            rt = rt[x] ? rt[x] : '';
          });
         
          return  0 - (ft > rt ? -1 : 1);
        });
      } else {
        this.renderedData.sort((a, b) => {
          let ft = a;
          let rt = b;
          col.forEach((x) => {
            ft = ft[x] ?  ft[x] : '';
            rt = rt[x] ? rt[x] : '';
          });
          return 0 - (ft > rt ? 1 : -1);
        });
      }
    }
    // Ascending
    //values.sort((a,b) => 0 - (a > b ? -1 : 1));

    // Descending
    //values.sort((a,b) => 0 - (a > b ? 1 : -1));
  }
  checkSorted(col, i): string {
    if (this.currentSortID === i) {
      if (this.isAscending) {
        return "fa-sort-asc";
      } else return "fa-sort-desc";
    }
    return "";
  }
  dragStarted(event: CdkDragStart, index: number) {
    this.previousIndex = index;
  }

  dropListDropped(event: CdkDragDrop<string[]>) {
    if (event && event.currentIndex != 0) {
      moveItemInArray(
        this.currentDisplayCols,
        event.previousIndex,
        event.currentIndex
      );

      //this.setDisplayedColumns()
    } else event.item.reset();
  }

  onActiveColChange(col) {
    if (col.active) {
      this.currentDisplayCols.push(col);
    } else {
      let index = this.currentDisplayCols.findIndex(
        (x) => x.propKey == col.propKey
      );
      this.currentDisplayCols.splice(index, 1);
    }
  }

  onMouseDown(event, index) {
    this.start = event.target;
    this.pressed = true;
    this.startX = event.clientX;
    this.checkResizing(event, index);
    this.startWidth = event.target.clientWidth; //jQuery(this.start).parent().width();
    event.preventDefault();
    this.initResizableColumns(index);
  }

  initResizableColumns(ind) {
    this.renderer.listen("document", "mousemove", (event) => {
      if (this.pressed) {
        let width = this.startWidth + (event.clientX - this.startX);
        this.tableRef.nativeElement.children[0].children[0].children[
          ind
        ].style.width = width + "px";
        //jQuery(this.start).parent().css({ 'width': width });
        let index = ind + 1;
        let trcont = this.tableRef.nativeElement.children[1].children;
        if (trcont && trcont.length) {
          for (let i = 0; i < trcont.length; i++)
            trcont[i].children[ind].setAttribute(
              "style",
              "width:" + width + "px"
            );
        }
        // jQuery(".glowTableBody tr td:nth-child(" + index + ")").css({
        //   'width': width,
        // });
      }
    });
    this.renderer.listen("document", "mouseup", (event) => {
      if (this.pressed) {
        this.pressed = false;
      }
    });
  }
  /*
  setTableResize(tableWidth: number) {
    let totWidth = 0;
    this.columns.forEach((column) => {
      totWidth += column.width;
    });
    const scale = (tableWidth - 5) / totWidth;
    this.columns.forEach((column) => {
      column.width *= scale;
      this.setColumnWidth(column);
    });
  }

 */

  onResizeColumn(event: any, index: number) {
    this.checkResizing(event, index);
    this.currentResizeIndex = index;
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = this.tableRef.nativeElement.children[0].children[0].children[
      index
    ].offsetWidth;
    event.preventDefault();
    this.mouseMove(index);
  }

  private checkResizing(event, index) {
    const cellData = this.getCellData(index);
    if (
      index === 0 ||
      (Math.abs(event.pageX - cellData.right) < cellData.width / 2 &&
        index !== this.currentDisplayCols.length - 1)
    ) {
      this.isResizingRight = true;
    } else {
      this.isResizingRight = false;
    }
  }

  private getCellData(index: number) {
    const headerRow = this.tableRef.nativeElement.children[0].children[0];
    const cell = headerRow.children[index];
    return cell.getBoundingClientRect();
  }

  mouseMove(index: number) {
    this.resizableMousemove = this.renderer.listen(
      "document",
      "mousemove",
      (event) => {
        if (this.pressed && event.buttons) {
          const dx = this.isResizingRight
            ? event.pageX - this.startX
            : -event.pageX + this.startX;
          const width = this.startWidth + dx;
          if (this.currentResizeIndex === index && width > 50) {
            this.setColumnWidthChanges(index, width);
          }
        }
      }
    );
    this.resizableMouseup = this.renderer.listen(
      "document",
      "mouseup",
      (event) => {
        if (this.pressed) {
          this.pressed = false;
          this.currentResizeIndex = -1;
          this.resizableMousemove();
          this.resizableMouseup();
        }
      }
    );
  }

  setColumnWidthChanges(index: number, width: number) {
    const headerRow = this.tableRef.nativeElement.children[0].children[0];
    const orgWidth = headerRow.children[index].offsetWidth; //jQuery(headerRow.children[index]).width();
    const dx = width - orgWidth;
    if (dx !== 0) {
      const j = this.isResizingRight ? index + 1 : index - 1;
      const newWidth = headerRow.children[j].offsetWidth - dx; //jQuery(headerRow.children[j]).width() - dx;
      if (newWidth > 50) {
        this.setColumnWidth(index, width);

        this.setColumnWidth(j, newWidth);
      }
    }
  }

  setColumnWidth(ind: any, width) {
    this.tableRef.nativeElement.children[0].children[0].children[
      ind
    ].style.width = width + "px";

    let trcont = this.tableRef.nativeElement.children[1].children;
    if (trcont && trcont.length) {
      for (let i = 0; i < trcont.length; i++)
        trcont[i].children[ind].setAttribute("style", "width:" + width + "px");
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    //this.setTableResize(this.tableRef.nativeElement.clientWidth);
  }
}

export const TableData = [
  {
    Id: 29523,
    totalRows: null,
    dashboardTabType: 0,
    HeaderData: {
      ItemName: "Notebook",
      LocationName: "MAGNA DECOPLAS",
      LocationId: 191,
      RequestedUserName: null,
      RequestedUserId: 5359,
      OrderId: 11713,
      RfqID: 8454,
      ReqID: null,
      PoID: null,
      CreatedDate: "/Date(1586879425000)/",
      OrderTrackingId: 29523,
      OrderDescription: "Orders",
      StrCreatedDate: "4/15/2020",
      PoIssueDate: null,
      StrPoIssueDate: "NA",
      LastUserActionDate: "/Date(1586879425000)/",
      strLastUserActionDate: "4/14/2020",
      HasComments: true,
      CommentsCount: 1,
      returnComments: null,
      rejectComments: null,
      grandTotal: 345,
      HeaderStatus: "RFQ - Pending Validation with Buyer ",
      HeaderstatusId: 5,
      SupplierName: null,
      POCode: null,
      CurrencyCode: "USD",
      NTE: null,
      RFQ_LINE_MODIFIED_DATE: null,
      REQ_MODIFIED_DATE: null,
      AmsPushFlag: null,
      REQPath: "RFQ",
      ItemType: null,
      LastUserActionDays: 0,
      approvalType: 1,
      orderType: 2,
      IsSingleVendor: 0,
      ServiceFlag: 0,
    },
    supplierList: [],
    poCodeList: [
      {
        pocodeName: null,
        pocodeId: null,
        Supplier: null,
        poIssueDate: null,
        POIssueDateStr: "NA",
        LineNumber: null,
      },
    ],
    lineStatusInfo: [
      {
        lineId: null,
        statusId: 1,
        statusName: null,
      },
    ],
    GLCCList: [
      {
        GLCCData: {
          OrderId: 11713,
          OrderDescription: null,
          GLId: 1301,
          GLName: null,
          CostCenterId: 70338,
          CostCenterName: null,
        },
        OrderLineItemList: [
          {
            ItemName: "Notebook",
            Status: null,
            StatusId: 1,
            SupplierName: null,
            Quantity: 1,
            UnitPrice: 345,
            TotalPrice: 345,
            CurrencyCode: "USD",
            requiredByDate: null,
            ProductSku: "244001-093296T",
            strRequiredByDate: "",
          },
        ],
      },
    ],
    assignUserList: [],
  },
  {
    Id: 29519,
    totalRows: null,
    dashboardTabType: 0,
    HeaderData: {
      ItemName: "Notebook",
      LocationName: "MAGNA DECOPLAS",
      LocationId: 191,
      RequestedUserName: null,
      RequestedUserId: 5359,
      OrderId: 11708,
      RfqID: 8450,
      ReqID: null,
      PoID: null,
      CreatedDate: "/Date(1586874489000)/",
      OrderTrackingId: 29519,
      OrderDescription: null,
      StrCreatedDate: "4/16/2020",
      PoIssueDate: null,
      StrPoIssueDate: "NA",
      LastUserActionDate: "/Date(1586874489000)/",
      strLastUserActionDate: "4/14/2020",
      HasComments: false,
      CommentsCount: null,
      returnComments: null,
      rejectComments: null,
      grandTotal: 350,
      HeaderStatus: "RFQ - Pending Validation with Buyer ",
      HeaderstatusId: 5,
      SupplierName: null,
      POCode: null,
      CurrencyCode: "USD",
      NTE: null,
      RFQ_LINE_MODIFIED_DATE: null,
      REQ_MODIFIED_DATE: null,
      AmsPushFlag: null,
      REQPath: "RFQ",
      ItemType: null,
      LastUserActionDays: 0,
      approvalType: 1,
      orderType: 2,
      IsSingleVendor: 0,
      ServiceFlag: 0,
    },
    supplierList: [],
    poCodeList: [
      {
        pocodeName: null,
        pocodeId: null,
        Supplier: null,
        poIssueDate: null,
        POIssueDateStr: "NA",
        LineNumber: null,
      },
    ],
    lineStatusInfo: [
      {
        lineId: null,
        statusId: 1,
        statusName: null,
      },
    ],
    GLCCList: [
      {
        GLCCData: {
          OrderId: 11708,
          OrderDescription: null,
          GLId: 1301,
          GLName: null,
          CostCenterId: 70338,
          CostCenterName: null,
        },
        OrderLineItemList: [
          {
            ItemName: "Notebook",
            Status: null,
            StatusId: 1,
            SupplierName: null,
            Quantity: 1,
            UnitPrice: 350,
            TotalPrice: 350,
            CurrencyCode: "USD",
            requiredByDate: null,
            ProductSku: "244001-093294T",
            strRequiredByDate: "",
          },
        ],
      },
    ],
    assignUserList: [],
  },
  {
    Id: 29517,
    totalRows: null,
    dashboardTabType: 0,
    HeaderData: {
      ItemName: "Cell Phone",
      LocationName: "MAGNA DECOPLAS",
      LocationId: 191,
      RequestedUserName: null,
      RequestedUserId: 5359,
      OrderId: 11706,
      RfqID: 8449,
      ReqID: null,
      PoID: null,
      CreatedDate: "/Date(1586864324000)/",
      OrderTrackingId: 29517,
      OrderDescription: "Hardware items ",
      StrCreatedDate: "4/14/2020",
      PoIssueDate: null,
      StrPoIssueDate: "NA",
      LastUserActionDate: "/Date(1586864324000)/",
      strLastUserActionDate: "4/14/2020",
      HasComments: true,
      CommentsCount: 1,
      returnComments: null,
      rejectComments: null,
      grandTotal: 3,
      HeaderStatus: "RFQ - Pending Validation with Buyer ",
      HeaderstatusId: 5,
      SupplierName: null,
      POCode: null,
      CurrencyCode: "USD",
      NTE: null,
      RFQ_LINE_MODIFIED_DATE: null,
      REQ_MODIFIED_DATE: null,
      AmsPushFlag: null,
      REQPath: "RFQ",
      ItemType: null,
      LastUserActionDays: 0,
      approvalType: 1,
      orderType: 2,
      IsSingleVendor: 0,
      ServiceFlag: 0,
    },
    supplierList: [],
    poCodeList: [
      {
        pocodeName: null,
        pocodeId: null,
        Supplier: null,
        poIssueDate: null,
        POIssueDateStr: "NA",
        LineNumber: null,
      },
      {
        pocodeName: null,
        pocodeId: null,
        Supplier: null,
        poIssueDate: null,
        POIssueDateStr: "NA",
        LineNumber: null,
      },
    ],
    lineStatusInfo: [
      {
        lineId: null,
        statusId: 1,
        statusName: null,
      },
      {
        lineId: null,
        statusId: 1,
        statusName: null,
      },
    ],
    GLCCList: [
      {
        GLCCData: {
          OrderId: 11706,
          OrderDescription: null,
          GLId: 1314,
          GLName: null,
          CostCenterId: 70338,
          CostCenterName: null,
        },
        OrderLineItemList: [
          {
            ItemName: "Cell Phone",
            Status: null,
            StatusId: 1,
            SupplierName: null,
            Quantity: 2,
            UnitPrice: 1,
            TotalPrice: 2,
            CurrencyCode: "USD",
            requiredByDate: null,
            ProductSku: "01001-01711",
            strRequiredByDate: "",
          },
          {
            ItemName: "EPRESENT USB CAR CHARGER FOR IPHONE, IPOD, BLACKBERRY",
            Status: null,
            StatusId: 1,
            SupplierName: null,
            Quantity: 1,
            UnitPrice: 1,
            TotalPrice: 1,
            CurrencyCode: "USD",
            requiredByDate: null,
            ProductSku: "01001-87116",
            strRequiredByDate: "",
          },
        ],
      },
    ],
    assignUserList: [],
  },
];

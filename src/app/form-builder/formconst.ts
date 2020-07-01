export const layout = {
  Name: "Form1",
  Layout: [
    {
      col: 1,
      seq: 1,
      control: [
        { Key: "itemdesc", Type: "TextBox", controlType: 5, Required: true },
      ],
    },
    {
      col: 3,
      seq: 2,
      control: [
        { Key: "unitPrice", Type: "TextBox", controlType: 2, Required: "true" },
        { Key: "Qunatity", Type: "TextBox", controlType: 2, Required: true },
        { Key: "Mfg", Type: "TextBox", controlType: 1, Required: false },
      ],
    },
    {
      col: 2,
      seq: 3,
      control: [
        { Key: "ReqDate", Type: "Date", controlType: 6, Required: true },
        { Key: "uom", Type: "Dropdown", controlType: 3, Required: true },
      ],
    },
  ],
};

export const controls = {
  dropdown: [
    {
      name: "years of exp",
      isRequired: true,
      Type: "dropdown",
      controlType: 3,
    },
    {
      name: "uom",
      isRequired: true,
      Type: "dropdown",
      controlType: 3,
    },
  ],
  TextBox: [
    {
      name: "mfg",
      isRequired: false,
      Type: "textbox",
      controlType: 1,
    },
    {
      name: "mfg part no",
      isRequired: false,
      Type: "textbox",
      controlType: 1,
    },
    {
      name: "quantity",
      isRequired: false,
      Type: "textbox",
      controlType: 2,
    },
    {
      name: "unit price",
      isRequired: false,
      Type: "textbox",
      controlType: 2,
    },
  ],
  label: [
    {
      name: "section header",
      isRequired: true,
      Type: "textArea",
      controlType: 7,
    },
    {
      name: "Comments",
      isRequired: false,
      Type: "textArea",
      controlType: 7,
    },
  ],
  textArea: [
    {
      name: "item description",
      isRequired: true,
      Type: "textArea",
      controlType: 5,
    },
    {
      name: "Comments",
      isRequired: false,
      Type: "textArea",
      controlType: 5,
    },
  ],
};


export const PreDefinedControls =  [
    {
      name: "taxclass",
      isRequired: true,
      Type: "dropdown",
      controlType: 3,
    },
    {
      name: "taxcode",
      isRequired: true,
      Type: "dropdown",
      controlType: 3,
    },
    {
      name: "mfr auto complete",
      isRequired: true,
      Type: "auto complete",
      controlType: 8,
    },
    
  ]

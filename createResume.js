const docx = require("docx");
const fs = require("fs");
const { 
  Document, Paragraph, TextRun, Table, TableRow, TableCell, 
  WidthType, BorderStyle, AlignmentType, HeadingLevel, TableLayoutType
} = docx;

// Create document
const doc = new Document({
  sections: [{
    properties: {},
    children: [
      // Name and title
      new Paragraph({
        children: [
          new TextRun({
            text: "Rahul Prakash Shrivastav",
            bold: true,
            size: 28,
          }),
          new TextRun({
            text: ", Senior Executive",
            size: 28,
          }),
        ],
        alignment: AlignmentType.CENTER,
      }),
      
      // Separator line
      new Paragraph({
        children: [
          new TextRun({
            text: "___________________________________________________________________",
          }),
        ],
        spacing: {
          before: 400,
          after: 400,
        },
      }),
      
      // Profile Section
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 20,
                  type: WidthType.PERCENTAGE,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "PROFILE",
                        bold: true,
                      }),
                    ],
                  }),
                ],
                verticalAlign: AlignmentType.TOP,
              }),
              new TableCell({
                width: {
                  size: 80,
                  type: WidthType.PERCENTAGE,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Dynamic Senior Executive with extensive experience across prominent firms, demonstrating a proven ability to excel in high-pressure environments. Expertise includes effective communication, active listening, and strong adaptability, facilitating seamless collaboration and problem-solving. A history of engaging with diverse teams to achieve operational excellence and enhance customer satisfaction. Committed to leveraging skills in dynamic settings to drive success and meet organizational goals."
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
        tableLayout: TableLayoutType.FIXED,
      }),
      
      // Separator line
      new Paragraph({
        children: [
          new TextRun({
            text: "___________________________________________________________________",
          }),
        ],
        spacing: {
          before: 400,
          after: 400,
        },
      }),
      
      // Employment History Section Title
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "EMPLOYMENT HISTORY",
                        bold: true,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
        tableLayout: TableLayoutType.FIXED,
      }),
      
      // Info Vision And Serco
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 20,
                  type: WidthType.PERCENTAGE,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "2008 — 2011",
                      }),
                    ],
                  }),
                ],
                verticalAlign: AlignmentType.TOP,
              }),
              new TableCell({
                width: {
                  size: 80,
                  type: WidthType.PERCENTAGE,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Senior Executive, Info Vision And Serco",
                        bold: true,
                      }),
                    ],
                    spacing: { before: 200 },
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "In the capacity of Senior Executive at Info Vision And Serco, responsibilities encompassed leading a team to achieve service excellence. The role involved coordinating with various departments to ensure smooth operations and high-quality service delivery. Strong leadership and communication skills were essential to navigate challenges and drive success."
                      }),
                    ],
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "• Led a team to consistently meet and exceed service delivery targets." }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "• Facilitated cross-departmental collaboration to enhance operational efficiency." }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "• Recognized for contributions to improving customer experience and satisfaction." }),
                    ],
                    spacing: { after: 200 },
                  }),
                ],
              }),
            ],
          }),
        ],
        tableLayout: TableLayoutType.FIXED,
      }),
      
      // Teletech India
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 20,
                  type: WidthType.PERCENTAGE,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "2005 — 2006",
                      }),
                    ],
                  }),
                ],
                verticalAlign: AlignmentType.TOP,
              }),
              new TableCell({
                width: {
                  size: 80,
                  type: WidthType.PERCENTAGE,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Senior Executive, Teletech India",
                        bold: true,
                      }),
                    ],
                    spacing: { before: 200 },
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Held the position of Senior Executive at Teletech India, where responsibilities included managing customer interactions and ensuring high-quality service delivery. This role demanded a strong ability to communicate effectively with clients and address their needs promptly. Strategies were implemented to enhance customer satisfaction and improve overall service efficiency."
                      }),
                    ],
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "• Successfully managed customer interactions, enhancing overall satisfaction levels." }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "• Developed and implemented strategies that improved service delivery efficiency." }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "• Achieved recognition for outstanding performance in customer service metrics." }),
                    ],
                    spacing: { after: 200 },
                  }),
                ],
              }),
            ],
          }),
        ],
        tableLayout: TableLayoutType.FIXED,
      }),
      
      // GE CAPITAL
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 20,
                  type: WidthType.PERCENTAGE,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "2004 — 2005",
                      }),
                    ],
                  }),
                ],
                verticalAlign: AlignmentType.TOP,
              }),
              new TableCell({
                width: {
                  size: 80,
                  type: WidthType.PERCENTAGE,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Senior Executive, GE CAPITAL",
                        bold: true,
                      }),
                    ],
                    spacing: { before: 200 },
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Served as a Senior Executive at GE CAPITAL, where the focus was on optimizing client relations and operational processes. Responsibilities included addressing customer inquiries and providing tailored solutions. A proactive approach was taken to identify areas for improvement in service delivery."
                      }),
                    ],
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "• Enhanced client satisfaction through effective communication and problem resolution." }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "• Identified and implemented process improvements that streamlined operations." }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: "• Played a key role in achieving organizational performance goals." }),
                    ],
                    spacing: { after: 200 },
                  }),
                ],
              }),
            ],
          }),
        ],
        tableLayout: TableLayoutType.FIXED,
      }),
      
      // Separator line
      new Paragraph({
        children: [
          new TextRun({
            text: "___________________________________________________________________",
          }),
        ],
        spacing: {
          before: 400,
          after: 400,
        },
      }),
      
      // Education Section
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 20,
                  type: WidthType.PERCENTAGE,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "EDUCATION",
                        bold: true,
                      }),
                    ],
                  }),
                ],
                verticalAlign: AlignmentType.TOP,
              }),
              new TableCell({
                width: {
                  size: 80,
                  type: WidthType.PERCENTAGE,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Bachelor of Arts, Wilson College Mumbai",
                      }),
                    ],
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "10th grade, Christian Inter College Jhansi",
                      }),
                    ],
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "12th Grade, Wilson College Mumbai",
                      }),
                    ],
                    spacing: { before: 200, after: 200 },
                  }),
                ],
              }),
            ],
          }),
        ],
        tableLayout: TableLayoutType.FIXED,
      }),
      
      // Separator line
      new Paragraph({
        children: [
          new TextRun({
            text: "___________________________________________________________________",
          }),
        ],
        spacing: {
          before: 400,
          after: 400,
        },
      }),
      
      // Skills Section
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 20,
                  type: WidthType.PERCENTAGE,
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "SKILLS",
                        bold: true,
                      }),
                    ],
                  }),
                ],
                verticalAlign: AlignmentType.TOP,
              }),
              new TableCell({
                width: {
                  size: 80,
                  type: WidthType.PERCENTAGE,
                },
                children: [
                  new Table({
                    width: {
                      size: 100,
                      type: WidthType.PERCENTAGE,
                    },
                    rows: [
                      new TableRow({
                        children: [
                          new TableCell({
                            width: {
                              size: 33,
                              type: WidthType.PERCENTAGE,
                            },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "effective communication",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            width: {
                              size: 17,
                              type: WidthType.PERCENTAGE,
                            },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "Expert",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            width: {
                              size: 33,
                              type: WidthType.PERCENTAGE,
                            },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "service delivery",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            width: {
                              size: 17,
                              type: WidthType.PERCENTAGE,
                            },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "Expert",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableRow({
                        children: [
                          new TableCell({
                            width: {
                              size: 33,
                              type: WidthType.PERCENTAGE,
                            },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "customer satisfaction",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            width: {
                              size: 17,
                              type: WidthType.PERCENTAGE,
                            },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "Expert",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            width: {
                              size: 33,
                              type: WidthType.PERCENTAGE,
                            },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "operational efficiency",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            width: {
                              size: 17,
                              type: WidthType.PERCENTAGE,
                            },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "Expert",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableRow({
                        children: [
                          new TableCell({
                            width: {
                              size: 33,
                              type: WidthType.PERCENTAGE,
                            },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "problem resolution",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            width: {
                              size: 17,
                              type: WidthType.PERCENTAGE,
                            },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "Expert",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            width: {
                              size: 33,
                              type: WidthType.PERCENTAGE,
                            },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "team leadership",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          new TableCell({
                            width: {
                              size: 17,
                              type: WidthType.PERCENTAGE,
                            },
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: "Expert",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                    tableLayout: TableLayoutType.FIXED,
                  }),
                ],
              }),
            ],
          }),
        ],
        tableLayout: TableLayoutType.FIXED,
      }),
    ],
  }],
});

// Generate document
docx.Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("resume_files/Rahul_Prakash_Shrivastav_Resume.docx", buffer);
  console.log("Document created successfully at resume_files/Rahul_Prakash_Shrivastav_Resume.docx");
}); 
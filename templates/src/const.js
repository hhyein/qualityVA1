export const mainLayout1Style = {
  gridTemplateRows: "100px 400px 100px 500px 300px",
  gridTemplateAreas: `
    'title title'
    'table-chart horizontal-bar-chart'
    'tree-chart tree-chart'
    'vertical-bar-chart scatter-chart'
    'other-chart other-chart'
  `,
}

export const mainLayout2Style = {
  gridGap: "10px",
  gridTemplateColumns: "300px 900px 300px",
  gridTemplateRows: "80px 130px 190px 110px 100px 200px",
  gridTemplateAreas: `
    'dataset overview tree-chart'
    'setting overview tree-chart'
    'setting class-level tree-chart'
    'table-chart class-level model'
    'table-chart instance-level model'
    'visualization instance-level model'
  `,
}

export const boxTitles = {
  dataset: "dataset upload",
  setting: "setting",
  "table-chart": "dataset",
  visualization: "nl4dv",
  overview: "overview",
  "class-level": "class level",
  "instance-level": "instance level",
  "tree-chart": "action log",
  model: "model accuracy",
}

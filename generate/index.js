const fs = require("fs")
const path = require("path")

// import fs from "fs"
// import path from "path"

const data = {
  PROVIDES: {
    TITLE: "Provides",
    CHILDREN: {
      APP: "App",
      I18N: "Internationalization",
      BREAKPOINT: "Breakpoint"
    }
  },
  COMPONENTS: {
    TITLE: "Components",
    CHILDREN: {
      BUTTON: "Button",
      INPUT: "Input",
      FORM: "Form",
      RULE: "Rule",
      TABLE: "Table",
      PAGINATION: "Pagination",
      CHECKBOX: "Checkbox",
      RADIO: "Radio",
      SELECT: "Select",
      SWITCH: "Switch",
      FOCUS: "Focus",
      POPOVER: "Popover",
      TOOLTIP: "Tooltip",
      DIALOG: "Dialog",
      IMAGE: "Image",
      CALENDAR: "Calendar"
    }
  },
  HOOKS: {
    TITLE: "Hooks",
    CHILDREN: {
      SIZE: "Size",
      SCROLL: "Scroll",
      COUNTDOWN: "Countdown",
      // HTML_LOCKER: "HTML Locker",
      INTERSECT: "Intersect",
      ID: "ID",
      SPRING: "Spring",
      PROMISE: "Promise"
    }
  },
  DIRECTIVES: {
    TITLE: "directives",
    CHILDREN: {
      FOCUS: "Focus",
      INTERSECT: "Intersect",
      LAZY: "Lazy"
    }
  },
  OTHERS: {
    TITLE: "Other",
    CHILDREN: {
      ICON: "Icon",
      HTTP: "HTTP",
      PAGE: "Page"
    }
  },
  UTILS: {
    TITLE: "Utils",
    CHILDREN: {
      ARRAY: "Array",
      OBJECT: "Object",
      STRING: "String",
      NUMBER: "Number",
      DATE: "Date",
      MONEY: "Money",
      RANDOM: "Random",
      RANGE: "Range",
      RULE: "Rule",
      FRAGMENT: "Fragment"
    }
  },
  WINDOWS: {
    TITLE: "Windows",
    CHILDREN: {
      ELEMENT: "Element",
      EVENT: "Event",
      IO: "IO",
      STORAGE: "Storage"
    }
  }
}

//小写转首字母大写
function upperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

const constants = []

Object.keys(data).forEach((key) => {
  const menuUrl = path.join(__dirname, key.toLowerCase())
  fs.mkdirSync(menuUrl)
  Object.keys(data[key].CHILDREN).forEach((childKey) => {
    const constant = `${key.toUpperCase()}_${childKey.toUpperCase()}`
    constants.push(constant)
    const modulePath = path.join(menuUrl, childKey.toLowerCase())
    fs.mkdirSync(modulePath)

    fs.writeFileSync(
      path.join(modulePath, "index.vue"),
      `<template><div>${childKey.toLowerCase()}</div></template>
<script lang="ts" setup></script>
<style lang="scss" scoped></style>
`,
      "utf8"
    )

    fs.writeFileSync(
      path.join(modulePath, "router.ts"),
      `import { defineAsyncComponent } from "vue"
import { RouteRecordRaw } from "vue-router"
import { MenuEnum } from "@/components/layouts/constants"

export const ${childKey.toLowerCase()}Routes: Array<RouteRecordRaw> = [
  {
    path: "/${key.toLowerCase()}/${childKey.toLowerCase()}",
    name: "${upperCase(key.toLowerCase())}:${upperCase(
        childKey.toLowerCase()
      )}",
    props: true,
    meta:{
      menu: MenuEnum.${constant},
    },
    component: defineAsyncComponent(() => import("./index.vue"))
  }
]
`,
      "utf8"
    )
  })

  fs.writeFileSync(
    path.join(menuUrl, "router.ts"),
    Object.keys(data[key].CHILDREN)
      .map(
        (it) =>
          `import { ${it.toLowerCase()}Routes } from "./${it.toLowerCase()}/router"`
      )
      .join("\n") +
      "\n" +
      `export const ${key.toLowerCase()}Routes = [\n  ` +
      Object.keys(data[key].CHILDREN)
        .map((it) => `...${it.toLowerCase()}Routes`)
        .join(",\n  ") +
      `\n]\n`,

    "utf8"
  )
})

fs.writeFileSync(
  path.join(__dirname, "constants.ts"),
  `export enum MenuEnum {\n  ` + constants.join(",\n  ") + `\n}\n`,
  "utf8"
)

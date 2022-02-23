<template>
  <QueryParamsInput :model="queryParamsModel" @query="query"></QueryParamsInput>
  <NDataTable
    :bordered="false"
    :columns="columns"
    :data="data"
    :row-key="(row) => row.name"
    v-model:checked-row-keys="a"
  />
</template>
<script lang="tsx" setup>
import { QueryParamsType } from "@/components/pages/query-params-input/constants"
import QueryParamsInput from "@/components/pages/query-params-input/index.vue"
import { QueryParamsModel } from "@/components/pages/query-params-input/models"
import { faker } from "@faker-js/faker"
import { NButton, NDataTable } from "naive-ui"
import type { TableColumns } from "naive-ui/lib/data-table/src/interface"
const queryParamsModel = {
  name: new QueryParamsModel(
    "角色名称：",
    QueryParamsType.String,
    "请输入名称"
  ),
  createDate: new QueryParamsModel(
    "创建时间",
    QueryParamsType.DateRange,
    "请选择创建时间"
  )
}

const query = (value: any) => {
  console.log(value)
}

const columns: TableColumns = [
  {
    type: "selection",
    disabled: (row) => row.name === "Maureen Schaden"
  },
  {
    title: "角色名称",
    key: "name"
  },
  {
    title: "创建时间",
    key: "createDate"
  },
  {
    title: "操作",
    key: "action",
    render(row: any) {
      return <NButton>查看</NButton>
    }
  }
]

let data = $ref(
  Array.from({ length: 20 }).map((it) => ({
    name: faker.name.findName(),
    createDate: faker.date.recent().toDateString()
  }))
)

let a = $ref([])
</script>
<style lang="scss" scoped></style>

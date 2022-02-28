<template>
  <QueryParamsInput
    :model="queryParamsModel"
    @query="query"
    :default-value="plainToClass(QueryParams, route.query)"
    @reset-sort="handleResetSorter"
  ></QueryParamsInput>
  <NForm class="mb-4">
    <NButton type="success" @click="$edit?.show()">新增</NButton>
  </NForm>
  <NDataTable
    remote
    :loading="loading"
    :bordered="false"
    :columns="columns"
    :data="currentPage?.items"
    :row-key="(row) => row.id"
    :pagination="pagination"
    @update:sorter="handleSorter"
  />
  <Edit
    ref="$edit"
    @confirm="(goTop) => changePage(goTop ? 1 : pagination.page)"
  ></Edit>
</template>
<script lang="tsx" setup>
import { useSort } from "@/assets/modules/base/hooks/sort.hook"
import {
  UseState,
  UseStateDictionary
} from "@/assets/modules/biz/dictionaries/use-state.dictionaries"
import { QueryParams } from "@/assets/modules/biz/dtos/category.dto"
import { categoryService } from "@/assets/modules/biz/services/category.service"
import { Category } from "@/assets/modules/biz/vos/category.vo"
import { usePaging } from "@/assets/page/paging.hook"
import { format } from "@/assets/share/utils/date.util"
import { QueryParamsType } from "@/components/pages/query-params-input/constants"
import QueryParamsInput from "@/components/pages/query-params-input/index.vue"
import { QueryParamsModel } from "@/components/pages/query-params-input/models"
import { instanceToPlain, plainToClass } from "class-transformer"
import { NButton, NDataTable, NForm } from "naive-ui"
import type { TableColumns } from "naive-ui/lib/data-table/src/interface"
import { reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import Edit from "./components/edit.vue"

const route = useRoute()
const router = useRouter()
const queryParamsModel = {
  name: new QueryParamsModel("名称：", QueryParamsType.String, "请输入名称"),
  createDate: new QueryParamsModel(
    "创建时间",
    QueryParamsType.DateRange,
    "请选择创建时间"
  ),
  useState: new QueryParamsModel(
    "使用状态",
    QueryParamsType.Select,
    "请选择使用状态",
    Object.keys(UseStateDictionary).map((key: string) => ({
      label: UseStateDictionary[key as unknown as UseState],
      value: Number(key)
    }))
  )
}

let {
  currentPage,
  loading,
  pagination,
  query,
  changePage,
  getOrderString,
  changeSort,
  resetSort
} = $(
  usePaging(
    (routerCriteria) => plainToClass(QueryParams, routerCriteria),
    (criteria) => categoryService.paging(criteria),
    (criteria) =>
      router.replace({
        path: "/biz/category",
        query: instanceToPlain(criteria)
      })
  )
)

let $edit = $ref<any | undefined>()

const columns: TableColumns<Category> = [
  // {
  //   type: "selection",
  //   disabled: (row) => row.name === "Maureen Schaden"
  // },
  reactive({
    title: "名称",
    key: "name",
    render(row) {
      return (
        <NButton
          text
          onClick={() =>
            router.push({
              path: "/biz/product",
              query: {
                categoryIdList: [row.id]
              }
            })
          }
        >
          {row.name}
        </NButton>
      )
    }
  }),
  reactive({
    title: "创建时间",
    key: "createDate",
    sortOrder: getOrderString("createDate"),
    sorter: true,
    render(row) {
      return format(row.createDate)
    }
  }),
  {
    title: "使用状态",
    key: "useState",
    render(row) {
      return UseStateDictionary[row.useState]
    }
  },
  {
    title: "操作",
    key: "action",
    render(row) {
      return (
        <NButton
          quaternary
          size="small"
          type="success"
          onClick={() => $edit?.show(row.id)}
          disabled={row.useState === UseState.Used}
        >
          编辑
        </NButton>
      )
    }
  }
]

const { handleSorter, handleResetSorter } = useSort(columns, {
  changeSort,
  resetSort,
  getOrderString
})
</script>
<style lang="scss" scoped></style>

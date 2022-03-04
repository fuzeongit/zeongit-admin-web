<template>
  <QueryParamsInput
    :model="queryParamsModel"
    @query="query"
    :default-value="plainToClass(QueryParams, route.query)"
    @reset-sort="handleResetSorter"
  ></QueryParamsInput>
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
</template>
<script lang="tsx" setup>
import { useSort } from "@/assets/modules/base/hooks/sort.hook"
import {
  OrderState,
  OrderStateDictionary
} from "@/assets/modules/biz/dictionaries/order-state.dictionary"
import { QueryParams } from "@/assets/modules/biz/dtos/order.dto"
import { orderService } from "@/assets/modules/biz/services/order.service"
import { Order } from "@/assets/modules/biz/vos/order.vo"
import { usePaging } from "@/assets/page/paging.hook"
import { format } from "@/assets/share/utils/date.util"
import { QueryParamsType } from "@/components/pages/query-params-input/constants"
import QueryParamsInput from "@/components/pages/query-params-input/index.vue"
import { QueryParamsModel } from "@/components/pages/query-params-input/models"
import { instanceToPlain, plainToClass } from "class-transformer"
import { NButton, NDataTable } from "naive-ui"
import type { TableColumns } from "naive-ui/lib/data-table/src/interface"
import { reactive } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const queryParamsModel = {
  title: new QueryParamsModel(
    "商品标题：",
    QueryParamsType.String,
    "请输入商品标题"
  ),
  createDate: new QueryParamsModel(
    "创建时间",
    QueryParamsType.DateRange,
    "请选择创建时间"
  ),
  state: new QueryParamsModel(
    "订单状态",
    QueryParamsType.Select,
    "请选择订单状态",
    Object.keys(OrderStateDictionary).map((key: string) => ({
      label: OrderStateDictionary[key as unknown as OrderState],
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
    (criteria) => orderService.paging(criteria),
    (criteria) =>
      router.replace({
        path: "/biz/order",
        query: instanceToPlain(criteria)
      })
  )
)

const columns: TableColumns<Order> = [
  reactive({
    title: "创建时间",
    key: "createDate",
    sortOrder: getOrderString("createDate"),
    sorter: true,
    render(row) {
      return format(row.createDate)
    }
  }),
  reactive({
    title: "原金额",
    key: "sourceAmount",
    sortOrder: getOrderString("sourceAmount"),
    sorter: true
  }),
  reactive({
    title: "真实金额",
    key: "amount",
    sortOrder: getOrderString("amount"),
    sorter: true
  }),
  {
    title: "订单状态",
    key: "state",
    render(row) {
      return OrderStateDictionary[row.state]
    }
  },
  {
    title: "操作",
    key: "action",
    render(row) {
      return (
        <NButton quaternary size="small" type="success">
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

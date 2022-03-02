<template>
  <QueryParamsInput
    :model="queryParamsModel"
    @query="query"
    :default-value="plainToClass(QueryParams, route.query)"
    @reset-sort="handleResetSorter"
  ></QueryParamsInput>
  <NForm class="mb-4"> </NForm>
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
  <GiveCoupon ref="$giveCoupon"></GiveCoupon>
</template>
<script lang="tsx" setup>
import { useFunction } from "@/assets/modules/base/hooks/fun.hook"
import { useSort } from "@/assets/modules/base/hooks/sort.hook"
import {
  FrozenState,
  FrozenStateDictionary,
  HandleFrozenStateDictionary,
  HandleFrozenStateMessageDictionary
} from "@/assets/modules/biz/dictionaries/frozen-state.dictionary"
import { QueryParams } from "@/assets/modules/biz/dtos/customer.dto"
import { customerService } from "@/assets/modules/biz/services/customer.service"
import { Customer } from "@/assets/modules/biz/vos/customer.vo"
import { usePaging } from "@/assets/page/paging.hook"
import { format } from "@/assets/share/utils/date.util"
import { QueryParamsType } from "@/components/pages/query-params-input/constants"
import QueryParamsInput from "@/components/pages/query-params-input/index.vue"
import { QueryParamsModel } from "@/components/pages/query-params-input/models"
import { instanceToPlain, plainToClass } from "class-transformer"
import {
  NButton,
  NDataTable,
  NForm,
  NPopconfirm,
  NSpace,
  useNotification
} from "naive-ui"
import type { TableColumns } from "naive-ui/lib/data-table/src/interface"
import { reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import GiveCoupon from "./components/give-coupon.vue"
const route = useRoute()
const router = useRouter()
const { checkResult } = $(useFunction())
const notification = useNotification()
const queryParamsModel = {
  nickname: new QueryParamsModel(
    "昵称：",
    QueryParamsType.String,
    "请输入昵称"
  ),
  birthday: new QueryParamsModel(
    "生日",
    QueryParamsType.DateRange,
    "请选择生日"
  ),
  createDate: new QueryParamsModel(
    "创建时间",
    QueryParamsType.DateRange,
    "请选择创建时间"
  ),
  frozenState: new QueryParamsModel(
    "冻结状态",
    QueryParamsType.Select,
    "请选择冻结状态",
    Object.keys(FrozenStateDictionary).map((key: string) => ({
      label: FrozenStateDictionary[key as unknown as FrozenState],
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
    (criteria) => customerService.paging(criteria),
    (criteria) =>
      router.replace({
        path: "/biz/customer",
        query: instanceToPlain(criteria)
      })
  )
)
let $giveCoupon = $ref<any | undefined>()

const columns: TableColumns<Customer> = [
  reactive({
    title: "昵称",
    key: "nickname"
  }),
  reactive({
    title: "生日",
    key: "birthday",
    sortOrder: getOrderString("birthday"),
    sorter: true,
    render(row) {
      return format(row.birthday)
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
    title: "冻结状态",
    key: "frozenState",
    render(row) {
      return FrozenStateDictionary[row.frozenState]
    }
  },
  {
    title: "操作",
    key: "action",
    render(row) {
      return (
        <NSpace>
          <NButton
            quaternary
            size="small"
            type="success"
            onClick={() => $giveCoupon.show(row.id)}
          >
            赠券
          </NButton>
          <NButton
            quaternary
            size="small"
            type="success"
            onClick={() => router.push({ path: `/biz/coupon/${row.id}` })}
          >
            查券
          </NButton>
          <NPopconfirm
            v-slots={{
              default: HandleFrozenStateMessageDictionary[row.frozenState],
              trigger: (
                <NButton quaternary size="small" type="warning">
                  {HandleFrozenStateDictionary[row.frozenState]}
                </NButton>
              )
            }}
            onPositive-click={() => handleFrozen(row)}
          ></NPopconfirm>
        </NSpace>
      )
    }
  }
]

const { handleSorter, handleResetSorter } = useSort(columns, {
  changeSort,
  resetSort,
  getOrderString
})

const handleFrozen = async ({ id, frozenState }: Customer) => {
  const FUNCTIONS = {
    [FrozenState.Normal]: () => customerService.frozen(id),
    [FrozenState.Frozen]: () => customerService.thaw(id)
  }
  const result = await FUNCTIONS[frozenState]()
  checkResult(result)
  notification.success({
    title: "提示",
    content: `${HandleFrozenStateDictionary[frozenState]}成功`,
    duration: 5000
  })
  changePage(pagination.page)
}
</script>
<style lang="scss" scoped></style>

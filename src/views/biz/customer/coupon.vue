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
</template>
<script lang="tsx" setup>
import { useFunction } from "@/assets/modules/base/hooks/fun.hook"
import { useSort } from "@/assets/modules/base/hooks/sort.hook"
import {
  CouponType,
  CouponTypeDictionary
} from "@/assets/modules/biz/dictionaries/coupon-type.dictionary"
import {
  UseState,
  UseStateDictionary
} from "@/assets/modules/biz/dictionaries/use-state.dictionaries"
import { QueryParams } from "@/assets/modules/biz/dtos/coupon.dto"
import { couponService } from "@/assets/modules/biz/services/coupon.service"
import { Coupon } from "@/assets/modules/biz/vos/coupon.vo"
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
const route = useRoute()
const router = useRouter()
const { checkResult } = $(useFunction())
const notification = useNotification()
const queryParamsModel = {
  couponType: new QueryParamsModel(
    "优惠方式",
    QueryParamsType.Select,
    "请选择优惠方式",
    Object.keys(CouponTypeDictionary).map((key: string) => ({
      label: CouponTypeDictionary[key as unknown as CouponType],
      value: Number(key)
    }))
  ),
  useState: new QueryParamsModel(
    "使用状态",
    QueryParamsType.Select,
    "请选择使用状态",
    Object.keys(UseStateDictionary).map((key: string) => ({
      label: UseStateDictionary[key as unknown as UseState],
      value: Number(key)
    }))
  ),
  startDate: new QueryParamsModel(
    "开始时间：",
    QueryParamsType.DateRange,
    "请选择开始时间"
  ),
  endDate: new QueryParamsModel(
    "结束时间：",
    QueryParamsType.DateRange,
    "请选择结束时间"
  ),
  createDate: new QueryParamsModel(
    "创建时间",
    QueryParamsType.DateRange,
    "请选择创建时间"
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
    (criteria) =>
      couponService.paging({
        ...criteria,
        customerId: Number(route.params.customerId)
      }),
    (criteria) =>
      router.replace({
        path: `/biz/coupon/${route.params.customerId}`,
        query: instanceToPlain(criteria)
      })
  )
)

const columns: TableColumns<Coupon> = [
  {
    title: "优惠方式",
    key: "couponType",
    render(row) {
      return CouponTypeDictionary[row.couponType]
    }
  },
  {
    title: "有效期",
    key: "startDate",
    render(row) {
      return (
        format(row.startDate) +
        " ~ " +
        (row.endDate ? format(row.endDate) : "长期")
      )
    }
  },
  {
    title: "规则",
    key: "rule",
    render(row) {
      if (row.couponType === CouponType.Reduce)
        return `满${row.rule.critical}元减${row.rule.reduce}元`
      else if (row.couponType === CouponType.Discount)
        return `满${row.rule.critical}元享${row.rule.reduce}折`
      return ""
    }
  },
  {
    title: "使用状态",
    key: "rule",
    render(row) {
      return UseStateDictionary[row.useState]
    }
  },
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
    title: "操作",
    key: "action",
    render(row) {
      const deleteButton = (
        <NPopconfirm
          v-slots={{
            default: `您确定删除该优惠券吗？删除后将无法恢复！`,
            trigger: (
              <NButton quaternary size="small" type="warning">
                删除
              </NButton>
            )
          }}
          onPositive-click={() => del(row.id)}
        ></NPopconfirm>
      )

      return (
        <NSpace>
          <NButton quaternary size="small" type="success">
            跟踪订单
          </NButton>
          {row.useState === UseState.Unused ? deleteButton : null}
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

const del = async (id: number) => {
  const result = await couponService.delete(id)
  checkResult(result)
  notification.success({
    title: "提示",
    content: `删除成功`,
    duration: 5000
  })
  changePage(pagination.page)
}
</script>
<style lang="scss" scoped></style>

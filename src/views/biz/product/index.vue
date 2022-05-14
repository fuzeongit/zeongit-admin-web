<template>
  <QueryParamsInput
    :model="queryParamsModel"
    @query="query"
    :default-value="plainToClass(QueryParams, route.query)"
    @reset-sort="handleResetSorter"
    ref="$queryParamsInput"
  ></QueryParamsInput>
  <NForm class="mb-4">
    <NButton @click="router.push('/biz/product/edit')">新增</NButton>
  </NForm>
  <NDataTable
    remote
    :loading="loading"
    :bordered="false"
    :columns="columns"
    :data="pagination?.items"
    :row-key="(row) => row.id"
    :pagination="paginationProps"
    @update:sorter="handleSorter"
  />
</template>
<script lang="tsx" setup>
import { useFunction } from "@/assets/modules/base/hooks/fun.hook"
import { useSort } from "@/assets/modules/base/hooks/sort.hook"
import {
  HandleSellingStateDictionary,
  HandleSellingStateMessageDictionary,
  SellingState,
  SellingStateDictionary
} from "@/assets/modules/biz/dictionaries/selling-state.dictionaries"
import {
  UseState,
  UseStateDictionary
} from "@/assets/modules/biz/dictionaries/use-state.dictionaries"
import { QueryParams } from "@/assets/modules/biz/dtos/product.dto"
import { categoryService } from "@/assets/modules/biz/services/category.service"
import { productService } from "@/assets/modules/biz/services/product.service"
import { Product } from "@/assets/modules/biz/vos/product.vo"
import { usePaging } from "@/assets/modules/base/hooks/paging.hook"
import { format } from "@zeongit/share-ts"
import { QueryParamsType } from "@/components/pages/query-params-input/constants"
import { useFillOptions } from "@/components/pages/query-params-input/hooks"
import QueryParamsInput from "@/components/pages/query-params-input/index.vue"
import { QueryParamsModel } from "@/components/pages/query-params-input/models"
import { instanceToPlain, plainToClass } from "class-transformer"
import {
  NButton,
  NDataTable,
  NForm,
  NPopconfirm,
  NSpace,
  NTag,
  useNotification
} from "naive-ui"
import type { TableColumns } from "naive-ui/lib/data-table/src/interface"
import { reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
const queryParamsModel = reactive({
  title: new QueryParamsModel("标题：", QueryParamsType.String, "请输入标题"),
  createDate: new QueryParamsModel(
    "创建时间",
    QueryParamsType.DateRange,
    "请选择创建时间"
  ),
  categoryIdList: new QueryParamsModel(
    "分类",
    QueryParamsType.MultiSelect,
    "请选择分类",
    []
  ),
  sellingState: new QueryParamsModel(
    "上架状态",
    QueryParamsType.Select,
    "请选择上架状态",
    Object.keys(SellingStateDictionary).map((key: string) => ({
      label: SellingStateDictionary[key as unknown as SellingState],
      value: Number(key)
    }))
  )
})

const route = useRoute()
const router = useRouter()
const notification = useNotification()
const { checkResult } = $(useFunction())
let $queryParamsInput = $ref<any>()

let {
  paginationProps,
  loading,
  pagination,
  query,
  changePage,
  getOrderString,
  changeSort,
  resetSort
} = $(
  usePaging(
    (criteria: QueryParams) => productService.paging(criteria),
    (routerCriteria) => plainToClass(QueryParams, routerCriteria),
    (criteria) =>
      router.replace({
        path: "/biz/product",
        query: instanceToPlain(criteria)
      })
  )
)

const columns: TableColumns<Product> = [
  {
    title: "名称",
    key: "title"
  },
  {
    title: "分类",
    key: "category",
    render(row) {
      return (
        <NSpace>
          {row.categoryList.map((item, index) => (
            <NTag>{item.name}</NTag>
          ))}
        </NSpace>
      )
    }
  },
  {
    title: "属性",
    key: "priceRange",
    render(row) {
      return (
        <NSpace>
          {row.attrList.map((item, index) => (
            <NTag>{item.name}</NTag>
          ))}
        </NSpace>
      )
    }
  },
  reactive({
    title: "价格区间（元）",
    key: "minPrice",
    sortOrder: getOrderString("minPrice"),
    sorter: true,
    render(row) {
      return row.minPrice.toFixed(2) + "~" + row.maxPrice.toFixed(2)
    }
  }),
  {
    title: "上架状态",
    key: "sellingState",
    render(row) {
      return SellingStateDictionary[row.sellingState]
    }
  },
  {
    title: "使用状态",
    key: "useState",
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
    render(row: Product) {
      const editButton =
        row.useState === UseState.Unused ? (
          <NButton
            quaternary
            size="small"
            onClick={() =>
              router.push({
                path: `/biz/product/edit/${row.id}`
              })
            }
          >
            编辑
          </NButton>
        ) : undefined
      return (
        <NSpace>
          <NButton
            quaternary
            size="small"
            onClick={() =>
              router.push({
                path: `/biz/product/detail/${row.id}`
              })
            }
          >
            详情
          </NButton>
          {editButton}
          <NPopconfirm
            v-slots={{
              default: HandleSellingStateMessageDictionary[row.sellingState],
              trigger: (
                <NButton quaternary size="small" type="warning">
                  {HandleSellingStateDictionary[row.sellingState]}
                </NButton>
              )
            }}
            onPositive-click={() => handleSelling(row.sellingState, row.id)}
          ></NPopconfirm>
        </NSpace>
      )
    }
  }
]

useFillOptions(queryParamsModel, {
  categoryIdList: {
    listSource: () => categoryService.list(),
    pipe: (list) =>
      list.map((item) => ({
        label: item.name,
        value: item.id
      }))
  }
})

const handleSelling = async (sellingState: SellingState, id: number) => {
  const FUNCTIONS = {
    [SellingState.Not]: () => productService.push([id]),
    [SellingState.On]: () => productService.pull([id])
  }
  const result = await FUNCTIONS[sellingState]()
  checkResult(result)
  notification.success({
    title: "提示",
    content: `${HandleSellingStateDictionary[sellingState]}成功`,
    duration: 5000
  })
  changePage(paginationProps.page)
}

const { handleSorter, handleResetSorter } = useSort(columns, {
  changeSort,
  resetSort,
  getOrderString
})
</script>
<style lang="scss" scoped></style>

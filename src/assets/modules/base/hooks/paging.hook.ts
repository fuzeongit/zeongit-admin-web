import { Result } from "@/assets/http/models"
import { Pageable } from "@/assets/page/models"
import { usePaging as useBasePaging } from "@/assets/page/paging.hook"
import { Pagination } from "@/assets/page/vos"
import { SortOrder, SortState } from "naive-ui/lib/data-table/src/interface"
import { ref, watchEffect } from "vue"
import { LocationQuery } from "vue-router"
import { useFunction } from "../hooks/fun.hook"

const ORDER = {
  ascend: "asc",
  descend: "desc"
}

export const usePaging = <T, S extends Pageable>(
  buildService: (criteria: S) => Promise<Result<Pagination<T>>>,
  buildParams?: (searchParams: LocationQuery) => S,
  handle?: (criteria: S) => void
) => {
  const { checkResult } = useFunction()

  const {
    defaultCriteria,
    criteria,
    loading,
    pagination,
    pageList,
    query,
    changePage,
    changeLimit,
    changeSort: baseChangeSort,
    resetSort,
    paging
  } = useBasePaging(buildService, buildParams, handle, checkResult)

  /**
   * 改变排序
   * @param sortState
   */
  const changeSort = async (sortState: SortState, multiple: boolean) => {
    baseChangeSort(
      sortState.order
        ? `${sortState.columnKey},${ORDER[sortState.order]}`
        : `${sortState.columnKey}`,
      multiple
    )
  }

  const getOrderString = (
    key: string,
    sort: string[] = criteria.value.sort as string[]
  ): SortOrder => {
    const current = sort
      .map((it) => it.split(","))
      .find(([columnKey]) => columnKey === key)

    if (current) {
      const [columnKey, type] = current
      if (type === "asc") return `ascend`
      else return `descend`
    } else {
      return false
    }
  }

  const paginationProps = ref({
    page: criteria.value.page,
    pageSize: criteria.value.limit,
    showSizePicker: true,
    pageSizes: [3, 5],
    itemCount: 0,
    pageCount: 0,
    onChange: async (page: number) => {
      await changePage(page)
      paginationProps.value.page = page
    },
    onUpdatePageSize: async (limit: number) => {
      await changeLimit(limit)
      paginationProps.value.page = 1
      paginationProps.value.pageSize = limit
    }
  })

  watchEffect(() => {
    paginationProps.value.page = pagination.value?.meta?.currentPage ?? 0
    paginationProps.value.itemCount = pagination.value?.meta?.totalItems ?? 0
    paginationProps.value.pageCount = pagination.value?.meta?.totalPages ?? 0
  })

  return {
    defaultCriteria,
    criteria,
    loading,
    pagination,
    pageList,
    query,
    changePage,
    changeLimit,
    changeSort,
    resetSort,
    getOrderString,
    paging,
    paginationProps
  }
}

import { Result } from "@/assets/http/models"
import { Pageable } from "@/assets/page/models"
import { Pagination } from "@/assets/page/vos"
import { SortOrder, SortState } from "naive-ui/lib/data-table/src/interface"
import { computed, readonly, ref, watchEffect } from "vue"
import { LocationQuery, NavigationFailure, useRoute } from "vue-router"
import { useFunction } from "../modules/base/hooks/fun.hook"

const ORDER = {
  ascend: "asc",
  descend: "desc"
}

const ORDER2 = {
  asc: "ascend",
  desc: "descend"
}

export const usePaging = <T, S extends Pageable>(
  buildCriteria: (routerCriteria: LocationQuery) => S,
  buildService: (criteria: S) => Promise<Result<Pagination<T>>>,
  buildJump: (criteria: S) => Promise<void | NavigationFailure | undefined>
) => {
  const route = useRoute()
  const { checkResult } = useFunction()
  const routerCriteria = computed(() => route.query)
  const defaultCriteria = buildCriteria(routerCriteria.value)
  // 暴露查询条件输入
  const criteriaForm = ref(defaultCriteria)
  // 查询条件暴露只读状态
  const criteria = ref(defaultCriteria)

  const loading = ref(false)
  const currentPage = ref<Pagination<T> | undefined>(undefined)
  const pageList = ref<T[]>([])

  /**
   * 瀑布流改变页码，因为瀑布流下一页要先判断所以要抽离一个方法
   * @param page
   * @returns
   */
  const changeWaterfallPage = () => {
    const page = (currentPage.value?.meta.currentPage ?? 0) + 1
    if (
      loading.value ||
      (currentPage.value &&
        currentPage.value.meta.last &&
        currentPage.value.meta.currentPage <= page)
    )
      return
    criteria.value.page = page
    paging()
  }

  /**
   * 改变页码
   * @param page
   */
  const changePage = async (page: number) => {
    const targetCriteria = Object.assign({}, criteria.value, { page })
    await buildJump(targetCriteria)
    criteria.value = targetCriteria
    await paging()
  }

  /**
   * 改变页码分页大小
   * @param page
   */
  const changeLimit = async (limit: number) => {
    const targetCriteria = Object.assign({}, criteria.value, { page: 1, limit })
    await buildJump(targetCriteria)
    criteria.value = targetCriteria
    await paging()
  }

  /**
   * 改变排序
   * @param sortState
   */
  const changeSort = async (sortState: SortState, multiple: boolean) => {
    let targetCriteria
    if (multiple) {
      let list2d = (criteria.value.sort as string[]).map((it) => it.split(","))
      const current = list2d.find(
        ([columnKey]) => columnKey === sortState.columnKey
      )
      // 如果是排序
      if (sortState.order) {
        if (current) {
          current[1] = ORDER[sortState.order]
        } else {
          list2d.push([sortState.columnKey as string, ORDER[sortState.order]])
        }
      } else {
        if (current) {
          list2d = list2d.filter(
            ([columnKey]) => columnKey !== sortState.columnKey
          )
        }
      }
      targetCriteria = Object.assign({}, criteria.value, {
        page: 1,
        sort: list2d.map(([columnKey, order]) => `${columnKey},${order}`)
      })
    } else {
      targetCriteria = Object.assign({}, criteria.value, {
        page: 1,
        sort: sortState.order
          ? [`${sortState.columnKey},${ORDER[sortState.order]}`]
          : []
      })
    }

    await buildJump(targetCriteria)
    criteria.value = targetCriteria
    await paging()
  }

  /**
   * 重置排序
   */
  const resetSort = async () => {
    const targetCriteria = Object.assign({}, criteria.value, {
      page: 1,
      sort: defaultCriteria.sort
    })
    await buildJump(targetCriteria)
    criteria.value = targetCriteria
    await paging()

    return defaultCriteria.sort
  }

  /**
   * 改变搜索条件
   * @param c
   */
  const query = async (c?: Partial<S>) => {
    const targetCriteria = Object.assign({}, c ?? {}, {
      page: 1,
      limit: criteria.value.limit,
      sort: criteria.value.sort
    })
    // 搜索的时候要把页码归1
    await buildJump(targetCriteria as S)
    criteria.value = targetCriteria
    paging()
  }

  /**
   * 获取数据
   */
  const paging = async () => {
    loading.value = true
    const result = await buildService(criteria.value)
    loading.value = false
    checkResult(result)
    currentPage.value = result.data as unknown as typeof currentPage.value
    if (currentPage.value!.meta.first) pageList.value = currentPage.value!.items
    else pageList.value.push(...currentPage.value!.items)
  }

  const pagination = ref({
    page: criteria.value.page,
    pageSize: criteria.value.limit,
    showSizePicker: true,
    pageSizes: [3, 5],
    itemCount: 0,
    pageCount: 0,
    onChange: async (page: number) => {
      await changePage(page)
      pagination.value.page = page
    },
    onUpdatePageSize: async (limit: number) => {
      await changeLimit(limit)
      pagination.value.page = 1
      pagination.value.pageSize = limit
    }
  })

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

  watchEffect(() => {
    pagination.value.page = currentPage.value?.meta?.currentPage ?? 0
    pagination.value.itemCount = currentPage.value?.meta?.totalItems ?? 0
    pagination.value.pageCount = currentPage.value?.meta?.totalPages ?? 0
  })

  paging()

  return {
    routerCriteria,
    criteriaForm,
    criteria: readonly(criteria),
    loading: readonly(loading),
    currentPage,
    pageList,
    changePage,
    changeLimit,
    changeSort,
    resetSort,
    changeWaterfallPage,
    query,
    paging,
    pagination,
    getOrderString
  }
}

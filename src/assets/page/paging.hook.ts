import { Result } from "@/assets/http/models"
import { Pageable } from "@/assets/page/models"
import { Pagination } from "@/assets/page/vos"
import { computed, ref, watch } from "vue"
import { LocationQuery, useRoute } from "vue-router"

export const usePaging = <T, S extends Pageable>(
  buildService: (criteria: S) => Promise<Result<Pagination<T>>>,
  buildParams?: (searchParams: LocationQuery) => S,
  handler?: (criteria: S) => void,
  errorHandler?: (result: Result<unknown>) => void
) => {
  const route = useRoute()

  // 路由参数
  const searchParams = computed(() => route.query)

  const defaultCriteria =
    buildParams?.(searchParams.value) ?? (new Pageable() as S)
  //
  const criteria = ref(defaultCriteria)

  const loading = ref(false)

  const pagination = ref<Pagination<T>>()

  const pageList = ref<T[]>([])

  /**
   * 获取数据
   */
  const paging = async (c?: S) => {
    loading.value = true
    const result = await buildService(c ?? criteria.value)
    loading.value = false
    errorHandler?.(result)
    pagination.value = result.data as unknown as typeof pagination.value
    // @ts-ignore
    if (pagination.value!.meta.first) pageList.value = pagination.value!.items
    // @ts-ignore
    else pageList.value.push(...pagination.value!.items)
  }

  // 检测路由变化
  watch(
    searchParams,
    (n) => {
      const c = buildParams?.(n) ?? (new Pageable() as S)
      criteria.value = c
      paging(c)
    },
    {
      deep: true,
      immediate: true
    }
  )

  /**
   * 改变搜索条件
   * @param c
   */
  const query = async (c?: Partial<S>) => {
    const targetCriteria = Object.assign({}, c ?? {}, {
      page: 1,
      limit: criteria.value.limit,
      sort: criteria.value.sort
    }) as S
    if (handler) {
      handler(targetCriteria)
    } else {
      paging(targetCriteria)
    }
  }

  /**
   * 改变页码
   * @param page
   */
  const changePage = async (page: number) => {
    const targetCriteria = Object.assign({}, criteria.value, { page })
    if (handler) {
      handler(targetCriteria)
    } else {
      paging(targetCriteria)
    }
  }

  /**
   * 改变页码分页大小
   * @param limit
   */
  const changeLimit = async (limit: number) => {
    const targetCriteria = Object.assign({}, criteria.value, { page: 1, limit })
    if (handler) {
      handler(targetCriteria)
    } else {
      paging(targetCriteria)
    }
  }
  /**
   * 改变排序
   * @param sortState
   * @param multiple
   */
  const changeSort = async (sortState: string, multiple: boolean) => {
    const [key, order] = sortState.split(",")
    const currentSorts = (criteria.value.sort as string[])
      .map((it: string) => it.split(",") as [string, string])
      .filter(([k]) => k !== key)
      .map(([k, o]) => `${k},${o}`)
    const targetCriteria = Object.assign({}, criteria.value, {
      page: 1,
      sort: multiple
        ? order
          ? [...currentSorts, `${key},${order}`]
          : currentSorts
        : order
        ? [`${key},${order}`]
        : []
    })

    if (handler) {
      handler(targetCriteria)
    } else {
      paging(targetCriteria)
    }
  }

  /**
   * 重置排序
   */
  const resetSort = async () => {
    const targetCriteria = Object.assign({}, criteria.value, {
      page: 1,
      sort: defaultCriteria.sort
    })
    if (handler) {
      handler(targetCriteria)
    } else {
      paging(targetCriteria)
    }

    return defaultCriteria.sort
  }

  /**
   * 瀑布流改变页码，因为瀑布流下一页要先判断所以要抽离一个方法
   * @returns
   */
  const changeWaterfallPage = () => {
    const page = (pagination.value?.meta.currentPage ?? 0) + 1
    if (
      loading.value ||
      (pagination.value &&
        pagination.value.meta.last &&
        pagination.value.meta.currentPage <= page)
    )
      return
    changePage(page)
  }

  return {
    defaultCriteria,
    criteria,
    loading,
    pagination,
    pageList,
    paging,
    query,
    changePage,
    changeWaterfallPage,
    changeLimit,
    changeSort,
    resetSort
  }
}

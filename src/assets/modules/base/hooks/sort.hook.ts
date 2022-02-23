import { SortOrder, SortState, TableColumns } from "naive-ui/lib/data-table/src/interface"

type Functions = {
  changeSort: (sortState: SortState) => Promise<void>
  resetSort: () => Promise<string[]>
  getOrderString: (key: string, sort?: string[]) => SortOrder
}

export const useSort = <T>(columns: TableColumns<T>, functions: Functions) => {
  const handleSorter = async (sortState: SortState) => {
    await functions.changeSort(sortState)
    //@ts-ignore
    const column = columns.find((column) => column.key === sortState.columnKey)
    if (column) {
      //@ts-ignore
      column.sortOrder = sortState.order
    }
  }

  const handleResetSorter = async () => {
    const result = await functions.resetSort()

    columns
      //@ts-ignore
      .filter((column) => column.sorter)
      .forEach((column) => {
        //@ts-ignore
        column.sortOrder = functions.getOrderString(column.key, result)
      })
  }
  return { handleSorter, handleResetSorter }
}

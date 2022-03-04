import {
  SortOrder,
  SortState,
  TableColumns
} from "naive-ui/lib/data-table/src/interface"

type Functions = {
  changeSort: (sortState: SortState, multiple: boolean) => Promise<void>
  resetSort: () => Promise<string[]>
  getOrderString: (key: string, sort?: string[]) => SortOrder
}

export const useSort = <T>(
  columns: TableColumns<T>,
  functions: Functions,
  multiple: boolean = false
) => {
  const handleSorter = async (sortState: SortState) => {
    await functions.changeSort(sortState, multiple)
    if (multiple) {
      //@ts-ignore
      const column = columns.find(
        //@ts-ignore
        (column) => column.key === sortState.columnKey
      )
      if (column) {
        //@ts-ignore
        column.sortOrder = sortState.order
      }
    } else {
      columns.forEach((column) => {
        //@ts-ignore
        if (column.sorter) {
          //@ts-ignore
          if (column.key === sortState.columnKey) {
            //@ts-ignore
            column.sortOrder = sortState.order
          } else {
            //@ts-ignore
            column.sortOrder = undefined
          }
        }
      })
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

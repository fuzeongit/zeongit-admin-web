<template>
  <NForm inline :label-width="80" ref="formRef">
    <template v-for="(item, key) in model" :key="key">
      <NFormItem :label="item.label">
        <NInput
          v-model:value="(queryParams[key] as string)"
          v-if="item.type === QueryParamsType.String"
          :placeholder="item.placeholder"
          clearable
        />
        <NSelect
          v-model:value="queryParams[key]"
          v-if="item.type === QueryParamsType.Select"
          :placeholder="item.placeholder"
          :options="item.options"
          clearable
        />
        <NSelect
          v-model:value="queryParams[key]"
          v-if="item.type === QueryParamsType.MultiSelect"
          :placeholder="item.placeholder"
          :options="item.options"
          multiple
          clearable
        />
        <NDatePicker
          clearable
          value-format="yyyy-MM-dd"
          :placeholder="item.placeholder"
          v-if="
            [QueryParamsType.Date, QueryParamsType.DateRange].includes(
              item.type
            )
          "
          :type="QueryParamsType.DateRange === item.type ? 'daterange' : 'date'"
          v-model:formatted-value="(queryParams[key] as string|null|[string, string])"
        />
      </NFormItem>
    </template>
    <NFormItem>
      <NButton @click="query" type="primary">搜索</NButton>
    </NFormItem>
    <NFormItem>
      <NButton @click="reset">重置</NButton>
    </NFormItem>
    <NFormItem>
      <NButton @click="emits('resetSort')">重排</NButton>
    </NFormItem>
  </NForm>
</template>

<script lang="ts" setup>
import { instanceToPlain } from "class-transformer"
import {
  NButton,
  NDatePicker,
  NForm,
  NFormItem,
  NInput,
  NSelect
} from "naive-ui"
import type { PropType } from "vue"
import { QueryParamsType } from "./constants"
import { QueryParamsModel } from "./models"
import type { QueryParams } from "./types"

const props = defineProps({
  model: {
    type: Object as PropType<Record<string, QueryParamsModel>>,
    required: true
  },
  defaultValue: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  }
})

const emits = defineEmits({
  query: (value: QueryParams) => true,
  resetSort: () => true
})

const buildQueryParams = () => {
  const object: QueryParams = {}
  Object.keys(props.model).forEach((it) => {
    if (
      [QueryParamsType.Date, QueryParamsType.Select].includes(
        props.model[it].type
      )
    ) {
      object[it] = props.defaultValue[it] ?? null
    } else if (props.model[it].type === QueryParamsType.DateRange) {
      object[it] = props.defaultValue[it]?.some((it: string) => it)
        ? props.defaultValue[it]
        : null
    } else {
      object[it] = props.defaultValue[it] ?? null
    }
  })
  return object
}

let queryParams = $ref(buildQueryParams())
const query = () => {
  const object = instanceToPlain(queryParams)
  Object.keys(object).forEach((it) => {
    ;(object[it] === null || object[it] === "") && delete object[it]
  })
  emits("query", object)
}
const reset = () => {
  const object: QueryParams = {}
  Object.keys(props.model).forEach((it) => {
    if (
      [QueryParamsType.Date, QueryParamsType.Select].includes(
        props.model[it].type
      )
    ) {
      object[it] = null
    } else if (props.model[it].type === QueryParamsType.DateRange) {
      object[it] = null
    } else {
      object[it] = null
    }
  })
  queryParams = object
  query()
}

defineExpose({
  query(key: string, value: number | string | null | Array<string | number>) {
    queryParams[key] = value
    query()
  }
})
</script>

<style></style>

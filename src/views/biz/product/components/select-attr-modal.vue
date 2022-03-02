<template>
  <NModal
    :mask-closable="false"
    v-model:show="internalVisible"
    preset="card"
    title="选择属性"
    :style="{ width: '300px' }"
  >
    <NForm :model="valueCodeList">
      <NFormItem
        :label="attr.name"
        :path="`[${index}]`"
        v-for="(attr, index) in attrList"
      >
        <NSelect
          v-model:value="valueCodeList[index]"
          placeholder="请选择属性值"
          :options="valueOptionsList[index]"
          clearable
        />
      </NFormItem>
      <NFormItem label="价格" path="price">
        <NInput v-model:value="price" placeholder="请输入价格" clearable />
      </NFormItem>
      <NButton type="success" class="justify-end" @click="save">保存</NButton>
    </NForm>
  </NModal>
</template>

<script lang="tsx" setup>
import { SaveDto, Sku } from "@/assets/modules/biz/dtos/product.dto"
import { defaultsDeep, merge } from "lodash"
import {
  NForm,
  NFormItem,
  NModal,
  NSelect,
  useNotification,
  NButton,
  NInput
} from "naive-ui"
import { PropType } from "vue"
import { Attr } from "@/assets/modules/biz/dtos/product.dto"
const notification = useNotification()

const emits = defineEmits({
  "update:visible": (visible: boolean) => true,
  confirm: (sku: Sku) => true
})

const props = defineProps({
  defaultAttrList: {
    type: Object as PropType<Attr[]>,
    required: true
  },
  dto: {
    type: Object as PropType<SaveDto>,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
})

let internalVisible = $computed({
  get: () => props.visible,
  set: (v) => {
    emits("update:visible", v)
  }
})

let attrList = $computed(() => {
  return props.dto.attrList.map((attr) => {
    const defaultAttr = props.defaultAttrList.find(
      (item) => item.id === attr.id
    )

    return merge({}, attr, {
      valueList: [...(defaultAttr?.valueList ?? []), ...attr.valueList]
    })
  })
})

let valueCodeList = $ref(props.dto.attrList.map((item, index) => null))

let valueOptionsList = $computed(() =>
  attrList.map((item) =>
    item.valueList.map((value, index) => ({
      label: value,
      value: index.toString().padStart(2, "0")
    }))
  )
)

let price = $ref("0")

const save = () => {
  const code = valueCodeList.join("")
  if (props.dto.skuList.some((sku) => sku.code === code)) {
    notification.error({
      title: "异常",
      content: "SKU码已存在",
      duration: 5000
    })
    return
  }

  const specList = valueCodeList.map(
    (code, index) =>
      valueOptionsList[index].find((it) => it.value === code)!.label
  ) as string[]
  emits("confirm", new Sku(code, specList, Number(price)))
}
</script>

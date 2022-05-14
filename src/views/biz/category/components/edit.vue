<template>
  <NModal
    :mask-closable="false"
    v-model:show="visible"
    preset="card"
    :title="dto.id ? '编辑' : '新增'"
    :style="{ width: '300px' }"
  >
    <NForm :model="dto">
      <NFormItem label="名称" path="name">
        <NInput v-model:value="dto.name" placeholder="请输入名称" clearable />
      </NFormItem>
      <NButton class="justify-end" @click="save" :loading="loading"
        >保存</NButton
      >
    </NForm>
  </NModal>
</template>

<script lang="tsx" setup>
import { useFunction } from "@/assets/modules/base/hooks/fun.hook"
import { SaveDto } from "@/assets/modules/biz/dtos/category.dto"
import { categoryService } from "@/assets/modules/biz/services/category.service"
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NModal,
  useLoadingBar,
  useNotification
} from "naive-ui"
const notification = useNotification()
const { checkResult } = $(useFunction())
const loadingBar = useLoadingBar()

const emits = defineEmits({
  confirm: (goTop: boolean) => true
})

let visible = $ref(false)
let dto = $ref(new SaveDto())
let loading = $ref(false)

const save = async () => {
  if (loading) return
  loading = true
  const result = await categoryService.save(dto)
  loading = false
  checkResult(result)

  notification.success({
    title: "提示",
    content: `保存成功`,
    duration: 5000
  })
  visible = false
  emits("confirm", !dto.id)
}

defineExpose({
  show: async (id?: number) => {
    if (id) {
      loadingBar.start()
      const result = await categoryService.get(id)
      try {
        checkResult(result)
        loadingBar.finish()
        dto.id = result.data.id
        dto.name = result.data.name
        visible = true
      } catch (e) {
        loadingBar.error()
      }
    } else {
      dto = new SaveDto()
      visible = true
    }
  }
})
</script>

<template>
  <NModal
    :mask-closable="false"
    v-model:show="visible"
    preset="card"
    title="赠券"
    :style="{ width: '300px' }"
  >
    <NForm :model="dto">
      <NFormItem label="优惠方式" path="name">
        <NSelect
          v-model:value="dto.couponType"
          placeholder="请选择优惠方式"
          :options="couponTypeOptions"
        >
        </NSelect>
      </NFormItem>
      <NFormItem label="使用阈值" path="name">
        <NInputNumber
          v-model:value="dto.rule.critical"
          clearable
          class="w-full"
        />
      </NFormItem>
      <template v-if="dto.couponType === CouponType.Reduce">
        <NFormItem label="减免" path="rule.reduce">
          <NInputNumber
            v-model:value="dto.rule.reduce"
            clearable
            :min="0"
            :max="dto.rule.critical"
            class="w-full"
          />
        </NFormItem>
      </template>
      <template v-else-if="dto.couponType === CouponType.Discount">
        <NFormItem label="折扣" path="rule.discount">
          <NInputNumber
            v-model:value="dto.rule.discount"
            clearable
            :min="1"
            :max="10"
            :step="0.1"
            class="w-full"
          />
        </NFormItem>
      </template>
      <NButton
        type="success"
        class="justify-end"
        @click="save"
        :loading="loading"
        >保存
      </NButton>
    </NForm>
  </NModal>
</template>

<script lang="tsx" setup>
import { useFunction } from "@/assets/modules/base/hooks/fun.hook"
import {
  CouponType,
  CouponTypeDictionary
} from "@/assets/modules/biz/dictionaries/coupon-type.dictionary"
import { CouponDto, CouponRuleDto } from "@/assets/modules/biz/dtos/coupon.dto"
import { couponService } from "@/assets/modules/biz/services/coupon.service"
import {
  NButton,
  NForm,
  NFormItem,
  NInputNumber,
  NSelect,
  NModal,
  useLoadingBar,
  useNotification
} from "naive-ui"
import { computed, watch } from "vue"
const notification = useNotification()
const { checkResult } = $(useFunction())
const loadingBar = useLoadingBar()

const emits = defineEmits({
  confirm: (goTop: boolean) => true
})

let visible = $ref(false)
let dto = $ref<CouponDto>()
let loading = $ref(false)
const couponTypeOptions = Object.keys(CouponTypeDictionary).map(
  (key: string) => ({
    label: CouponTypeDictionary[key as unknown as CouponType],
    value: Number(key)
  })
)

const save = async () => {
  if (loading) return
  loading = true
  const result = await couponService.save(dto)
  loading = false
  checkResult(result)

  notification.success({
    title: "提示",
    content: `赠券成功`,
    duration: 5000
  })
  visible = false
  emits("confirm", true)
}

watch(
  computed(() => dto?.couponType),
  () => {
    dto.rule = new CouponRuleDto()
  }
)

defineExpose({
  show: async (customerId: number) => {
    dto = new CouponDto(customerId)
    visible = true
  }
})
</script>

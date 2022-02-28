<template>
  <NCard title="编辑">
    <NForm>
      <NFormItem label="标题" path="title">
        <NInput v-model:value="dto.title" placeholder="请输入标题" clearable />
      </NFormItem>
      <NFormItem label="分类" path="categoryId">
        <NSelect
          multiple
          v-model:value="dto.categoryIdList"
          placeholder="请选择分类"
          :options="categoryOptions"
          clearable
        />
      </NFormItem>
    </NForm>
    <div class="mb-4">
      <div class="mb-2">
        <NButton type="success" @click="uploadMainImage">上传主图</NButton>
      </div>
      <NEmpty description="暂无主图" v-if="!dto.mainImage"> </NEmpty>
      <NImageGroup show-toolbar-tooltip v-else>
        <div class="flex overflow-auto">
          <NImage class="flex-shrink-0 mr-2 last:mr-0" :src="dto.mainImage" />
        </div>
      </NImageGroup>
    </div>

    <div class="mb-4">
      <div class="mb-2">
        <NButton type="success" @click="uploadImages">上传子图片</NButton>
      </div>
      <NEmpty description="暂无子图片" v-if="!dto.images.length"> </NEmpty>
      <NImageGroup show-toolbar-tooltip v-else>
        <div class="flex overflow-auto">
          <NImage
            class="flex-shrink-0 mr-2 last:mr-0"
            :src="image"
            v-for="(image, index) in dto.images"
            :key="index"
          />
        </div>
      </NImageGroup>
    </div>
    <div class="mb-4">
      <div class="mb-2">
        <NButton type="success" @click="uploadDetail">上传详细信息</NButton>
      </div>
      <NEmpty description="暂无详细信息" v-if="!dto.detail.length"> </NEmpty>
      <NImageGroup show-toolbar-tooltip v-else>
        <div class="flex overflow-auto">
          <NImage
            class="flex-shrink-0 mr-2 last:mr-0"
            :src="image"
            v-for="(image, index) in dto.detail"
            :key="index"
          />
        </div>
      </NImageGroup>
    </div>
    <NSpace class="!mb-1">
      <NButton type="success" @click="addAttr">新增</NButton>
      <NButton
        type="success"
        @click="generateSku"
        :disabled="!dto.attrList.length || !!id"
        >生成SKU</NButton
      >
      <NButton @click="selectAttrVisible = true" type="success"
        >添加SKU</NButton
      >
    </NSpace>

    <NDataTable
      class="!mb-2"
      bordered
      :columns="attrColumns"
      :data="dto.attrList"
      :row-key="(row) => row.id"
    />
    <NDataTable
      bordered
      :columns="skuColumns"
      :data="dto.skuList"
      :row-key="(row) => row.id"
    />
    <div class="my-4">
      <NButton type="success" @click="save">保存</NButton>
    </div>
  </NCard>
  <SelectAttrModal
    :dto="dto"
    v-model:visible="selectAttrVisible"
    @confirm="addSku"
  ></SelectAttrModal>
</template>
<script lang="tsx" setup>
import { useFunction } from "@/assets/modules/base/hooks/fun.hook"
import { Attr, SaveDto, Sku } from "@/assets/modules/biz/dtos/product.dto"
import { categoryService } from "@/assets/modules/biz/services/category.service"
import { productService } from "@/assets/modules/biz/services/product.service"
import faker from "@faker-js/faker"
import { deserializeArray, plainToClass } from "class-transformer"
import {
  NButton,
  NCard,
  NDataTable,
  NDynamicTags,
  NEmpty,
  NForm,
  NFormItem,
  NInput,
  NPopconfirm,
  NSelect,
  NTag,
  useNotification,
  NSpace,
  NImage,
  NImageGroup
} from "naive-ui"
import type { TableColumns } from "naive-ui/lib/data-table/src/interface"
import { SelectMixedOption } from "naive-ui/lib/select/src/interface"
import { useRoute, useRouter } from "vue-router"
import SelectAttrModal from "./components/select-attr-modal.vue"
const route = useRoute()
const router = useRouter()
const notification = useNotification()
const { checkResult } = $(useFunction())
let dto = $ref<SaveDto>(new SaveDto())
let categoryOptions = $ref<SelectMixedOption[]>([])
let selectAttrVisible = $ref(false)
const id = route.params.id ? Number(route.params.id) : undefined

const attrColumns: TableColumns<Attr> = [
  {
    title: "属性名称",
    key: "name",
    width: "200px",
    render(row, index) {
      return (
        <NInput v-model:value={row.name} placeholder="请输入名称" clearable />
      )
    }
  },
  {
    title: "属性值",
    key: "createDate",
    render(row) {
      return <NDynamicTags v-model:value={row.valueList} max={20} />
    }
  },
  {
    title: "操作",
    key: "action",
    width: "100px",
    render(row, index) {
      const slots = {
        default: "删除属性后商品将无法显示该属性，确定删除吗？",
        trigger: (
          <NButton quaternary size="small" type="warning">
            删除
          </NButton>
        )
      }

      return (
        <NPopconfirm
          v-slots={slots}
          onPositive-click={() => {
            dto.attrList.splice(index, 1)
          }}
        ></NPopconfirm>
      )
    }
  }
]

const skuColumns: TableColumns<Sku> = [
  {
    title: "规格编号",
    key: "code",
    width: "300px"
  },
  {
    title: "属性",
    key: "specList",
    render(row) {
      return (
        <NSpace>
          {row.specList.map((item, index) => (
            <NTag>{item}</NTag>
          ))}
        </NSpace>
      )
    }
  },
  {
    title: "价格（元）",
    key: "price",
    width: "120px",
    render(row) {
      return (
        <NInput
          v-model:value={row.price}
          placeholder="请输入价格（元）"
          clearable
        />
      )
    }
  },
  {
    title: "操作",
    key: "action",
    width: "100px",
    render(row, index) {
      const slots = {
        default: "删除Sku后商品规格将不存在，确定删除吗？",
        trigger: (
          <NButton quaternary size="small" type="warning">
            删除
          </NButton>
        )
      }
      return (
        <NSpace>
          {id ? (
            <NButton quaternary size="small" type="success">
              修改
            </NButton>
          ) : (
            <NPopconfirm
              v-slots={slots}
              onPositive-click={() => {
                dto.skuList.splice(index, 1)
              }}
            ></NPopconfirm>
          )}
        </NSpace>
      )
    }
  }
]

const listCategory = async () => {
  const { data } = await categoryService.list()

  categoryOptions = data.map((item) => ({
    label: item.name,
    value: item.id
  }))
}

const addAttr = () => {
  if (dto.attrList.length > 2) {
    notification.error({
      title: "异常",
      content: "最多只能添加3个属性"
    })
    return
  }
  dto.attrList.push(new Attr())
}

const generateSku = () => {
  const actualAttrList = dto.attrList.filter((item) => item.valueList.length)
  const list: Sku[] = Array.from({
    length: actualAttrList
      .map(({ valueList }) => valueList.length)
      .reduce((pre, cur) => pre * cur, 1)
  }).map((_) => new Sku())

  actualAttrList.forEach((_, index) => {
    const surplusAttrAmount = actualAttrList
      .filter((_, i) => i > index)
      .map(({ valueList }) => valueList.length)
      .reduce((pre, cur) => pre * cur, 1)
    const copies = list.length / surplusAttrAmount
    list.forEach((item, i) => {
      const length = actualAttrList[index].valueList.length
      const specIndex = Math.floor(
        Math.floor(i / (list.length / copies)) % length
      )
      item.code += specIndex.toString().padStart(2, "0")
      item.specList.push(actualAttrList[index].valueList[specIndex])
    })
  })
  dto.skuList = list
}

const addSku = (sku: Sku) => {
  dto.skuList.push(sku)
}

const uploadMainImage = async () => {
  dto.mainImage = faker.image.city()
}
const uploadImages = async () => {
  dto.images.push(faker.image.city())
}
const uploadDetail = async () => {
  dto.detail.push(faker.image.city())
}
const save = async () => {
  const result = await productService.create(dto)
  checkResult(result)
}

const get = async () => {
  const result = await productService.get(id!)
  checkResult(result)
  const { data } = result
  dto.categoryIdList = data.categoryList.map((item) => item.id)
  dto.title = data.title
  dto.mainImage = data.mainImage
  dto.images = data.images
  dto.detail = data.detail
  dto.attrList = data.attrList.map(
    (it) =>
      new Attr(
        it.name,
        it.valueList.map((v) => v.name)
      )
  )
  dto.skuList = data.skuList = data.skuList.map((it) => {
    return plainToClass(Sku, it)
  })
}
listCategory()

if (id) {
  get()
}
</script>
<style lang="scss" scoped>
:deep(.n-image) {
  img {
    @apply w-64 h-64;
    @apply object-contain #{'!important'};
  }
}
</style>

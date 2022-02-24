<template>
  <NConfigProvider
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <NNotificationProvider>
      <NLoadingBarProvider>
        <NLayout position="absolute">
          <NLayoutHeader style="height: 64px" bordered>
            颐和园路
          </NLayoutHeader>
          <NLayout has-sider position="absolute" style="top: 64px; bottom: 0">
            <NLayoutSider
              bordered
              collapse-mode="width"
              :collapsed-width="64"
              :width="240"
              :collapsed="collapsed"
              show-trigger
              @collapse="collapsed = true"
              @expand="collapsed = false"
            >
              <NMenu
                v-model:value="value"
                :collapsed="collapsed"
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :options="menuOptions"
              />
            </NLayoutSider>
            <NLayout>
              <NLayoutContent content-style="padding: 24px;">
                <RouterView />
              </NLayoutContent>
            </NLayout>
          </NLayout>
        </NLayout>
      </NLoadingBarProvider>
    </NNotificationProvider>
  </NConfigProvider>
</template>

<script lang="tsx" setup>
import { HArchiveOutline } from "@/assets/heroicons/outline"
import { MENU_KEYS } from "@/assets/modules/base/constants/menu-key.constant"
import {
  dateZhCN,
  GlobalThemeOverrides,
  MenuOption,
  NConfigProvider,
  NIcon,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NLoadingBarProvider,
  NMenu,
  NNotificationProvider,
  zhCN
} from "naive-ui"
import { watchEffect } from "vue"
import { RouterLink, RouterView, useRoute } from "vue-router"

const themeOverrides: GlobalThemeOverrides = {}

const route = useRoute()

let collapsed = $ref(false)
let value = $ref(route.meta.menuKey as string)

watchEffect(() => {
  value = route.meta.menuKey as string
})

const menuOptions: MenuOption[] = [
  {
    label: "生意管理",
    key: "biz",
    icon: () => (
      <NIcon size={24}>
        <HArchiveOutline />
      </NIcon>
    ),
    children: [
      {
        key: MENU_KEYS.BIZ_CATEGORY,
        label: () => (
          <RouterLink
            to={{
              path: "/biz/category"
            }}
          >
            分类管理
          </RouterLink>
        ),
        icon: () => (
          <NIcon size={24}>
            <HArchiveOutline />
          </NIcon>
        )
      },
      {
        key: MENU_KEYS.BIZ_PRODUCT,
        label: () => (
          <RouterLink
            to={{
              path: "/biz/product"
            }}
          >
            商品管理
          </RouterLink>
        ),
        icon: () => (
          <NIcon size={24}>
            <HArchiveOutline />
          </NIcon>
        )
      }
    ]
  }
]
</script>

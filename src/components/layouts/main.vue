<template>
  <NConfigProvider
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <NThemeEditor>
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
    </NThemeEditor>
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
  zhCN,
  NThemeEditor
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
    label: () => (
      <RouterLink
        to={{
          path: "/"
        }}
      >
        首页
      </RouterLink>
    ),
    key: MENU_KEYS.HOME,
    icon: () => (
      <NIcon size={24}>
        <HArchiveOutline />
      </NIcon>
    )
  },
  {
    label: "生意管理",
    key: MENU_KEYS.BIZ,
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
      },
      {
        key: MENU_KEYS.BIZ_CUSTOMER,
        label: () => (
          <RouterLink
            to={{
              path: "/biz/customer"
            }}
          >
            客户管理
          </RouterLink>
        ),
        icon: () => (
          <NIcon size={24}>
            <HArchiveOutline />
          </NIcon>
        )
      },
      {
        key: MENU_KEYS.BIZ_ORDER,
        label: () => (
          <RouterLink
            to={{
              path: "/biz/order"
            }}
          >
            订单管理
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

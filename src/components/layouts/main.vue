<template>
  <NConfigProvider
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <NNotificationProvider>
      <NLoadingBarProvider>
        <NSpace vertical :size="12">
          <router-view />
        </NSpace>
      </NLoadingBarProvider>
    </NNotificationProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import {
  NConfigProvider,
  GlobalThemeOverrides,
  NSpace,
  NNotificationProvider,
  NLoadingBarProvider
} from "naive-ui"
import { zhCN, dateZhCN } from "naive-ui"
const themeOverrides: GlobalThemeOverrides = {}
</script>

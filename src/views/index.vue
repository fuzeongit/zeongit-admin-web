<template>
  <NxButton>123</NxButton>
</template>
<script lang="ts" setup>
import { NxButton } from "naive-ui"
import { parse } from "qs"

import { interval, tap } from "rxjs"

interval(1000)
  .pipe(
    tap((i) => {
      if (i % 2 !== 0) throw new Error("error")
    })
  )
  .subscribe((i) => {
    console.log(i)
  })
</script>
<style lang="scss" scoped></style>

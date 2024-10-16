<script setup lang="ts">
import { ElCol, ElIcon, ElRow } from 'element-plus'
import type { Component } from 'vue'

type Props = {
  title: string
  iconColor: string
  icon: Component
}

defineProps<Props>()
</script>

<template>
  <ElRow :style="{ padding: '16px' }">
    <ElCol :span="8" :style="{ display: 'flex', columnGap: '16px' }">
      <ElIcon :color="iconColor">
        <Component :is="icon" />
      </ElIcon>
      {{ title }}
    </ElCol>
    <ElCol :span="16"><slot /></ElCol>
  </ElRow>
</template>

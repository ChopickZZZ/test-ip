<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/components/ui/BaseTitle.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import IpInputBlock from '@/modules/InputBlock/components/IpInputBlock.vue'
import IpResultBlock from '@/modules/ResultBlock/components/IpResultBlock.vue'

import type { IpResponse } from '@/models'
import { ElSpace } from 'element-plus'

const ips = ref<IpResponse[] | null>(null)
</script>

<template>
  <DefaultLayout>
    <ElSpace :size="32" :fill="true" :style="{ width: '100%' }">
      <BaseTitle>Проверка IP</BaseTitle>
      <IpInputBlock v-model:ips="ips" />

      <BaseTitle>Результаты</BaseTitle>
      <IpResultBlock v-if="ips?.length" :ips />
    </ElSpace>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/components/ui/BaseTitle.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import IpInputBlock from '@/modules/InputBlock/components/IpInputBlock.vue'
import IpResultBlock from '@/modules/ResultBlock/components/IpResultBlock.vue'

import { ElSpace } from 'element-plus'
import { useApiFetch } from '@/composables/fetchApis'

const { ips, fetchApis } = useApiFetch()

onMounted(fetchApis)
</script>

<template>
  <DefaultLayout>
    <ElSpace :size="32" :fill="true" :style="{ width: '100%' }">
      <div>
        <BaseTitle>Проверка IP</BaseTitle>
        <IpInputBlock :ips @fetch:apis="fetchApis" />
      </div>

      <div v-if="ips?.length">
        <BaseTitle>Результаты</BaseTitle>
        <IpResultBlock :ips />
      </div>
    </ElSpace>
  </DefaultLayout>
</template>

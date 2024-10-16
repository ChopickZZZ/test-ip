<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/components/ui/BaseTitle.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import IpInputBlock from '@/modules/InputBlock/components/IpInputBlock.vue'

import type { IpResponse } from '@/models'

const ips = ref<IpResponse[] | null>(null)
</script>

<template>
  <DefaultLayout>
    <BaseTitle>Проверка IP</BaseTitle>

    <IpInputBlock v-model:ips="ips" />
  </DefaultLayout>
</template>

<script setup lang="ts">
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'
import SortIcon from '@/components/icons/SortIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import type { IpResponse } from '@/models'
import {
  ElCard,
  ElRow,
  ElCol,
  ElInput,
  ElButton,
  ElTable,
  ElTableColumn,
  ElIcon,
} from 'element-plus'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

type Props = {
  ips: IpResponse[]
}

const props = defineProps<Props>()

const router = useRouter()
const route = useRoute()

const localIps = ref([...props.ips])

const searchQuery = ref('')

const updateSearchQuery = (value: string) => {
  searchQuery.value = value

  const query = value ? { search: value } : {}
  router.replace({ name: route.name, query })
}

const removeIp = (row: IpResponse) => {
  localIps.value = localIps.value.filter(ip => ip.query !== row.query)
}

const filteredIps = computed(() => {
  const normalizedSearchQuery = searchQuery.value.toLowerCase()

  return localIps.value.filter(ip => {
    const isInIp = ip.query.toLowerCase().includes(normalizedSearchQuery)
    const isInCountry = ip.country.toLowerCase().includes(normalizedSearchQuery)
    const isInRegion = ip.region.toLowerCase().includes(normalizedSearchQuery)

    return isInIp || isInCountry || isInRegion
  })
})
</script>

<template>
  <ElCard class="ip-result">
    <h3 class="ip-result__title">Поиск по таблице</h3>
    <ElRow :gutter="16" :style="{ height: '44px' }">
      <ElCol :span="20">
        <ElInput
          :model-value="searchQuery"
          :style="{ background: 'var(--light-blue-color)' }"
          placeholder="Что вы хотите найти?"
          @update:model-value="updateSearchQuery"
        />
      </ElCol>
      <ElCol :span="4">
        <ElButton type="info" color="#ECF0F5">Найти</ElButton>
      </ElCol>
    </ElRow>

    <ElTable :data="filteredIps" :style="{ width: '100%' }">
      <ElTableColumn :sortable="true" prop="query" label="IP">
        <template #filter-icon>
          <SortIcon />
        </template>
      </ElTableColumn>
      <ElTableColumn :sortable="true" prop="country" label="Country">
        <template #filter-icon>
          <SortIcon />
        </template>
      </ElTableColumn>
      <ElTableColumn :sortable="true" prop="region" label="Region">
        <template #filter-icon>
          <SortIcon />
        </template>
      </ElTableColumn>
      <ElTableColumn align="right">
        <template #default="{ row }">
          <ElButton @click="removeIp(row)">
            <ElIcon size="20" color="var(--primary-color)">
              <TrashIcon />
            </ElIcon>
          </ElButton>
        </template>
      </ElTableColumn>
      <ElTableColumn align="right">
        <ElButton>
          <ElIcon size="20" color="var(--primary-color)">
            <ArrowRightIcon />
          </ElIcon>
        </ElButton>
      </ElTableColumn>
    </ElTable>
  </ElCard>
</template>

<style scoped lang="scss">
.ip-result {
  &__title {
    color: var(--secondary-color);
    font-weight: 500;
    font-size: 1rem;
  }

  &__search {
    width: 100%;
  }
}
</style>

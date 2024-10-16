<script setup lang="ts">
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'
import SortIcon from '@/components/icons/SortIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import type { IpResponse } from '@/models'
import { debounce } from '@/utils/debounce'
import { computed, ref, watch } from 'vue'
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

type Props = {
  ips: IpResponse[]
}

const props = defineProps<Props>()

const localIps = ref([...props.ips])
const filteredIps = computed({
  get() {
    return localIps.value
  },
  set(val) {
    localIps.value = val
  },
})

const searchQuery = ref('')

const removeIp = (row: IpResponse) => {
  filteredIps.value = filteredIps.value.filter(ip => ip.query !== row.query)
}

watch(
  () => props.ips,
  ips => {
    localIps.value = ips
  },
  { deep: true },
)

watch(
  searchQuery,
  debounce((value: string) => {
    const normalizedSearchQuery = value.toLowerCase()

    filteredIps.value = localIps.value.filter(ip => {
      const isInIp = ip.query.toLowerCase().includes(normalizedSearchQuery)
      const isInCountry = ip.country
        .toLowerCase()
        .includes(normalizedSearchQuery)
      const isInRegion = ip.region.toLowerCase().includes(normalizedSearchQuery)

      return isInIp || isInCountry || isInRegion
    })
  }),
)
</script>

<template>
  <ElCard class="ip-result">
    <h3 class="ip-result__title">Поиск по таблице</h3>
    <ElRow :gutter="16" :style="{ height: '44px', marginBottom: '24px' }">
      <ElCol :span="22">
        <ElInput
          v-model="searchQuery"
          :style="{ background: 'var(--light-blue-color)', height: '100%' }"
          placeholder="Что вы хотите найти?"
        />
      </ElCol>
      <ElCol :span="2">
        <ElButton
          type="info"
          color="#ECF0F5"
          :style="{ height: '100%', width: '100%' }"
        >
          Найти
        </ElButton>
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
          <ElButton link @click="removeIp(row)">
            <ElIcon size="20" color="var(--primary-color)">
              <TrashIcon />
            </ElIcon>
          </ElButton>
        </template>
      </ElTableColumn>
      <ElTableColumn align="right">
        <template #default="{ row }">
          <ElButton
            link
            @click="$router.push({ name: 'showIp', params: { ip: row.query } })"
          >
            <ElIcon size="20" color="var(--primary-color)">
              <ArrowRightIcon />
            </ElIcon>
          </ElButton>
        </template>
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

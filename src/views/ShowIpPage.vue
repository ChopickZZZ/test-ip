<script setup lang="ts">
import BaseTitle from '@/components/ui/BaseTitle.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ElButton, ElCard, ElCol, ElIcon, ElRow } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { IpResponse } from '@/models'
import { API_URL, optionalFields } from '@/constants'
import CodeIcon from '@/components/icons/CodeIcon.vue'
import MapIcon from '@/components/icons/MapIcon.vue'
import MapPinIcon from '@/components/icons/MapPinIcon.vue'
import BuildingIcon3 from '@/components/icons/BuildingIcon3.vue'
import BuildingIcon2 from '@/components/icons/BuildingIcon2.vue'
import BuildingIcon from '@/components/icons/BuildingIcon.vue'
import BaseInfoLine from '@/components/ui/BaseInfoLine.vue'
import UsersIcon from '@/components/icons/UsersIcon.vue'
import UserIcon from '@/components/icons/UserIcon.vue'
import UserIdIcon from '@/components/icons/UserIdIcon.vue'
import MobileIcon from '@/components/icons/MobileIcon.vue'
import TerminalIcon from '@/components/icons/TerminalIcon.vue'
import DeskIcon from '@/components/icons/DeskIcon.vue'
import DesktopTowerIcon from '@/components/icons/DesktopTowerIcon.vue'
import GlobeIcon from '@/components/icons/GlobeIcon.vue'
import FontIcon from '@/components/icons/FontIcon.vue'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue'
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'

const route = useRoute()

const ipItem = ref<IpResponse | null>(null)

async function getIpResponse() {
  try {
    const res = await fetch(
      API_URL + route.params.ip + `?fields=${optionalFields}`,
    )
    const data: IpResponse = await res.json()

    ipItem.value = data
  } catch (e) {
    console.error(e)
  }
}

onMounted(getIpResponse)
</script>

<template>
  <DefaultLayout v-if="ipItem">
    <div class="breadcrumbs">
      <ElButton link @click="$router.go(-1)">
        <ElIcon size="24">
          <ArrowLeftIcon />
        </ElIcon>
      </ElButton>
      <p class="breadcrumbs__title">Проверка IP</p>

      <ElIcon size="20" color="#A4A5B1">
        <ArrowRightIcon />
      </ElIcon>

      <div class="breadcrumbs__value">{{ ipItem.query }}</div>
    </div>
    <BaseTitle>{{ route.params.ip }}</BaseTitle>

    <ElRow :gutter="16">
      <ElCol :span="12">
        <ElCard>
          <template #header>
            <BaseInfoLine
              title="Query"
              icon-color="var(--blue-color)"
              :icon="CodeIcon"
              :style="{ padding: 0 }"
            >
              {{ ipItem.query }}
            </BaseInfoLine>
          </template>

          <template #default>
            <BaseInfoLine
              title="Contry"
              icon-color="var(--orange-color)"
              :icon="MapIcon"
            >
              {{ ipItem.country }}
            </BaseInfoLine>

            <BaseInfoLine
              title="Contry code"
              icon-color="var(--orange-color)"
              :icon="MapPinIcon"
            >
              {{ ipItem.countryCode }}
            </BaseInfoLine>

            <BaseInfoLine
              title="Region"
              icon-color="var(--orange-color)"
              :icon="BuildingIcon3"
            >
              {{ ipItem.region }}
            </BaseInfoLine>

            <BaseInfoLine
              title="Region name"
              icon-color="var(--orange-color)"
              :icon="BuildingIcon2"
            >
              {{ ipItem.regionName }}
            </BaseInfoLine>

            <BaseInfoLine
              title="City"
              icon-color="var(--orange-color)"
              :icon="BuildingIcon"
            >
              {{ ipItem.city }}
            </BaseInfoLine>
          </template>
        </ElCard>
        <ElCard>
          <BaseInfoLine
            title="Org"
            icon-color="var(--blue-color)"
            :icon="UsersIcon"
          >
            {{ ipItem.org }}
          </BaseInfoLine>

          <BaseInfoLine
            title="As"
            icon-color="var(--blue-color)"
            :icon="UserIcon"
          >
            {{ ipItem.as }}
          </BaseInfoLine>

          <BaseInfoLine
            title="Asname"
            icon-color="var(--blue-color)"
            :icon="UserIdIcon"
          >
            {{ ipItem.asname }}
          </BaseInfoLine>

          <BaseInfoLine
            title="Mobile"
            icon-color="var(--blue-color)"
            :icon="MobileIcon"
          >
            {{ ipItem.mobile }}
          </BaseInfoLine>

          <BaseInfoLine
            title="Proxy"
            icon-color="var(--blue-color)"
            :icon="TerminalIcon"
          >
            {{ ipItem.proxy }}
          </BaseInfoLine>

          <BaseInfoLine
            title="Hosting"
            icon-color="var(--blue-color)"
            :icon="DeskIcon"
          >
            {{ ipItem.hosting }}
          </BaseInfoLine>
        </ElCard>
      </ElCol>
      <ElCol :span="12">
        <ElCard>
          <template #header>
            <BaseInfoLine
              title="OC"
              icon-color="var(--blue-color)"
              :icon="DesktopTowerIcon"
              :style="{ padding: 0 }"
            >
            </BaseInfoLine>
          </template>

          <template #default>
            <BaseInfoLine
              title="Браузер"
              icon-color="var(--blue-color)"
              :icon="GlobeIcon"
            >
            </BaseInfoLine>

            <BaseInfoLine
              title="Версия браузера"
              icon-color="var(--blue-color)"
              :icon="GlobeIcon"
            >
            </BaseInfoLine>

            <BaseInfoLine
              title="Заголовок"
              icon-color="var(--blue-color)"
              :icon="FontIcon"
            >
            </BaseInfoLine>

            <BaseInfoLine
              title="Javascript"
              icon-color="var(--blue-color)"
              :icon="CodeIcon"
            >
            </BaseInfoLine>
          </template>
        </ElCard>
      </ElCol>
    </ElRow>
  </DefaultLayout>
</template>

<style scoped lang="scss">
.breadcrumbs {
  display: flex;
  align-items: center;
  column-gap: 6px;

  &__title {
    color: var(--secondary-color);
    font-weight: 500;
  }

  &__value {
    color: var(--primary-color);
    font-weight: 500;
  }
}
</style>

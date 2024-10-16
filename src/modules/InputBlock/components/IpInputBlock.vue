<script setup lang="ts">
import type { IpResponse } from '@/models'
import { ElButton, ElCard, ElInput } from 'element-plus'
import { ref, watch } from 'vue'

type Props = {
  ips: IpResponse[]
}

type Emits = {
  'fetch:apis': [string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const inputValue = ref('')
const loading = ref(false)

const fetchApis = () => {
  emit('fetch:apis', inputValue.value)
}

watch(
  () => props.ips,
  ips => {
    console.log('triggered')
    if (!ips) return

    inputValue.value = props.ips?.map(ip => ip.query).join('\n') ?? ''
  },
)
</script>

<template>
  <ElCard class="ip-input" :style="{ background: 'var(--light-blue-color)' }">
    <h3 class="ip-input__title">Ваши IP</h3>

    <ElInput
      v-model="inputValue"
      type="textarea"
      resize="none"
      :placeholder="
        ['47.236.161.323.11', '47.236.161.323.11', '47.236.161.323.11'].join(
          '\n',
        )
      "
      :input-style="{
        height: '180px',
        marginBottom: '24px',
      }"
    />

    <ElButton
      color="var(--primary-black-color)"
      :disabled="loading"
      @click="fetchApis"
    >
      Начать проверку
    </ElButton>
  </ElCard>
</template>

<style scoped lang="scss">
.ip-input {
  &__title {
    color: var(--secondary-color);
    font-weight: 500;
    font-size: 1rem;
  }

  &__textarea {
    min-height: 180px;
    margin-bottom: 24px;
  }
}
</style>

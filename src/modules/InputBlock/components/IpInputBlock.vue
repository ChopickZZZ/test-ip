<script setup lang="ts">
import { API_URL } from '@/constants'
import type { IpResponse } from '@/models'
import { ElButton, ElCard, ElInput } from 'element-plus'
import { ref } from 'vue'

type Emits = {
  'update:ips': [IpResponse[]]
}

const emit = defineEmits<Emits>()

const inputValue = ref('')
const loading = ref(false)

const clearInput = () => (inputValue.value = '')

async function fetchApi() {
  const ips = inputValue.value.split('\n')

  const promises = ips.map(ip => fetch(API_URL + ip))
  const responses = await Promise.all(promises)
  const data: IpResponse[] = await Promise.all(responses.map(res => res.json()))

  emit('update:ips', data)

  clearInput()
  loading.value = false
}
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
      @click="fetchApi"
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

import { API_URL } from '@/constants'
import type { IpResponse } from '@/models'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useApiFetch() {
  const router = useRouter()
  const route = useRoute()

  const loading = ref(false)

  const ips = ref<IpResponse[]>([])

  const updateRouteQuery = (ips: IpResponse[]) => {
    const ipQueries = ips.map(ip => ip.query).join(',')

    router.replace({ name: route.name, query: { savedIps: ipQueries } })
  }

  const fetchApis = async (inputValue?: string) => {
    if (!route.query.savedIps && !inputValue) {
      return
    }

    loading.value = true
    const queryApis = Array.isArray(route.query.savedIps)
      ? route.query.savedIps
      : route.query.savedIps?.split(',')

    const apisToFetch = inputValue
      ? inputValue.split('\n').filter(Boolean)
      : queryApis

    try {
      const res = await Promise.all(apisToFetch!.map(ip => fetch(API_URL + ip)))
      const data: IpResponse[] = await Promise.all(res.map(r => r.json()))

      ips.value = data
      updateRouteQuery(ips.value)
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    ips: computed(() => ips.value),
    loading,
    fetchApis,
  }
}

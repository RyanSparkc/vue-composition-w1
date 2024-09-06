// API
// Reactive (要思考說裡面會有很多東西)
import { reactive, toRefs } from 'vue'
import axios from 'axios'

export function useFetch(path) {
  const state = reactive({
    data: {},
    error: null,
    isLoading: false
  })

  async function fetchData() {
    state.isLoading = true
    try {
      const res = await axios.get(path)
      console.log(res)
      state.data = res.data
      setTimeout(() => {
        state.isLoading = false
      }, 3000)
    } catch (error) {
      state.error = error
      console.log(error)
    } finally {
      state.isLoading = false
    }
  }
  fetchData()

  return {
    ...toRefs(state),
    fetchData
  }
}

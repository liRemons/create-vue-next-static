<template>
  <div>
    <el-input v-model="$store.state.count"></el-input>
    <el-button @click="handleClick">+</el-button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup() {
    const store  = useStore();
    const handleClick = () => {
      store.commit('increment')
    }

    return {
      handleClick
    }
  }
}
</script>
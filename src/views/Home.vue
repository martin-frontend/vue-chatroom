<template>
  <div class="home">
    <BubbleBackground/>
    <!-- <span>{{ $socket.connected ? 'Connected' : 'Disconnected' }}</span> -->
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import BubbleBackground from '@/components/BubbleBackground.vue'
export default {
  name: 'Home',
  components: {
    BubbleBackground
  },
}
</script>
<style scoped>
.home {
  /* width: 100%; */
  height: 100vh;
  position: relative;
}
</style>


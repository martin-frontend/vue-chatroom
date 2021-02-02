<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="clickButton">11111111</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <span>{{ $socket.connected ? 'Connected' : 'Disconnected' }}</span>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    customEmit(val) {
      console.log(val,'this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    res (data) {
      this.msgList.push(data)
      console.log('接收到服务端消息', data);
    }
  },
  methods: {
    clickButton() {
      // this.$socket.client is `socket.io-client` instance
      this.$socket.emit('msgToServer', '123');
    }
  },
  mounted () {
    // console.log(this.$socket);
    // this.clickButton()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

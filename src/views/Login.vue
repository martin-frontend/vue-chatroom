<template>
  <div class="login">
    <div class="buble-div">
      <div class="container">
        <label for="input_name">暱稱</label>
        <input id="input_name" v-model="name" type="text">
        <div class="button-box">
          <button :disabled="!name" :class="{ 'disabled': !name }" @click="start">開始聊天</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        name: ''
      }
    },
    methods: {
      start() {
        this.$socket.emit('login', this.name);
        this.$store.commit('SET_NAME', this.name)
        this.$router.push({path: 'chatroom'})
      }
    },
  }
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .buble-div {
    width: 90%;
    height: 75%;
    background-image: url('../assets/images/bubble-bg.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .container {
      max-width: 500px;
      width: 60%;
      display: flex;
      flex-direction: column;
      label {
        color: rgb(80, 129, 173);
        font-size: 16px;
        margin-bottom: 8px;
        text-align: left;
      }
      input {
        display: block;
        background: white;
        flex: 1;
        height: 38px;
        padding: 6px 12px;
        border: 1px solid rgb(206, 212, 218);
        border-radius: 4px;
        color: rgb(73, 80, 87);
        font-size: 16px;
        font-weight: 400;
        box-sizing: border-box;
      }
      .button-box {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          border: 1px solid #94b2d3;
          border-radius: 7.5px;
          padding: 2vh 6vw;
          background: #fff;
          color: #94b2d3;
          box-shadow: 0 5px 0 0 #94b2d3;
          font-weight: bolder;
          width: fit-content;
          font-size: 16px;
          outline: none;
          cursor: pointer;
          transition: opacity .3s;
          &.disabled {
            opacity: .5;
            cursor: not-allowed;
          }
          &:active {
            margin-top: 5px;
            box-shadow: 0 5px 0 0 transparent;
          }
        }
      }
    }
  }
}
</style>

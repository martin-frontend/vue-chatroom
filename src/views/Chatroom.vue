<template>
    <div class="chatroom">
      <!-- chatroom -->
      <nav class="navbar">
        <div class="user-count">
          {{ user }}
        </div>
      </nav>
      <div class="container">
        <div class="chat">
          <template v-if="messages.length > 0">
            <div class="message" :class="item.className" v-for="(item, index) in messages" :key="index">
              <div class="message-content">
                <template v-if="item.className === 'left-message'">
                  {{ item.name }}
                  <span style="color: gray"> | </span>
                </template>
                {{ item.message }}
              </div>
            </div>
          </template>
        </div>
        <div class="toolbar">
          <img src="../assets/icons/emoji-icon.svg" width="30" height="30" alt="">
          <img src="../assets/icons/addImage-icon.svg" width="30" height="30" alt="">
        </div>
        <div class="message-input">
          <input v-model="text" type="text">
          <img @click="send" src="../assets/icons/paper-plane.svg" :class="{ 'light': text }" width="20" height="20" alt="">
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Chatroom',
  data() {
    return {
      type: {
        1: 'text',
        2: 'img',
        3: 'system',
        4: 'html'
      },
      messages: [
        // {
        //   className: 'left-message',
        //   message: '123123',
        //   name: '44',
        //   type: 'text'
        // },
        // {
        //   className: 'middle-message',
        //   message: '已連線',
        //   name: '44',
        //   type: 'system'
        // },
        // {
        //   className: 'right-message',
        //   message: '123123',
        //   name: '44',
        //   type: 'text'
        // },
      ],
      text: '',
      user: 0
    }
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    customEmit(val) {
      console.log(val,'this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    msgToClient(data) {
      // console.log('132', data.message);
      data.messages.forEach(element => {
        switch (element.type) {
          case 'system':
            this.$set(element ,'className', 'middle-message')
            break;
          case 'text':
            if(element.name === this.name){
              this.$set(element ,'className', 'right-message')
            }else {
              this.$set(element ,'className', 'left-message')
            }
            break;
        }
      });
      this.messages = data.messages
    }
  },
  computed: {
    ...mapState([
      'name',
    ])
  },
  methods: {
    send() {
      if(!this.text) return
      let record = {
        message: this.text,
        name: this.name,
        type: 'text'
      }
      this.$socket.emit('msgToServer', record);
      this.text = ''
    }
  },
}
</script>

<style lang="scss" scoped>
.chatroom {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  .navbar {
    background-color: #5081ad;
    height: 56px;
  }
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 80%;
    margin: auto auto 60px;
    .chat {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      flex: 1;
      // background: #000;
      .message {
        display: flex;
        &.left-message {
          justify-content: flex-start;
          .message-content {
            background-color: white;
            color: rgb(80,129,173);
            border-radius: 7px;
          }
        }
        &.middle-message {
          justify-content: center;
        }
        &.right-message {
          justify-content: flex-end;
          .message-content {
            background-color: rgb(80,129,173);
            color: white;
            border-radius: 7px;
          }
        }
        .message-content {
          width: fit-content;
          padding: 10px;
          margin: 10px 0;
          word-break: break-all;
        }
      }
    }
    .toolbar {
      height: 60px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        margin: 10px;
      }
    }
    .message-input {
      display: flex;
      align-items: center;
      position: relative;
      input {
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
      img {
        position: absolute;
        right: 10px;
        opacity: .3;
        transition: opacity .5s;
        &.light {
          opacity: 1;
        }
      }
    }
  }
}






</style>
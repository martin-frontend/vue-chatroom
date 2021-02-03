<template>
    <div class="chatroom" @click="isShowEmoji = false">
      <!-- chatroom -->
      <nav class="navbar">
        <div class="user-count">
          <img class="icon" src="../assets/icons/681494.svg" width="25" height="25" alt="">
          <span class="count" v-if="users">{{ Object.keys(users).length }}</span>
          <span class="name" v-for="(item,index) in users" :key="index">{{ item }}</span>
        </div>
      </nav>
      <div class="container">
        <div class="chat">
          <template v-if="messages.length > 0">
            <div class="message" :class="item.className" v-for="(item, index) in messages" :key="index">
              <template v-if="item.type === 'text' || item.type === 'system'">
                <div class="message-content">
                  <template v-if="item.className === 'left-message'">
                    <div class="name">{{ item.name }}</div>
                    {{ item.message }}
                  </template>
                  <template v-if="item.className === 'middle-message'">
                    <img src="../assets/icons/anonymous-icon.svg" alt="">
                    <br>
                    - {{ item.name }}{{ item.message }} -
                  </template>
                  <template v-if="item.className === 'right-message'">
                    {{ item.message }}
                  </template>
                </div>
              </template>
              <template v-if="item.type === 'img'">
                <div class="message-content">
                  <div v-if="item.className === 'left-message'" class="name" style="text-align: left">{{ item.name }}</div>
                  <viewer :images="[item.message]">
                    <img :src="item.message" alt="">
                  </viewer>
                </div>
              </template>
            </div>
          </template>
        </div>
        <div class="toolbar">
          <img @click.stop="isShowEmoji = !isShowEmoji" :class="{show:isShowEmoji}" src="../assets/icons/emoji-icon.svg" width="30" height="30" alt="">
          <img @click="fileElement.click()" src="../assets/icons/addImage-icon.svg" width="30" height="30" alt="">
          <Emoji v-if="isShowEmoji" />
        </div>
        <div class="message-input">
          <input v-model="text" type="text">
          <img @click="send" src="../assets/icons/paper-plane.svg" :class="{ 'light': text }" width="20" height="20" alt="">
        </div>
      </div>
    </div>
</template>

<script>
import Emoji from '../components/Emoji'
import { mapState } from 'vuex';
export default {
  name: 'Chatroom',
  components: {
    Emoji
  },
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
      users: null,
      isShowEmoji: false,
      fileElement: null
    }
  },
  mounted () {
    this.fileElement = document.createElement('input');
    this.fileElement.setAttribute('type', 'file')
    this.fileElement.addEventListener('change', this.uploadFile)
  },
  sockets: {
    // connect() {
    //   console.log('socket connected')
    // },
    // customEmit(val) {
    //   console.log(val,'this method was fired by the socket server. eg: io.emit("customEmit", data)')
    // },
    msgToClient(data) {
      data.messages.forEach(element => {
        switch (element.type) {
          case 'system':
            this.$set(element ,'className', 'middle-message')
            break;
          case 'text':
          case 'img':
            if(element.name === this.name){
              this.$set(element ,'className', 'right-message')
            }else {
              this.$set(element ,'className', 'left-message')
            }
            break;
        }
      });
      this.users = data.users
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
    },
    addEmoji(emoji) {
      this.text += emoji
    },
    async uploadFile() {
      const file = this.fileElement.files.item(0)
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      const getBase64 = await new Promise((resolve)=>{
          fileReader.onload = (data) => {
              resolve(data.target.result)
          }
      })
      this.$socket.emit('sendImage', getBase64);
    }
  },
}
</script>

<style lang="scss" scoped>
.chatroom {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  .navbar {
    background-color: #5081ad;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    .user-count {
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .icon {
        opacity: .3;
        margin-right: 15px;
      }
      .count {
        // margin-left: 5px;
        position: absolute;
        width: 15px;
        height: 15px;
        font-size: 14px;
        line-height: 15px;
        text-align: center;
        background: white;
        color: #5081ad;
        border-radius: 50%;
        top: -6px;
        left: 18px
      }
      .name {
        padding: 2px 5px;
        border-radius: 5px;
        margin-right: 10px;
        background: white;
        color: #5081ad;
      }
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 80%;
    padding: 5px;
    margin: auto auto 60px;
    @media (max-width:480px) {
      width: 95%;
      margin: auto;
    }
    .chat {
      display: flex;
      flex-direction: column;
      overflow: auto;
      flex: 1 0 0;
      padding:  0 20px;
      @media (max-width:480px) {
        padding: 0 10px;
      }
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #5081ad;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      .message {
        display: flex;
        &.left-message {
          justify-content: flex-start;
          .message-content {
            background-color: white;
            color: rgb(80,129,173);
            border-radius: 20px;
            text-align: left;
            border-top-left-radius: 0px;
          }
        }
        &.middle-message {
          justify-content: center;
          .message-content {
            color: rgb(80,129,173);
            font-weight: bold;
          }
        }
        &.right-message {
          justify-content: flex-end;
          .message-content {
            background-color: rgb(80,129,173);
            color: white;
            border-radius: 20px;
            text-align: right;
            border-top-right-radius: 0px;
          }
        }
        .message-content {
          width: fit-content;
          padding: 10px;
          margin: 10px 0;
          max-width: 400px;
          word-break: break-all;
          line-height: 1.5;
          .name {
            color: rgb(80,129,173);
            margin-bottom: 5px;
            font-weight: 700;
          }
          img {
            max-width: 250px;
          }
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
        cursor: pointer;
      }
      img.show {
          opacity: .5;
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
        cursor: pointer;
        &.light {
          opacity: 1;
        }
      }
    }
  }
}
</style>
<template>
  <div class="emoji-container">
    <h3>Emoji</h3>
    <div class="content">
      <div
        class="wrap"
        v-for="emoji in emojiList"
        :key="emoji"
        cols="2"
        @click="inputEmoji(emoji)"
      >
        <label for="inputMessage" class="emoji">{{ emoji }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Emjio",
  data() {
    return {
      emojiList: [
        "😀",
        "😁",
        "😂",
        "🤣",
        "😃",
        "😄",
        "😅",
        "😆",
        "😉",
        "😊",
        "😋",
        "😎",
        "😍",
        "😘",
        "🥰",
        "😗",
        "😙",
        "😚",
        "🙂",
        "🤗",
        "🤩",
        "🤔",
        "🤨",
        "😐",
        "😑",
        "😶",
        "🙄",
        "😏",
        "😣",
        "😥",
        "😮",
        "🤐",
        "😯",
        "😪",
        "😫",
        "😴",
        "😌",
        "😛",
        "😜",
        "😝",
        "🤤",
        "😒",
        "😓",
        "😔",
        "😕",
        "🙃",
        "🤑",
        "😲",
        "☹️",
        "🙁",
        "😖",
        "😞",
        "😟",
        "😤",
        "😢",
        "😭",
        "😦",
        "😧",
        "😨",
        "😩",
        "🤯",
        "😬",
        "😰",
        "😱",
        "🥵",
        "🥶",
        "😳",
        "🤪",
        "😵",
        "😡",
        "😠",
        "🤬",
        "😷",
        "🤒",
        "🤕",
        "🤢",
        "🤮",
        "🤧",
        "😇",
        "🤠",
        "🤡",
        "🥳",
        "🥴",
        "🥺",
        "🤥",
        "🤫",
        "🤭",
        "🧐",
        "🤓",
        "😈",
        "👿",
        "👹",
        "👺",
        "💀",
        "👻",
        "👽",
        "🤖",
        "💩",
        "😺",
        "😸",
        "😹",
        "😻",
        "😼",
        "😽",
        "🙀",
        "😿",
        "😾",
      ],
    };
  },
  methods: {
    inputEmoji(emoji) {
      this.$parent.addEmoji(emoji)
    },
  },
};
</script>

<style lang="scss" scoped>
.emoji-container {
  position: absolute;
  // width: 200px;
  // height: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  bottom: 150px;
  background-color: white;
  border-radius: 5px;
  h3 {
    // width: 100%;
    padding: 8px 10px;
    text-align: left;
    background: #f7f7f7;
    border-bottom: 1px solid #ebebeb;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .content {
    width: 240px;
    // height: 500px;
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    padding: 15px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .wrap {
      width: 40px;
      height: 35px;
    }
  }
}
.emoji {
  cursor: pointer;
  font-size: 1.5em;
  line-height: 35px;
  border-radius: 5px;
  user-select: none;
}

.emoji:hover {
  background-color: var(--color3);
}
</style>

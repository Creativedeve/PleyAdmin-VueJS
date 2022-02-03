<template>
  <div>
    <transition-group name="toast">
      <div
        class="toast"
        v-for="toast in toasts"
        :key="toast.id"
        :style="calculateZ"
        :class="'toast-' + toast.type"
      >
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "toasts",
  computed: {
    toasts: function() {
      return this.$store.getters["toasts"];
    },
    calculateOffset: function() {
      return { "margin-top": 25 * this.toastDepth + "px" };
    },
    calculateZ: function() {
      return {}; // { 'z-index': 1000 + this.toastDepth }
    },
    toastDepth: function() {
      return this.$store.getters["toastDepth"](this.id);
    },
  },
};
</script>

<style lang="less">
@import "../styles/vars.less";
.toast {
  position: fixed;
  top: @h1;
  right: @h1;
  pointer-events: none;
  background-color: #333;
  color: #fff;
  padding: @h1 @h2;
  z-index: 9000;
  border-radius: @h1;
  font-weight: bold;
  border: 2px solid #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  &.toast-good {
    background-color: #00aa66;
  }
  &.toast-pending {
    background-color: #ff9900;
  }
  &.toast-bad {
    background-color: #aa0000;
  }
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease-out;
}
.toast-enter {
  opacity: 0;
  transform: translateY(-100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>

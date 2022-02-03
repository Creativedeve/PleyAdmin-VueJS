<template>
  <div class="sub-nav">
    <div class="sub-nav-left">
      <slot></slot>
    </div>
    <div class="sub-nav-actions">
      <router-link
        tag="button"
        :to="`${rootPage}/${option.path}`"
        v-for="(option, index) in options"
        :key="`option-${index}`"
        :disabled="option.locked"
      >
        {{ option.label }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
    },
    rootPage: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
@import "../styles/vars";

.sub-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 -@h4 @h4 -@h4;
}
.sub-nav-actions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  position: sticky;
  top: 0;
  width: auto;
  background-color: @colWhite;
  button {
    height: @h6;
    padding: 0 @h2;
    border-radius: 0;
    background-color: transparent;
    color: @colBlack;
    position: relative;
    font-weight: 500;
    opacity: 0.5;
    &.router-link-active {
      opacity: 1;
      &:after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: @hh / 2;
        background-color: currentColor;
      }
    }
    &[disabled="disabled"] {
      text-decoration: line-through;
    }
  }
}

@media @medium {
  .sub-nav {
    margin: 0 -@h2 @h4 -@h2;
  }
}
</style>

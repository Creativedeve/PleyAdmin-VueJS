<template><span class="loader"/></template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../styles/vars";
.loader {
  display: block;
  width: 16px;
  height: 16px;
  border-color: transparent #fff #fff transparent;
  border-style: solid;
  border-width: 2px;
  border-radius: 16px;
  backface-visibility: none;
  transform: rotate(0deg);
  animation: spin 0.5s linear infinite;
  margin-left: 0.5em;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

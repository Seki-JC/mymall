<template>
    <div id="tabbar">
      <slot></slot>
    </div>
</template>

<script>

export default {
    name:'tabbar'
}
</script>

<style>
  #tabbar {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0px -2px 1px rgba(150, 150, 150, 0.1);
  }
  
</style>
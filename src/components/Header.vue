<template>
  <header>
    <h1>REME・CARDS</h1>
    <svg height='1' :width='progress + "%"'>
      <line x1='0' y1='0' x2='100%' y2='0' style='stroke:rgba(0,0,0,.6);stroke-width:0.8' />
    </svg>
  </header>
</template>

<script>

export default {
  props: ['progress']
}
</script>

<style lang='scss' scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 15px;
}
h1 {
  font-size: 24px;
  font-weight: 100;
  text-align: center;
  font-family: Monaco, 'Roboto Mono', monospace;
}
</style>

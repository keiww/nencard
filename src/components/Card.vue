<template>
  <div class='card' :style='style' :class='className'>
    <ruby>
      <rb>{{card.word.word}}</rb>
      <rt>{{card.word.hiragana}}</rt>
    </ruby>
    <p class='meaning'>{{card.word.meaning}}</p>
    <div class='level'>N{{card.word.level}}</div>
  </div>
</template>

<script>
export default {
  props: ['card'],
  computed: {
    className () {
      return {
        transition: !!this.card.transition
      }
    },
    style () {
      return {
        opacity: this.card.opacity,
        background: this.card.color,
        transform: `rotate(${this.card.deg || 0}deg) translate3d(${this.card.translateX || 0}, ${this.card.translateY || 0}, 0)`
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.card {
  display: flex;
  flex-flow: column wrap;
  position: absolute;
  overflow: hidden;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 30px;
  background: #e1e1e1;
  border-radius: .2em;
  color: #fff;
  transform-origin: 85% 90%;
  z-index: 0;
  user-select: none;
  &:after {
    display: block;
    content: "";
    position: absolute;
    left: 85%;
    top: 90%;
    width: 36px;
    height: 36px;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    background: #fff;
  }
  &.transition {
    transition: all .3s;
  }
  &:nth-child(1) {
    z-index: 300;
  }
  &:nth-child(2) {
    z-index: 200;
  }
}
ruby {
  display: block;
  margin-bottom: 1em;
  font-size: 52px;
  font-weight: bold;
  user-select: initial;
  rt{
    font-size: .3em;
    opacity: .9;
  }
}
.meaning {
  margin: 0;
  flex: 1;
  font-size: 24px;
  font-family: Menlo, 'Roboto Mono', monospace;
  opacity: .8;
}
.level {
  font-size: 24px;
  font-family: Menlo, 'Roboto Mono', monospace;
  opacity: .8;
}
</style>

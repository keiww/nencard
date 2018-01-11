<template>
  <div class='container'>
    <Header :progress='progress'></Header>
    <div class='card-list' ref='cardList'>
      <Card v-for='item in cards' :card='item'>
      </Card>
    </div>
  </div>
</template>

<script>
import { getRandomWord, getRandomColor ,getFinishedWordsIds, finishWord, getFinishPercent } from './utils'
import Header from './components/Header'
import Card from './components/Card'

const isTouch = typeof window.ontouchstart != 'undefined'

export default {
  data () {
    return {
      loaded: false,
      cards: [],
      startX: null,
      startY: null,
      rotatePointOffset: null,
      lock: false,
      progress: 100
    }
  },
  components: {
    Header,
    Card
  },
  computed: {
    dragingCardClass () {
      return {
        draging: this.draging
      }
    },
    dragingCardStyle () {
      return {
        transform: `rotate(${this.deg}deg) translateX(${this.translateX}) translateY(${this.translateY})`
      }
    }
  },
  created () {
    this.prepareCards()
    this.progress = getFinishPercent()
  },
  mounted () {
    this.rotatePointOffset = this.$refs.cardList.offsetTop + this.$refs.cardList.offsetHeight * 0.9
    this.$refs.cardList.addEventListener('touchstart', this.dragStartHandler)
    this.$refs.cardList.addEventListener('mousedown', this.dragStartHandler)
    window.addEventListener('touchend', this.dragEndHandler)
    window.addEventListener('mouseup', this.dragEndHandler)
  },
  methods: {
    getRandomCard () {
      return {
        word: getRandomWord(),
        color: getRandomColor(),
        transition: false,
        opacity: 1,
        deg: 0,
        translateX: 0,
        translateY: 0
      }
    },
    prepareCards () {
      const cards = []
      const finishedWordsIds = getFinishedWordsIds()
      for (let i = 0; i < 3; i++) {
        const card = this.getRandomCard()
        if (finishedWordsIds.includes(card.word.uuid)) {
          i--
        } else {
          cards.push(card)
        }
      }
      this.cards = cards
    },
    dragStartHandler (e) {
      if (!this.lock) {
        this.lock = true
        const target = isTouch ? e.touches[0] : e
        this.startX = target.clientX
        this.startY = target.clientY
        window.addEventListener('touchmove', this.dragHandler)
        window.addEventListener('mousemove', this.dragHandler)
      }
    },
    dragHandler (e) {
      const target = isTouch ? e.touches[0] : e
      const moveX = target.clientX - this.startX
      const moveY = target.clientY - this.startY
      let deg = Math.atan(moveX / (this.rotatePointOffset - this.startY)) / Math.PI * 180
      deg = Math.min(Math.max(-90, deg), 90)
      this.cards[0].deg = deg
    },
    dragEndHandler (e) {
      window.removeEventListener('touchmove', this.dragHandler)
      window.removeEventListener('mousemove', this.dragHandler)
      const dragingCard = this.cards[0]
      if (Math.abs(dragingCard.deg) > 20) {
        dragingCard.transition = true
        dragingCard.deg *= 2
        dragingCard.opacity = 0
        if (dragingCard.deg > 0) {
          dragingCard.translateX = '20%'
          dragingCard.translateY = '-100%'
          finishWord(dragingCard.word)
          this.progress = getFinishPercent()
        } else {
          dragingCard.translateX = '-100%'
          dragingCard.translateY = '-20%'
        }
        this.cards[0] = dragingCard
        setTimeout(() => {
          this.lock = false
          this.cards.push(this.getRandomCard())
          this.cards.shift()
        }, 250)
      } else {
        this.cards[0].transition = true
        this.cards[0].deg = this.cards[0].translateX = this.cards[0].translateY = 0
        setTimeout(() => {
          this.cards[0].transition = false
          this.lock = false
        }, 300)
      }
    }
  }
}
</script>

<style lang='scss'>
@import 'styles/base';

.container {
  width: 100%;
  height: 100%;
}

.card-list {
  position: fixed;
  bottom: 5%;
  left: 50%;
  width: 84vw;
  height: 75vh;
  max-height: 560px;
  max-width: 320px;
  transform: translateX(-50%);
}
</style>

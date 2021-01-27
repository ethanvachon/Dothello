<template lang="">
  <div class="col-3 m-3 p-1">
    <div :style="`background: linear-gradient( rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url('${board.imgUrl}') no-repeat center center /cover;`" id="board">
      <h5 class="text-white pt-2 pl-2">
        {{ board.name }}
      </h5>
      <!-- <img :src="board.imgUrl" class="test-img"> -->
      <button @click="deleteBoard">
        Delete
      </button>
      <p @click="travel">
        Travel
      </p>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
// import { onMounted } from 'vue'
import { boardService } from '../services/BoardService'
export default {
  name: 'BoardComponent',
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    return {
      deleteBoard() {
        boardService.deleteBoard(props.board.id)
      },
      travel() {
        router.push({ path: '/board/' + props.board.id })
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/board.css"
</style>

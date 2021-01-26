<template lang="">
  <div class="card col-3 m-3">
    {{ board.id }}
    {{ board.name }}
    <button @click="deleteBoard">
      Delete
    </button>
    <button @click="changeBoard">
      Change
    </button>
    <button @click="travel">
      Travel
    </button>
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
      changeBoard() {
        boardService.putBoard({ name: 'this is a changed name' }, props.board.id)
      },
      travel() {
        router.push({ path: '/board/' + props.board.id })
      }
    }
  }
}
</script>
<style scoped>

</style>

<template lang="">
  <button @click="makeBoard">
    Make Board
  </button>
  <button @click="getBoards">
    Get
  </button>
  <div class="row justify-content-center">
    <board-component v-for="board in boards" :key="board.name" :board="board"></board-component>
  </div>
</template>
<script>
import { computed, onMounted } from 'vue'
import { boardService } from '../services/BoardService'
import { AppState } from '../AppState'
export default {
  name: 'BoardsPage',
  setup() {
    onMounted(() => {
      boardService.postBoard({
        name: 'this is a name'
      })
      boardService.getBoards()
      AppState.boards = [{ name: 'Hi this is a board bitchh' }, { name: 'hi 2' }, { name: ' REEEEE' }, { name: 'goteeeem' }, { name: 'board three' }]
    })
    return {
      boards: computed(() => AppState.boards),
      makeBoard() {
        boardService.postBoard({
          name: 'this is a name'
        })
      },
      getBoards() {
        boardService.getBoards()
      }
    }
  }
}
</script>
<style scoped>

</style>

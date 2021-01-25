<template lang="">
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
      boardService.getBoards()
      AppState.boards = [{ name: 'Hi this is a board bitchh' }, { name: 'hi 2' }, { name: ' REEEEE' }, { name: 'goteeeem' }, { name: 'board three' }]
    })
    return {
      boards: computed(() => AppState.boards)
    }
  }
}
</script>
<style scoped>

</style>

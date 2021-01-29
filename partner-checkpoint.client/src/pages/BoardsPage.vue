<template lang="">
  <div id="boards" :class="{'bg-secondary': !state.user.isAuthenticated, 'lighten': state.user.isAuthenticated}">
    <div v-if="state.user.isAuthenticated">
      <nav-component :page="'Boards'"></nav-component>
    </div>
    <div class="row justify-content-center align-items-center" :class="{'height': !state.user.isAuthenticated}">
      <div v-if="state.user">
        <welcome-component v-if="!state.user.isAuthenticated" />
      </div>
      <board-component v-for="board in boards" :key="board.name" :board="board"></board-component>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { boardService } from '../services/BoardService'
import { AppState } from '../AppState'
import BoardComponent from '../components/BoardComponent'
export default {
  name: 'Boards',
  components: { BoardComponent },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    onMounted(() => {
      const checking = setInterval(function() {
        if (AppState.user.isAuthenticated) {
          boardService.getBoards()
          clearInterval(checking)
        }
      }, 10)
    })
    return {
      state,
      boards: computed(() => AppState.boards),
      makeBoard() {
        boardService.postBoard({
          name: 'this is a name'
        })
      }
      // getBoards() {
      //   boardService.getBoards()
      // },
    }
  }
}
</script>
<style scoped>
#boards.lighten {
  background-color: #ebecf0;
  height: 100%;
}
  .bg-dark {
    height: 100vh;
  }
  .height {
    height: 100vh;
  }
</style>

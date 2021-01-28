<template lang="">
  <div>
    <nav-component :page="'Boards'"></nav-component>
    <button @click="login">
      Log In
    </button>
    <div class="row justify-content-center">
      <div v-if="state.user">
        <welcome-component />
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
import { AuthService } from '../services/AuthService'
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
      },
      // getBoards() {
      //   boardService.getBoards()
      // },
      login() {
        AuthService.loginWithPopup()
      }
    }
  }
}
</script>
<style scoped>

</style>

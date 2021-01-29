<template lang="">
  <div class="modal-background d-flex justify-content-center">
    <div class="modal-clickoff" @click="closeModal()"></div>
    <div class="modal-display d-flex flex-column">
      <div>Name:</div>
      <div>
        <input id="board-modal-name" class="board-modal-input" v-model="state.name" />
      </div>
      <div>Image:</div>
      <div>
        <input id="board-modal-image" class="board-modal-input" v-model="state.imgUrl" />
      </div>
      {{ state }}
      <button class="mt-3" @click="updateBoard()">
        Update
      </button>
      <button class="mt-5" @click="deleteBoard()">
        Delete
      </button>
      <!-- <button class="task-dot-button">
          <i class="fas fa-ellipsis-h" @click="openComments"></i>
        </button> -->
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const board = computed(() => AppState.board)
    const state = reactive({
      name: board.value.name,
      imgUrl: board.value.imgUrl,
      collaborators: []
    })
    const router = useRouter()
    return {
      state,
      board,
      updateBoard() {
        boardService.putBoard({ name: state.name, imgUrl: state.imgUrl }, board.value.id)
      },
      deleteBoard() {
        boardService.deleteBoard(board.value.id)
        // AppState.splice(AppState.lists.findIndex(l => l.id === list.id), 1)
        // AppState.list = {}
        this.closeModal()
        router.push('/boards')
      },
      closeModal() {
        AppState.showModal = false
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/modal.css";
@import "../assets/css/list.css";

.new-list-color-button {
    border-radius: 100%;
    width: 25px;
    height: 25px;
    background-color: var(--new-list-color);
    display: inline-block;
    cursor: pointer;
    position: relative;
    margin: 2px;
    border: none;
    transition: width 0.5s, height 0.5s;
    padding: 0;
    color: transparent;
}

.new-list-color-button:hover {
    color: white;
}
</style>

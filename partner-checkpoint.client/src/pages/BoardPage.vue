<template>
  <div id="page-board"
       class="page"
       :class="{'loading': !board.imgUrl}"
       :style="`background: linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url('${board.imgUrl}') no-repeat center center /cover;`"
  >
    <!-- <Navbar /> -->
    <nav-component :page="'Board'" :board-id="board.id"></nav-component>
    <!-- <div class="comment-modal-background" v-if="showModal"></div> -->
    <board-modal v-if="showModal && modalType === 'board'"></board-modal>
    <list-modal v-if="showModal && modalType === 'list'"></list-modal>
    <task-modal v-if="showModal && modalType === 'task'"></task-modal>
    <!-- <button @click="addList">
      Add List
    </button> -->
    <!-- <h1>{{ board.name }}</h1> -->
    <!-- <div class="row justify-content-center"> -->
    <div id="board-scroll" class="fancy-scrollbar">
      <!-- <div class="container-fluid"> -->
      <div id="lists" class="d-flex align-items-start mx-1">
        <list-component v-for="list in lists" :key="list.name" :list="list"></list-component>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import { computed, onMounted } from 'vue'
import { listService } from '../services/ListService'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
import { taskService } from '../services/TaskService'
import { useRoute } from 'vue-router'
import { AuthService } from '../services/AuthService'
import { dragDrop } from '../utils/DragDrop'
import ListModal from '../components/ListModal.vue'
export default {
  components: { ListModal },
  setup() {
    const board = computed(() => AppState.board)
    const route = useRoute()
    onMounted(() => {
      dragDrop()
      const checking = setInterval(function() {
        if (AppState.user.isAuthenticated) {
          boardService.getBoard(route.params.id, true)
          listService.getLists(route.params.id)
          taskService.getTasks(route.params.id)
          clearInterval(checking)
        }
      }, 10)
    })
    return {
      board,
      lists: computed(() => AppState.lists),
      showModal: computed(() => AppState.showModal),
      modalType: computed(() => AppState.modalType),
      addList() {
        listService.postList({ name: 'Hi this is a list', boardId: route.params.id, color: 'red' })
      },
      login() {
        AuthService.loginWithPopup()
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/boardpage.css";
@import "../assets/css/global.css";
@import "../assets/css/comment.css";
@import "../assets/css/task.css";
</style>

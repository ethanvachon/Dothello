<template>
  <div id="page-board"
       class="page"
       :style="`background: linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url('${board.imgUrl}') no-repeat center center /cover;`"
  >
    <!-- <Navbar /> -->
    <nav-component :page="'Board'" :board-id="board.id"></nav-component>
    <!-- <div class="comment-modal-background" v-if="showModal"></div> -->
    <comment-modal v-if="showModal"></comment-modal>
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
export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      const checking = setInterval(function() {
        if (AppState.user.isAuthenticated) {
          boardService.getBoard(route.params.id)
          listService.getLists(route.params.id)
          taskService.getTasks(route.params.id)
          clearInterval(checking)
        }
      }, 10)
      AppState.lists = [{ name: 'Hi this is a board', id: '1' }, { name: 'hi 2' }, { name: ' REEEEE', id: '3' }, { name: 'goteeeem' }, { name: 'board three' }]
      AppState.tasks = [{ name: 'this is a task', listId: '1' }, { name: 'this should be on the third', listId: '3' }]
    })
    return {
      board: computed(() => AppState.board),
      lists: computed(() => AppState.lists),
      showModal: computed(() => AppState.showModal),
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
</style>

<template lang="">
  <button @click="addList">
    Add List
  </button>
  <h1>{{ board.name }}</h1>
  <p>raw data: {{ board }}</p>
  {{ routeParams }}
  <!-- <div class="row justify-content-center"> -->
  <div id="lists" class="card-columns">
    <list-component v-for="list in lists" :key="list.name" :list="list"></list-component>
  </div>
  <!-- </div> -->
</template>
<script>
import { computed, onMounted } from 'vue'
import { listService } from '../services/ListService'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
import { taskService } from '../services/TaskService'
import { useRoute } from 'vue-router'
export default {
  name: 'ListPage',
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
      AppState.lists = [{ name: 'Hi this is a board bitchh', id: '1' }, { name: 'hi 2' }, { name: ' REEEEE', id: '3' }, { name: 'goteeeem' }, { name: 'board three' }]
      AppState.tasks = [{ name: 'this is a task', listId: '1' }, { name: 'this should be on the third', listId: '3' }]
    })
    return {
      board: computed(() => AppState.board),
      lists: computed(() => AppState.lists),
      addList() {
        listService.postList({ name: 'Hi this is a list', boardId: route.params.id, color: 'red' })
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/boardpage.css"
</style>

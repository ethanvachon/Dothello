<template lang="">
  <div class="task d-flex my-2 p-2"
       draggable="true"
       :task-id="task.id"
       :board-id="task.boardId"
  >
    <!-- <input
      id="${this.id}-checkbox"
      class="task-checkbox"
      type="checkbox"
      onclick=""
    > -->
    <!-- <comment-modal v-if="state.showComments"></comment-modal> -->
    <span class="task-checkbox mr-2" :class="{'checked':state.checked}" @click="checkBox">
      <i class="far fa-square" v-if="!state.checked"></i>
      <i class="far fa-check-square" v-if="state.checked"></i>
    </span>
    <div v-html="task.name" class="task-name">
    </div>
    <button class="task-dot-button">
      <i class="fas fa-ellipsis-h" @click="openTask"></i>
    </button>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
// import CommentModal from '../components/CommentModal'
import { AppState } from '../AppState'
import { commentService } from '../services/CommentService'
import { taskService } from '../services/TaskService'
export default {
  name: 'TaskComponent',
  // components: { CommentModal },
  props: {
    task: {
      type: Object,
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      checked: computed(() => AppState.tasks[AppState.tasks.findIndex(task => task.id === props.task.id)].completed)
    })
    return {
      state,
      checkBox() {
        const i = AppState.tasks.findIndex(task => task.id === props.task.id)
        state.checked ? AppState.tasks[i].completed = false : AppState.tasks[i].completed = true
        taskService.putTask({ completed: state.checked }, props.task.id)
      },
      openTask() {
        commentService.getComments(props.task.id)
        AppState.task = props.task
        AppState.showModal = true
        AppState.modalType = 'task'
      }
    }
  }
}
</script>
<style scoped>
/* @import "../assets/css/task.css"; */
</style>

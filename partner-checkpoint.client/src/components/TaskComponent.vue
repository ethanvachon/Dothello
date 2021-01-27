<template lang="">
  <div class="task my-2 p-2">
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
    <div class="task-name">
      {{ task.name }}
    </div>
    <button class="task-dot-button">
      <i class="fas fa-ellipsis-h" @click="openComments"></i>
    </button>
  </div>
</template>
<script>
import { reactive } from 'vue'
// import CommentModal from '../components/CommentModal'
import { AppState } from '../AppState'
import { commentService } from '../services/CommentService'
export default {
  name: 'TaskComponent',
  // components: { CommentModal },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      checked: false
    })
    return {
      state,
      checkBox() {
        state.checked ? state.checked = false : state.checked = true
      },
      openComments() {
        commentService.getComments(props.task.id)
        AppState.task = props.task
        AppState.showModal = true
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/task.css";
</style>

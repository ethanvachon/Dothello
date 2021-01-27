<template lang="">
  <div id="comment-modal-background" class="d-flex justify-content-center">
    <div id="comment-modal-clickoff" @click="closeModal"></div>
    <div id="comment-modal">
      <div class="task my-2 p-2">
        <!-- <input
      id="${this.id}-checkbox"
      class="task-checkbox"
      type="checkbox"
      onclick=""
    > -->
        <!-- <comment-modal v-if="state.showComments"></comment-modal> -->
        <h3>
          <span class="task-checkbox mr-2" :class="{'checked':state.checked}" @click="checkBox">
            <i class="far fa-square" v-if="!state.checked"></i>
            <i class="far fa-check-square" v-if="state.checked"></i>
          </span>
          <span class="task-name">{{ task.name }}</span>
        </h3>
        <!-- <button class="task-dot-button">
          <i class="fas fa-ellipsis-h" @click="openComments"></i>
        </button> -->
      </div>

      <hr />
      <div id="comment-form">
        <textarea id="comment-form-text" v-model="form.commentInput"></textarea>
      </div>
      <button id="comment-form-button" @click="addComment">
        <i class="fas fa-plus"></i>
      </button>
      <hr />
      <comment-component v-for="comment in comments" :key="comment.name" :comment="comment"></comment-component>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentService } from '../services/CommentService'
export default {
  setup() {
    const form = reactive({
      commentInput: '',
      name: computed(() => form.commentInput.split('\n').join('<br/>')),
      taskId: computed(() => AppState.task.id)
    })
    const state = reactive({
      checked: false
    })
    return {
      form,
      state,
      task: computed(() => AppState.task),
      comments: computed(() => AppState.comments),
      checkBox() {
        state.checked ? state.checked = false : state.checked = true
      },
      closeModal() {
        AppState.showModal = false
        AppState.comments = []
      },
      addComment() {
        commentService.postComment(form)
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/comment.css";
</style>

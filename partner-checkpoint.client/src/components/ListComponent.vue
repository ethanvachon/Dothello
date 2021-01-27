<template lang="">
  <div class="list-card col my-3">
    <div class="list-header row" :style="`background-color: ${list.color}`">
      <div class="col p-0 d-flex justify-content-center">
        <button
          class="list-delete-button"
          onclick="app.modalController.confirmDelete('${this.id}')"
          data-toggle="modal"
          data-target="#modal-confirm"
        >
          <i class="fas fa-times"></i>
        </button>

        <h5 class="list-title text-center py-1 px-3">
          {{ list.name }}
        </h5>

        <!-- <p
          class="text-center p-0"
          id="${this.id}-ratio"
        >
          ${this.CalcTasks.completed}/${this.CalcTasks.tasks}
        </p> -->
      </div>
    </div>

    <div class="list-body row">
      <div class="col dropzone py-3" id="${this.id}-tasks">
        <task-component v-for="task in tasks" :key="task.name" :task="task"></task-component>
      </div>
    </div>

    <div class="list-bottom-space row pt-5">
    </div>

    <div class="list-footer row d-flex justify-content-center py-3">
      <form class="new-task-form" @submit.prevent="addTask">
        <input
          name="new-task-name"
          class="new-task-name"
          type="text"
          placeholder="Add Task..."
          :style="`caret-color: ${list.color}`"
          pattern=".{3,30}"
          maxlength="30"
          required
          :onfocusin="`this.style['border-bottom']='2px solid ${list.color}'`"
          onfocusout="this.style['border-bottom']='2px solid var(--light-gray)'"
          v-model="state.newTask"
        >

        <button class="new-task-fake-button">
          <i class="fas fa-plus"></i>
        </button>

        <button
          class="new-task-button"
          :style="`color: ${list.color}`"
          :onmouseover="`this.style['background-color']='${list.color}';this.style.color='white'`"
          :onmouseout="`this.style['background-color']='rgb(0, 0, 0, 0)';this.style.color='${list.color}'`"
        >
          <i class="fas fa-plus"></i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { taskService } from '../services/TaskService'
export default {
  name: 'ListComponent',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newTask: ''
    })
    return {
      state,
      tasks: computed(() => AppState.tasks.filter(task => task.listId === props.list.id)),
      addTask() {
        taskService.postTask({ name: state.newTask, list: props.list.id, boardId: props.list.boardId })
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/list.css";
@import "../assets/css/global.css";
</style>

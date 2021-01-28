<template lang="">
  <div class="list-card col my-3">
    <div class="list-header row">
      <div class="d-flex justify-content-between align-items-start list-header-container">
        <!-- <button
          class="list-delete-button"
          onclick="app.modalController.confirmDelete('${this.id}')"
          data-toggle="modal"
          data-target="#modal-confirm"
        >
          <i class="fas fa-times"></i>
        </button> -->

        <h5 class="list-title text-center py-1 px-3" :style="`background-color: ${list.color}`">
          {{ list.name }}
        </h5>

        <div class="list-buttons">
          <button
            class="list-button"
            :style="`color: ${list.color}`"
            :onmouseover="`this.style['background-color']='${list.color}';this.style.color='white'`"
            :onmouseout="`this.style['background-color']='';this.style.color='${list.color}'`"
            @click="openList"
          >
            <h5 class="m-0">
              <i class="fas fa-cog"></i>
            </h5>
          </button>
          <!-- <button
            class="list-button"
            :style="`color: ${list.color}`"
            :onmouseover="`this.style['background-color']='${list.color}';this.style.color='white'`"
            :onmouseout="`this.style['background-color']='';this.style.color='${list.color}'`"
          >
            <h5 class="m-0">
              <i class="fas fa-palette"></i>
            </h5>
          </button>
          <button
            class="list-button ml-1"
            :style="`color: ${list.color}`"
            :onmouseover="`this.style['background-color']='red';this.style.color='white'`"
            :onmouseout="`this.style['background-color']='';this.style.color='${list.color}'`"
          >
            <h5 class="m-0">
              <i class="fas fa-trash"></i>
            </h5>
          </button> -->
        </div>

        <!-- <div class="list-title-bar">
        </div> -->

        <!-- <p
          class="text-center p-0"
          id="${this.id}-ratio"
        >
          ${this.CalcTasks.completed}/${this.CalcTasks.tasks}
        </p> -->
      </div>
    </div>

    <div class="list-body row dropzone">
      <div class="col task-column pb-3"
           id="${this.id}-tasks"
           :list-id="list.id"
           :task-count="tasks.length"
           :class="{'dragThrough':dragging, 'pt-5':tasks.length == 0}"
      >
        <task-component v-for="(task, index) in tasks" :key="task.name" :task="task" :order="index"></task-component>
      </div>
    </div>

    <div class="list-bottom-space row pt-5">
    </div>

    <div class="list-footer row d-flex justify-content-center py-3">
      <form class="new-task-form" @submit.prevent="addTask(tasks.length)">
        <input
          name="new-task-name"
          class="new-task-name"
          type="text"
          placeholder="Add Task..."
          :style="`caret-color: ${list.color}`"
          pattern=".{3,}"
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
      dragging: computed(() => AppState.dragging),
      tasks: computed(() => AppState.tasks.filter(task => task.listId === props.list.id)),
      addTask(taskAmount) {
        taskService.postTask({ name: state.newTask, list: props.list.id, boardId: props.list.boardId, order: taskAmount + 1 })
      },
      openList() {
        AppState.list = props.list
        AppState.showModal = true
        AppState.modalType = 'list'
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/list.css";
@import "../assets/css/global.css";
</style>

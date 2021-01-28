<template lang="">
  <div class="modal-background d-flex justify-content-center">
    <div class="modal-clickoff" @click="closeModal()"></div>
    <div class="modal-display">
      <!-- <input
      id="${this.id}-checkbox"
      class="task-checkbox"
      type="checkbox"
      onclick=""
    > -->
      <!-- <comment-modal v-if="state.showComments"></comment-modal> -->
      <h3 class="list-title text-center py-1 px-3"
          :style="`background-color: ${list.color}`"
          :contenteditable="true"
          @blur="editName"
      >
        {{ list.name }}
      </h3>
      <div class="d-flex justify-content-stretch">
        <div v-for="color in colors" :key="color">
          <div
            class="new-list-color-button d-flex justify-content-center align-items-center"
            @click="setColor(color, list)"
            :style="`background-color: ${color}`"
          >
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </div>
      <button @click="deleteList(list)">
        Delete
      </button>
      <!-- <button class="task-dot-button">
          <i class="fas fa-ellipsis-h" @click="openComments"></i>
        </button> -->
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { listService } from '../services/ListService'
export default {
  setup() {
    const colors = [
      '#ff4747',
      '#ffac47',
      '#ffda47',
      '#87ff47',
      '#47ffa9',
      '#47daff',
      '#4791ff',
      '#9d47ff',
      '#ff47ce'
    ]
    const list = computed(() => AppState.list)
    return {
      colors,
      list,
      editName(e) {
        listService.putList({ name: e.target.innerText }, list.value.id, list.value.boardId)
      },
      setColor(color, list) {
        listService.putList({ color: color }, list.id, list.boardId)
        AppState.list.color = color
      },
      deleteList(list) {
        listService.deleteList(list.id, list.boardId)
        // AppState.splice(AppState.lists.findIndex(l => l.id === list.id), 1)
        AppState.list = {}
        this.closeModal()
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

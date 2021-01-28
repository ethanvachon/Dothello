<template lang="">
  <div class="modal-background d-flex justify-content-center">
    <div class="modal-clickoff" @click="closeModal"></div>
    <div class="modal-display">
      <!-- <input
      id="${this.id}-checkbox"
      class="task-checkbox"
      type="checkbox"
      onclick=""
    > -->
      <!-- <comment-modal v-if="state.showComments"></comment-modal> -->
      <h3 class="list-title text-center py-1 px-3" :style="`background-color: ${list.color}`">
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
      <!-- <button class="task-dot-button">
          <i class="fas fa-ellipsis-h" @click="openComments"></i>
        </button> -->
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
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
    const state = reactive({
      checked: computed(() => AppState.task.completed)
    })
    return {
      colors,
      state,
      list: computed(() => AppState.list),
      setColor(color, list) {
        listService.putList({ color: color }, list.id, list.boardId)
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

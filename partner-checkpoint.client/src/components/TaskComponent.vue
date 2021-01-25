<template lang="">
  <div class="task">
    <input
      id="${this.id}-checkbox"
      class="task-checkbox"
      type="checkbox"
      onclick=""
    >
    <span class="task-name">{{ task.name }}</span>
    <button
      id="${this.id}-dots"
      class="task-dot-button"
      onclick="app.popController.show('${this.id}', '${this.listId}', event)"
    >
      <i class="fas fa-ellipsis-h"></i>
    </button>
  </div>
</template>
<script>
export default {
  name: 'TaskComponent',
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
@import "../assets/css/task.css";
</style>

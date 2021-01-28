<template lang="">
  <div>
    <p>{{ comment.userName }}</p>
    <p v-html="comment.name"
       class="my-2 ml-2"
       :contenteditable="comment.userId === accountId"
       @blur="editComment"
    >
    </p>
    <button @click="deleteComment"
            v-if="comment.userId === accountId"
    >
      Delete
    </button>
  </div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { commentService } from '../services/CommentService'
// import { computed, reactive } from 'vue'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      editComment(e) {
        // listService.putList({ name: e.target.innerText }, list.value.id, list.value.boardId)
        commentService.putComment({ name: e.target.innerText }, props.comment.id, props.comment.taskId)
      },
      accountId: computed(() => AppState.account._id),
      deleteComment: () => { commentService.deleteComment(props.comment.id, props.comment.taskId) }
    }
  }
}
</script>
<style lang="">

</style>

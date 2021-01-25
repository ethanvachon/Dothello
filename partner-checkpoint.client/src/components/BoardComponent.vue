<template lang="">
  <div class="card col-3 m-3">
    {{ board }}
  </div>
</template>
<script>
export default {
  name: 'BoardComponent',
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {

    }
  }
}
</script>
<style scoped>

</style>

<template>
  <div class="card text-center welcome">
    <div class="card-body d-flex justify-content-center align-items-center">
      <div>
        <h1 class="card-title display-2 sick-font items">
          Welcome
        </h1>
        <h2 class="card-text sick-font items">
          Please Log In
        </h2>
        <button @click="login" class="btn btn-outline-dark mt-3">
          Log In
        </button>
      </div>
    </div>
  </div>
  <div class="sick-font">
  </div>
</template>
<script>
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      login() {
        AuthService.loginWithPopup()
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/global.css";
.sick-font{
    font-family: 'Lobster', cursive;
}
.welcome {
  height: 50vh;
  width: 50vw;
}
</style>

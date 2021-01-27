<template>
  <div id="nav-bar" class="align-items-center container-fluid">
    <div class="row" id="nav-row">
      <!-- <div id="nav-bar-add"> -->
      <div class="col-4 d-flex align-items-center nav-column">
        <input id="nav-add-input"
               :onfocusin="`this.style['width']='100%';this.style['background-color']='rgb(255,255,255)'`"
               :onfocusout="`this.style['width']='50%';this.style['background-color']='rgba(255,255,255,0.7)'`"
        />
      </div>
      <!-- <inp class="fas fa-plus" @click="add(page)" ></input> -->
      <!-- </div> -->
      <div class="col-4 d-flex justify-content-center align-items-center nav-column">
        <h3 id="nav-logo" class="m-0">
          Dethello
        </h3>
      </div>
      <div class="col-4 nav-column d-flex justify-content-between align-items-center">
        <button id="nav-login" @click="logout" class="">
          Logout
        </button>
        <img
          :src="user.picture"
          alt="user photo"
          height="40"
          id="nav-acc-picture"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { AuthService } from '../services/AuthService'
import { boardService } from '../services/BoardService'
import { AppState } from '../AppState'
export default {
  props: {
    page: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return {
      user: computed(() => AppState.user),
      add(page) {
        if (page === 'Boards') {
          boardService.postBoard()
        }
      },
      login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/navbar.css";
</style>

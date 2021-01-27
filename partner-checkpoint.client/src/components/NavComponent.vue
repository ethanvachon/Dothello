<template>
  <div id="nav-bar" class="align-items-center container-fluid">
    <div class="row" id="nav-row">
      <!-- <div id="nav-bar-add"> -->
      <div class="col-4 d-flex align-items-center nav-column">
        <form id="" :class="{'focus':input.add}" class="align-items-center nav-add-input-div" @submit.prevent="add(boardId)">
          <input class="nav-add-input"
                 @focus="input.add = true"
                 @focusout="input.add = false"
                 :class="{'focus':input.add}"
                 v-model="input.addName"
          />
          <i id="" class="fas fa-plus nav-add-input-icon" :class="{'focus':input.add}" @click="add(boardId)"></i>
        </form>

        <form :class="{'focus':input.image}"
              class="ml-2 align-items-center nav-add-input-div"
              @submit.prevent="setImage(boardId)"
        >
          <input class="nav-add-input"
                 @focus="input.image = true"
                 @focusout="input.image = false"
                 :class="{'focus':input.image}"
                 v-model="input.setImage"
          />
          <i id="" class="far fa-image nav-add-input-icon" :class="{'focus':input.image}" @click="setImage(boardId)"></i>
        </form>
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
import { computed, reactive } from 'vue'
import { AuthService } from '../services/AuthService'
// import { boardService } from '../services/BoardService'
import { AppState } from '../AppState'
import { listService } from '../services/ListService'
import { boardService } from '../services/BoardService'
export default {
  props: {
    page: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const input = reactive({
      add: false,
      addName: '',
      image: false,
      setImage: ''
    })
    return {
      input,
      boardId: computed(() => AppState.board.id),
      user: computed(() => AppState.user),
      add(boardId = '') {
        if (props.page === 'Board') {
          const data = {
            name: input.addName,
            boardId: boardId
          }
          listService.postList(data)
        }
      },
      async setImage(boardId) {
        await boardService.putBoard({ imgUrl: input.setImage }, boardId)
        await boardService.getBoard(boardId)
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

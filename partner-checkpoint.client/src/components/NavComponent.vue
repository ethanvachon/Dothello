<template>
  <div id="nav-bar" class="align-items-center container-fluid" :class="{'blue': page === 'Boards' || !boardId}">
    <div class="row" id="nav-row">
      <div class="col-4 d-flex align-items-center nav-column">
        <!-- Settings for board -->
        <span
          class="align-items-center nav-add-input-div"
          v-if="page === 'Board'"
          @click="openBoard"
        >
          <div class="nav-add-input"></div>
          <i id="" class="fas fa-cog nav-add-input-icon"></i>
        </span>

        <!-- Add a board/list -->
        <form id=""
              :class="{'focus':input.add}"
              class="ml-2 align-items-center nav-add-input-div"
              @submit.prevent="add(boardId); blurInput()"
        >
          <input class="nav-add-input"
                 @focus="input.add = true"
                 @focusout="input.add = false"
                 :class="{'focus':input.add}"
                 v-model="input.addName"
                 pattern=".{3,30}"
                 maxlength="30"
                 required
          />
          <i id="" class="fas fa-plus nav-add-input-icon" :class="{'focus':input.add}"></i>
        </form>

        <!-- Set image of board -->
        <form :class="{'focus':input.image}"
              class="ml-2 align-items-center nav-add-input-div"
              @submit.prevent="setImage(boardId); blurInput()"
              v-if="page === 'Board'"
        >
          <input class="nav-add-input"
                 @focus="input.image = true"
                 @focusout="input.image = false"
                 :class="{'focus':input.image}"
                 v-model="input.setImage"
          />
          <i id="" class="far fa-image nav-add-input-icon" :class="{'focus':input.image}"></i>
        </form>

        <!-- Add collaborators -->
        <form :class="{'focus':input.collab}"
              class="ml-2 align-items-center nav-add-input-div"
              @submit.prevent="addCollab(boardId); blurInput()"
              v-if="page === 'Board'"
        >
          <input class="nav-add-input"
                 @focus="input.collab = true"
                 @focusout="input.collab = false"
                 :class="{'focus':input.collab}"
                 v-model="input.setCollab"
          />
          <i id="" class="fas fa-users nav-add-input-icon" :class="{'focus':input.collab}"></i>
        </form>
      </div>
      <div class="col-4 d-flex justify-content-center align-items-center nav-column">
        <!-- Logo -->
        <h3 id="nav-logo" class="m-0" @click="home">
          Dethello
        </h3>
      </div>
      <div class="col-4 nav-column d-flex justify-content-end align-items-center" v-if="user.isAuthenticated">
        <!-- Logout -->
        <button id="nav-logout" @click="logout" class="mr-3">
          Logout
        </button>

        <!-- Account Image -->
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
import { useRouter } from 'vue-router'
export default {
  props: {
    page: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const input = reactive({
      add: false,
      addName: '',
      image: false,
      setImage: '',
      collab: false,
      setCollab: ''
    })
    return {
      input,
      boardId: computed(() => AppState.board.id),
      user: computed(() => AppState.user),
      openBoard() {
        AppState.showModal = true
        AppState.modalType = 'board'
      },
      add(boardId = '') {
        if (props.page === 'Board') {
          const data = {
            name: input.addName,
            boardId: boardId
          }
          listService.postList(data)
        } else if (props.page === 'Boards') {
          const data = {
            name: input.addName
          }
          boardService.postBoard(data)
        }
        input.addName = ''
      },
      async setImage(boardId) {
        await boardService.putBoard({ imgUrl: input.setImage }, boardId)
        input.setImage = ''
        await boardService.getBoard(boardId)
      },
      addCollab(boardId) {
        boardService.addCollaborator(boardId, input.setCollab)
        input.setCollab = ''
      },
      blurInput() {
        document.activeElement.blur()
      },
      home() {
        router.push('/boards')
        AppState.board = {}
        AppState.lists = []
        AppState.tasks = []
        AppState.comments = []
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

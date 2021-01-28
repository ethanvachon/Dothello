<template>
  <div id="nav-bar" class="align-items-center container-fluid">
    <div class="row" id="nav-row">
      <div class="col-4 d-flex align-items-center nav-column">
        <!-- Add a board/list -->
        <form id="" :class="{'focus':input.add}" class="align-items-center nav-add-input-div" @submit.prevent="add(boardId)">
          <input class="nav-add-input"
                 @focus="input.add = true"
                 @focusout="input.add = false"
                 :class="{'focus':input.add}"
                 v-model="input.addName"
          />
          <i id="" class="fas fa-plus nav-add-input-icon" :class="{'focus':input.add}" @click="add(boardId)"></i>
        </form>

        <!-- Set image of board -->
        <form :class="{'focus':input.image}"
              class="ml-2 align-items-center nav-add-input-div"
              @submit.prevent="setImage(boardId)"
              v-if="page === 'Board'"
        >
          <input class="nav-add-input"
                 @focus="input.image = true"
                 @focusout="input.image = false"
                 :class="{'focus':input.image}"
                 v-model="input.setImage"
          />
          <i id="" class="far fa-image nav-add-input-icon" :class="{'focus':input.image}" @click="setImage(boardId)"></i>
        </form>

        <!-- Add collaborators -->
        <form :class="{'focus':input.collab}"
              class="ml-2 align-items-center nav-add-input-div"
              @submit.prevent="addCollab(boardId)"
              v-if="page === 'Board'"
        >
          <input class="nav-add-input"
                 @focus="input.collab = true"
                 @focusout="input.collab = false"
                 :class="{'focus':input.collab}"
                 v-model="input.setCollab"
          />
          <i id="" class="fas fa-users nav-add-input-icon" :class="{'focus':input.collab}" @click="addCollab(boardId)"></i>
        </form>
      </div>
      <div class="col-4 d-flex justify-content-center align-items-center nav-column">
        <!-- Logo -->
        <h3 id="nav-logo" class="m-0" @click="home">
          Dethello
        </h3>
      </div>
      <div class="col-4 nav-column d-flex justify-content-end align-items-center">
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
      },
      home() {
        router.push('/boards')
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

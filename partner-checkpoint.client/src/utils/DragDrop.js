import { AppState } from '../AppState'
import { taskService } from '../services/TaskService'

export function dragDrop() {
  let parent
  let dragged
  const shadow = document.createElement('div')
  shadow.classList.add('taskShadow')

  /* events fired on the draggable target */
  document.addEventListener('drag', function(event) {

  }, false)

  document.addEventListener('dragstart', function(event) {
    dragged = event.target
    parent = dragged.parentNode
    dragged.classList.add('dragShadow')
    dragged.classList.add('dragging')
    AppState.dragging = true
  }, false)

  document.addEventListener('dragend', function(event) {
    dragged.classList.remove('dragShadow')
    dragged.classList.remove('dragging')
    AppState.dragging = false
  }, false)

  /* events fired on the drop targets */
  document.addEventListener('dragover', function(event) {
    // prevent default to allow drop
    event.preventDefault()
  }, false)

  document.addEventListener('dragenter', function(event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.classList.contains('dropzone')) {
      event.target.classList.add('hover')
      event.target.children[0].appendChild(shadow)
    }
  }, false)

  document.addEventListener('dragleave', function(event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.classList.contains('dropzone')) {
      event.target.classList.remove('hover')
      event.target.children[0].removeChild(shadow)
    }
  }, false)

  document.addEventListener('drop', function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault()
    // move dragged elem to the selected drop target
    if (event.target.classList.contains('dropzone')) {
      event.target.classList.remove('hover')
      dragged.parentNode.removeChild(dragged)
      event.target.children[0].removeChild(shadow)
      event.target.children[0].appendChild(dragged)
      const tasks = parent.children
      for (let i = 0; i < tasks.length; i++) {
        const taskId = tasks[i].getAttribute('task-id')
        AppState.tasks[AppState.tasks.findIndex(task => task.id === taskId)].order = i + 1
        AppState.tasks = AppState.tasks.sort((a, b) => a.order - b.order).sort((a, b) => (a.listId > b.listId) ? 1 : (a.listId === b.listId) ? 0 : -1)
        taskService.putTask({ order: i + 1 }, taskId)
      }
      taskService.putTask(
        {
          list: event.target.children[0].getAttribute('list-id'),
          order: parseInt(event.target.children[0].getAttribute('task-count')) + 1
        },
        dragged.getAttribute('task-id'),
        dragged.getAttribute('board-id')
      )
    }
  }, false)
}

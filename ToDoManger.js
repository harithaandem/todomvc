import { ToDoActionBarView } from './ToDoActionBarView';
import { ToDoListView } from './ToDoListView';
import { toDoManagerBroker } from './ToDoMangerBroker';
import { ToDoModel } from './ToDoModel';

   function ToDoManager() {
        this.toDoModel = new ToDoModel();
        this.toDoListView = new ToDoListView();
    }

   ToDoManager.prototype.init = function() {
        const toDoActionBarView = new ToDoActionBarView();
        toDoActionBarView.init();
        toDoManagerBroker.addEventListener('addToDo', addItem.bind(this));
        toDoManagerBroker.addEventListener('deleteItem', deleteItem.bind(this));
        toDoManagerBroker.addEventListener('deleteAll', deleteAll.bind(this));
        toDoManagerBroker.addEventListener('deleteSelected', deleteSelected.bind(this));
        toDoManagerBroker.addEventListener('markComplete', markComplete.bind(this));
        toDoManagerBroker.addEventListener('todoSelect', selectToDo.bind(this));
        toDoManagerBroker.addEventListener('updateList', updateList.bind(this));
    }

   function addItem(event) {
        var todoText = event.detail;
        var todoDetails = this.toDoModel.addToDoData(todoText);
        this.toDoListView.createToDoFragment(todoDetails);
    }
    function markComplete(event) {
        var toDoUpdate = event.detail;
        var toDoDetails = this.toDoModel.markComplete(toDoUpdate.todoId);
        this.toDoListView.render(toDoDetails, toDoUpdate.targetItem);
    }
    function selectToDo(event) {
        var toDoUpdate = event.detail;
        var toDoDetails = this.toDoModel.selectToDo(toDoUpdate.todoId);
        this.toDoListView.render(toDoDetails, toDoUpdate.targetItem);
    }
    function updateList(event){
        var toDoDetails = this.toDoModel.updateText(event.detail.todoId, event.detail.todoText);
        this.toDoListView.render(toDoDetails, event.detail.targetItem);
    }

    function deleteAll() {
        this.toDoModel.deleteAll();
        this.toDoListView.deleteAll();
    }
    
    function deleteItem(event) {
       var toDoId = event.detail;
       this.toDoModel.deleteItem(toDoId);
    }

    function deleteSelected() {
       var selectedItems = this.toDoModel.deleteSelected();
       this.toDoListView.deleteSelected(selectedItems);
    }
export {ToDoManager};
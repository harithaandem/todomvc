import { toDoManagerBroker } from "./ToDoMangerBroker";
import { template } from "./ToDoTemplate";

    function ToDoListView() {
        this.toDoContainer=document.getElementById('todo_container');
    }

    ToDoListView.prototype.createToDoFragment = function(todoDetails) {
        var newToDoElement = document.createElement("div");
        this.render(todoDetails, newToDoElement);
        initToDoEvent(newToDoElement);
        newToDoElement.setAttribute("toDoId", todoDetails.toDoId);
        newToDoElement.classList.add("todo_items");
        this.addItem(newToDoElement);
    }

    ToDoListView.prototype.addItem = function(newToDoElement) {
        this.toDoContainer.appendChild(newToDoElement);
    }

    ToDoListView.prototype.deleteAll = function() {
        this.toDoContainer.innerHTML = "";
    }

    ToDoListView.prototype.render = function(todoDetails, newToDoElement) {
        newToDoElement.innerHTML = Mustache.render(template, todoDetails);
    }
   
    ToDoListView.prototype.deleteSelected = function(selectedItems) {
        selectedItems.forEach(toDoDelete);
    }

    function toDoDelete(todoId) {
        document.querySelector(`[todoid='${todoId}']`).remove();
    }

    function initToDoEvent(newToDoElement) {
        newToDoElement.addEventListener('click', toDoItemActions);
    }

    function toDoItemActions(event) {
        var targetItem = event.currentTarget;
        var todoId = targetItem.getAttribute('toDoId');
        var toDoUpdate={
            todoId:todoId,
            targetItem:targetItem
        }
        var markComplete = new CustomEvent('markComplete', {detail:toDoUpdate});
        var todoSelect = new CustomEvent('todoSelect', {detail:toDoUpdate});
        switch(event.target.getAttribute("data-action")) {
            case "mark_todo_completed":
                toDoManagerBroker.dispatchEvent(markComplete);
            break;
            case "todo_delete":
                toDoDelete(todoId);
                var deleteItem = new CustomEvent('deleteItem', {detail:todoId});
                toDoManagerBroker.dispatchEvent(deleteItem);
            break;
            case "todo_update_text":
               var updateFromPrompt = prompt("enter to update"," ");
               var toDoText = updateFromPrompt;
               var updateList = new CustomEvent('updateList',{detail:{todoId:todoId,todoText:toDoText,targetItem:targetItem}});
               toDoManagerBroker.dispatchEvent(updateList);
            break;
            case "select_todo":
                toDoManagerBroker.dispatchEvent(todoSelect);
            break;
            default: break;
        }  
    }

 export {ToDoListView};
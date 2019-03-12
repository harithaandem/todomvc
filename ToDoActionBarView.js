import  {toDoManagerBroker} from './ToDoMangerBroker';

    function ToDoActionBarView() {
    }

    ToDoActionBarView.prototype.init = function() {
        document.getElementById("add_todo").addEventListener('click',getToDoText);
        document.getElementById("delete_all_todo").addEventListener('click',deleteAllItems);
        document.getElementById("delete_selected_todo").addEventListener('click',deleteSelectedItems);
    }

    function getToDoText() {
        var descriptionToBeAdded = todo_text.value;
        if(!descriptionToBeAdded) {
             var textFromPrompt = prompt("enter something", " ");
             descriptionToBeAdded = textFromPrompt;
        }
        var addToDo = new CustomEvent('addToDo', {detail :descriptionToBeAdded});
        toDoManagerBroker.dispatchEvent(addToDo);
        todo_text.value = "";
    } 
   
   function deleteAllItems() {
        var deleteAll = new Event('deleteAll');
        toDoManagerBroker.dispatchEvent(deleteAll);
    }

    function deleteSelectedItems() {
       var DeleteSelected = new Event('deleteSelected');
       toDoManagerBroker.dispatchEvent(DeleteSelected);
   }
export {ToDoActionBarView};
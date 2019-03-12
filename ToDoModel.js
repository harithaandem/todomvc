function ToDoModel() {
    this.toDoItemDetails = {};
}
ToDoModel.prototype.addToDoData = function(toDoText) {
   var toDoDetails = {
       toDoText : toDoText,
       toDoId : new Date().getTime(),
       toDoStatus : false,
       toDoChecked : false
   }
   this.toDoItemDetails[toDoDetails.toDoId] = toDoDetails;
   return this.toDoItemDetails[toDoDetails.toDoId];
}

ToDoModel.prototype.deleteAll = function() { 
    this.toDoItemDetails = {};
}

ToDoModel.prototype.markComplete = function(toDoId) {
   this.toDoItemDetails[toDoId].toDoStatus = !this.toDoItemDetails[toDoId].toDoStatus;
   return this.toDoItemDetails[toDoId];
}

ToDoModel.prototype.selectToDo = function(toDoId) {
    this.toDoItemDetails[toDoId].toDoChecked = !this.toDoItemDetails[toDoId].toDoChecked;
    return  this.toDoItemDetails[toDoId];
}

ToDoModel.prototype.updateText = function(toDoId, toDoText) {
    this.toDoItemDetails[toDoId].toDoText += toDoText;
    return this.toDoItemDetails[toDoId];
}

ToDoModel.prototype.deleteItem = function(toDoId) {
    delete this.toDoItemDetails[toDoId];
}

ToDoModel.prototype.deleteSelected = function() {
    var selectedItems = [];
    for(var todoId in this.toDoItemDetails) {
        if(this.toDoItemDetails[todoId].toDoChecked) {
            delete this.toDoItemDetails[todoId];
            selectedItems.push(todoId);
        }
    }
    return selectedItems;
}

export {ToDoModel};
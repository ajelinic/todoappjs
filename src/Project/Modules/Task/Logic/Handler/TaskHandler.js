/**
 * @TaskHandler
 */

export class TaskHandler {
  constructor(holderElement, checkboxCollection) {
    this.holderElement = holderElement;
    this.checkboxCollection = checkboxCollection;
  }

  handleTask() {
    for (let i = 0; i < this.checkboxCollection.length; i++) {
      if (this.checkboxCollection[i].checked == true) {
        this.checkboxCollection[i].parentElement.style.textDecoration =
          "line-through";
      } else if (this.checkboxCollection[i].checked == false) {
        this.checkboxCollection[i].parentElement.style.textDecoration = "";
      }
    }
  }
}

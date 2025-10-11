/**
 * @TaskHandler
 * @deprecated Will be removed/changed in future releases
 */

export class TaskHandler {
  constructor(taskDataProvider, taskConnector, taskConfig) {
    this.taskDataProvider = taskDataProvider;
    this.taskConnector = taskConnector;
    this.taskConfig = taskConfig;
  }

  async handleTask() {
    for (let i = 0; i < this.taskDataProvider.taskCheckBoxes.length; i++) {
      if (this.taskDataProvider.taskCheckBoxes[i].checked == true) {
        await this.taskConnector.updateTaskStatus(
          this.taskDataProvider.taskCheckBoxes[i].parentElement
        );
        this.taskDataProvider.taskCheckBoxes[i].parentElement.classList.add(
          this.taskConfig.getCrossClass()
        );
      } else if (this.taskDataProvider.taskCheckBoxes[i].checked == false) {
        await this.taskConnector.updateTaskStatus(
          this.taskDataProvider.taskCheckBoxes[i].parentElement
        );
        this.taskDataProvider.taskCheckBoxes[i].parentElement.classList.remove(
          this.taskConfig.getCrossClass()
        );
      }
    }
  }

  handleTaskDueTime(dueButton, timeDueInput) {
    if (timeDueInput.classList.contains(this.taskConfig.hiddenClass)) {
      dueButton.classList.add(this.taskConfig.hiddenClass);
      timeDueInput.classList.remove(this.taskConfig.hiddenClass);
    } else if (dueButton.classList.contains(this.taskConfig.hiddenClass)) {
      dueButton.classList.remove(this.taskConfig.hiddenClass);
      timeDueInput.classList.add(this.taskConfig.hiddenClass);
    }
  }
}

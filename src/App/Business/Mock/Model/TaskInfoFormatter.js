/**
 * @class TaskInfoFormatter
 * @description TaskInfoFormatter
 */
export class TaskInfoFormatter {
  constructor(glossaryRepository, dateTimeService) {
    this.glossaryRepository = glossaryRepository;
    this.dateTimeService = dateTimeService;
  }

  async format(task) {
    const [
      taskIdText,
      taskTitleText,
      taskDueText,
      taskNoDueText,
      taskAddedAtText,
    ] = await Promise.all([
      this.glossaryRepository.getText("task.info.id.text", "Task with id"),
      this.glossaryRepository.getText("task.info.title.text", "with value"),
      this.glossaryRepository.getText(
        "task.info.duetime.text",
        "has to be done by"
      ),
      this.glossaryRepository.getText("task.info.noduetime.text", "."),
      this.glossaryRepository.getText("task.info.addedat.text", "added at"),
    ]);

    const dueText = Number.isFinite(task.dueTime)
      ? `${taskDueText} ${this.dateTimeService.formatMillis(task.dueTime)}`
      : taskNoDueText;

    return `${taskIdText} ${task.id} ${taskTitleText} ${task.taskValue} ${dueText} ${taskAddedAtText} ${task.timeAdded}`;
  }
}

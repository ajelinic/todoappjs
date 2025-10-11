/**
 * @StorageReader
 */

export class StorageReader {
  constructor(taskRepository, glossaryRepository) {
    this.taskRepository = taskRepository;
    this.glossaryRepository = glossaryRepository;
  }

  getLastTaskIdFromStorage() {
    return this.taskRepository.getLastTaskId();
  }

  getDueTime(id) {
    return this.taskRepository.getDueTime(id);
  }

  getLastEnteredTask() {
    return this.taskRepository.getLastEnteredTask();
  }

  getTaskArrayFromStorage() {
    return this.taskRepository.getTaskArrayFromStorage();
  }

  getGlossaryValue(key) {
    return this.glossaryRepository.getGlossaryValue(key);
  }
}

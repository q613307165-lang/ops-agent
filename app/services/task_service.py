from typing import Dict
import uuid

from app.schemas import TaskCreate, TaskStatus


class TaskService:
    """In-memory task store and helper logic.

    For production use you would replace this with a database-backed
    implementation and a background worker system.
    """

    def __init__(self) -> None:
        self._tasks: Dict[str, TaskStatus] = {}

    def create_task(self, payload: TaskCreate) -> TaskStatus:
        task_id = str(uuid.uuid4())
        task = TaskStatus(
            id=task_id,
            description=payload.description,
            status="pending",
            steps=[],
            actions=[],
        )
        self._tasks[task_id] = task
        return task

    def get_task(self, task_id: str) -> TaskStatus | None:
        return self._tasks.get(task_id)

    def save_task(self, task: TaskStatus) -> None:
        self._tasks[task.id] = task

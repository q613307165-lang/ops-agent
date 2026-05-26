from typing import List

from .base import AgentContext
from .planner import PlannerAgent
from .infra import InfraAgent
from .security import SecurityAgent
from .fix import FixAgent
from .aggregator import AggregatorAgent
from app.schemas import TaskStatus, AgentStep, ActionSuggestion
from app.tools.docker_tool import DockerTool
from app.tools.nginx_tool import NginxTool
from app.tools.security_tool import SecurityTool


class Orchestrator:
    """High-level coordinator that wires the agents together for a single task."""

    def __init__(self) -> None:
        docker_tool = DockerTool()
        nginx_tool = NginxTool()
        security_tool = SecurityTool()

        self.planner = PlannerAgent()
        self.infra = InfraAgent(docker_tool, nginx_tool)
        self.security = SecurityAgent(security_tool)
        self.aggregator = AggregatorAgent()
        self.fix = FixAgent()

    async def execute(self, task: TaskStatus) -> TaskStatus:
        context: AgentContext = AgentContext(description=task.description)

        # 1. planner
        context = await self.planner.run(context)
        plan: List[dict] = context.get("plan", [])

        # 2. execute each planned step
        for step in plan:
            role = step.get("role")
            context["current_step"] = step
            if role == "infra":
                context = await self.infra.run(context)
            elif role == "security":
                context = await self.security.run(context)
            elif role == "aggregator":
                context = await self.aggregator.run(context)
            elif role == "fix":
                context = await self.fix.run(context)

        # 3. map trace into TaskStatus
        trace = context.get("trace", [])
        task.steps = [AgentStep(**t) for t in trace]
        actions = [ActionSuggestion(**a) for a in context.get("actions", [])]
        task.actions = actions
        task.status = "completed"
        return task

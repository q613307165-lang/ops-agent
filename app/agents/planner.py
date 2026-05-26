from typing import Any, Dict, List

from .base import AgentContext, BaseAgent


class PlannerAgent(BaseAgent):
    """Planner that decomposes a high-level task into ordered sub-steps.

    In a real implementation, this would call an LLM. Here we use a very simple
    heuristic plan so that the rest of the system can be exercised without
    external dependencies.
    """

    def __init__(self) -> None:
        super().__init__(name="planner")

    async def run(self, context: AgentContext) -> AgentContext:
        description: str = context.get("description", "")
        steps: List[Dict[str, Any]] = []

        # Very naive heuristic just for demonstration
        steps.append(
            {"agent": "infra", "role": "infra", "input": {"focus": "topology_and_services"}}
        )
        steps.append(
            {"agent": "infra", "role": "infra", "input": {"focus": "logs_and_errors"}}
        )
        steps.append(
            {"agent": "security", "role": "security", "input": {"focus": "auth_and_firewall"}}
        )
        steps.append(
            {"agent": "aggregator", "role": "aggregator", "input": {"focus": "root_cause"}}
        )
        steps.append({"agent": "fix", "role": "fix", "input": {"focus": "actions"}})

        context["plan"] = steps
        context.setdefault("trace", []).append(
            {
                "agent": self.name,
                "role": "planner",
                "input": {"description": description},
                "output": {"plan": steps},
            }
        )
        return context

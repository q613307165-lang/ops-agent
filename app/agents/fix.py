import uuid

from .base import AgentContext, BaseAgent
from app.schemas import ActionSuggestion


class FixAgent(BaseAgent):
    """Generates concrete actions (commands, config diffs, rollback hints) from the context.

    In a real system this would use an LLM with access to the collected facts.
    Here we produce a simple heuristic suggestion so that the pipeline runs
    end-to-end.
    """

    def __init__(self) -> None:
        super().__init__(name="fix")

    async def run(self, context: AgentContext) -> AgentContext:
        actions: list[ActionSuggestion] = []

        nginx_logs = context.get("logs", {}).get("nginx")
        if nginx_logs:
            actions.append(
                ActionSuggestion(
                    id=str(uuid.uuid4()),
                    title="Inspect upstream services for recent HTTP 5xx",
                    command="docker ps && docker logs <service_container>",
                    risk_level="low",
                    rationale=(
                        "Recent reverse proxy error summary indicates elevated 5xx; "
                        "inspect upstream containers for crashes or connectivity issues."
                    ),
                )
            )

        context["actions"] = [a.dict() for a in actions]
        context.setdefault("trace", []).append(
            {
                "agent": self.name,
                "role": "fix",
                "input": {},
                "output": {"actions": [a.dict() for a in actions]},
            }
        )
        return context

from typing import Any, Dict

from .base import AgentContext, BaseAgent
from app.tools.docker_tool import DockerTool
from app.tools.nginx_tool import NginxTool


class InfraAgent(BaseAgent):
    """Collects infrastructure facts: nodes, containers, reverse proxy status, etc."""

    def __init__(self, docker_tool: DockerTool, nginx_tool: NginxTool) -> None:
        super().__init__(name="infra")
        self.docker_tool = docker_tool
        self.nginx_tool = nginx_tool

    async def run(self, context: AgentContext) -> AgentContext:
        focus = context.get("current_step", {}).get("input", {}).get("focus")

        if focus == "topology_and_services":
            containers = await self.docker_tool.list_containers()
            routes = await self.nginx_tool.list_routes()
            context["topology"] = {
                "containers": containers,
                "routes": routes,
            }
            output: Dict[str, Any] = {"topology_collected": True}
        else:
            logs_summary = await self.nginx_tool.summarize_recent_errors()
            context.setdefault("logs", {})["nginx"] = logs_summary
            output = {"logs_collected": True}

        context.setdefault("trace", []).append(
            {
                "agent": self.name,
                "role": "infra",
                "input": context.get("current_step", {}).get("input", {}),
                "output": output,
            }
        )
        return context

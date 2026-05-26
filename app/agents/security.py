from .base import AgentContext, BaseAgent
from app.tools.security_tool import SecurityTool


class SecurityAgent(BaseAgent):
    """Analyzes authentication and access logs, firewall events, etc."""

    def __init__(self, security_tool: SecurityTool) -> None:
        super().__init__(name="security")
        self.security_tool = security_tool

    async def run(self, context: AgentContext) -> AgentContext:
        summary = await self.security_tool.summarize_security_events()
        context.setdefault("security", {})["summary"] = summary
        context.setdefault("trace", []).append(
            {
                "agent": self.name,
                "role": "security",
                "input": {},
                "output": {"security_summary": summary},
            }
        )
        return context

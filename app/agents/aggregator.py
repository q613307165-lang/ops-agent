from .base import AgentContext, BaseAgent


class AggregatorAgent(BaseAgent):
    """Combines infra and security facts into a preliminary root cause assessment.

    This is a placeholder; in a full implementation this would use an LLM to
    weigh evidence from multiple sources.
    """

    def __init__(self) -> None:
        super().__init__(name="aggregator")

    async def run(self, context: AgentContext) -> AgentContext:
        topology = context.get("topology")
        nginx_logs = context.get("logs", {}).get("nginx")
        security_summary = context.get("security", {}).get("summary")

        assessment_parts: list[str] = []
        if nginx_logs:
            assessment_parts.append(
                "Reverse proxy logs show recent errors; upstream services may be unhealthy or unreachable."
            )
        if security_summary and security_summary.get("suspicious_activity"):
            assessment_parts.append(
                "Security events include suspicious access patterns; "
                "consider whether rate limiting or blocking rules are involved."
            )

        context["assessment"] = {
            "root_cause_hypothesis": " ".join(assessment_parts)
            or "No obvious single root cause; manual review recommended.",
        }
        context.setdefault("trace", []).append(
            {
                "agent": self.name,
                "role": "aggregator",
                "input": {},
                "output": context["assessment"],
            }
        )
        return context

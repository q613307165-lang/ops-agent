from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any, Dict


class AgentContext(Dict[str, Any]):
    """Shared context passed between agents during a troubleshooting session."""


class BaseAgent(ABC):
    name: str

    def __init__(self, name: str) -> None:
        self.name = name

    @abstractmethod
    async def run(self, context: AgentContext) -> AgentContext:
        """Run this agent given the current context and return the updated context."""
        raise NotImplementedError

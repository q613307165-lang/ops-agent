from typing import Any, Dict, List, Literal, Optional
from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    description: str = Field(
        ...,
        description=(
            "Natural language goal, e.g. "
            "'check last 24h web incidents and suggest fixes'"
        ),
    )
    targets: Optional[List[str]] = Field(
        default=None, description="Optional list of service or host identifiers"
    )


class AgentStep(BaseModel):
    agent: str
    role: Literal["planner", "infra", "security", "fix", "aggregator"]
    input: Dict[str, Any]
    output: Dict[str, Any] | None = None


class ActionSuggestion(BaseModel):
    id: str
    title: str
    command: Optional[str] = None
    config_diff: Optional[str] = None
    risk_level: Literal["low", "medium", "high"] = "medium"
    rationale: str


class TaskStatus(BaseModel):
    id: str
    description: str
    status: Literal["pending", "running", "completed", "failed"]
    steps: List[AgentStep] = []
    actions: List[ActionSuggestion] = []
    error: Optional[str] = None

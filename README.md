# Ops Agent Orchestrator

This project is a backend service that implements a multi-agent operations assistant.
It orchestrates monitoring, log analysis, configuration understanding, and fix suggestion generation into a closed-loop workflow.

## Features

- FastAPI-based HTTP API for creating and inspecting troubleshooting tasks.
- Planner / Infra / Security / Fix agents connected by an orchestrator.
- Tool layer that wraps SSH, Docker, reverse proxy, Cloudflare, and file-sync utilities.
- Human-in-the-loop execution model: agents generate actions, operators decide whether to execute.

## Quick start

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Then open http://127.0.0.1:8000/docs to explore the API.# ops-agent

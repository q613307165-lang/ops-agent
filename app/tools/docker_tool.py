from typing import Any, Dict, List


class DockerTool:
    """Interacts with Docker / Docker Compose on the target host.

    The current implementation is a stub. You can adapt it to call the Docker
    Engine API or to execute docker commands over SSH.
    """

    async def list_containers(self) -> List[Dict[str, Any]]:
        # TODO: replace with real container inspection
        return []

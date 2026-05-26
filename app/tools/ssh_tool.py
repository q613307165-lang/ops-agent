from typing import Tuple


class SSHTool:
    """Placeholder for an SSH execution tool.

    In a real implementation, this would wrap an async SSH client (such as
    asyncssh or paramiko) and enforce a command allow-list.
    """

    async def run(self, host: str, command: str) -> Tuple[int, str, str]:
        # TODO: implement real SSH execution
        return 0, "", ""

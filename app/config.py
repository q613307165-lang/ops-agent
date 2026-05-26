from pydantic import BaseSettings


class Settings(BaseSettings):
    env: str = "dev"
    llm_model: str = "gpt-4.1"
    llm_api_base: str | None = None
    llm_api_key: str | None = None

    class Config:
        env_file = ".env"


settings = Settings()

from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

class AIChatRequest(BaseModel):
    message: str
    conversation_id: Optional[UUID] = None
    language_code: Optional[str] = "en"

class AIChatResponse(BaseModel):
    reply: str
    tokens_used: int
    suggested_actions: List[str]

class AIWorkflowCreateRequest(BaseModel):
    name: str
    trigger_event: str
    action_steps: List[str]

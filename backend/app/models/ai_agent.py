import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Text, Integer, Float, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.base_class import BaseModel

class AIConversation(BaseModel):
    __tablename__ = "ai_conversations"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=True, index=True)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=True, index=True)

    title = Column(String(255), default="New SEO AI Conversation", nullable=False)
    system_prompt = Column(Text, nullable=True)
    language_code = Column(String(8), default="en", nullable=False)
    message_count = Column(Integer, default=0, nullable=False)
    is_archived = Column(Boolean, default=False, nullable=False)

    messages = relationship("AIMessage", back_populates="conversation", cascade="all, delete-orphan")

class AIMessage(BaseModel):
    __tablename__ = "ai_messages"

    conversation_id = Column(UUID(as_uuid=True), ForeignKey("ai_conversations.id", ondelete="CASCADE"), nullable=False, index=True)
    sender = Column(String(32), nullable=False) # user, assistant
    content = Column(Text, nullable=False)
    tokens_used = Column(Integer, default=0, nullable=False)
    references_json = Column(JSON, default=[], nullable=False)

    conversation = relationship("AIConversation", back_populates="messages")

class AIRecommendation(BaseModel):
    __tablename__ = "ai_recommendations"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=True, index=True)

    category = Column(String(64), nullable=False, index=True) # technical, content, backlinks, keywords
    priority = Column(String(32), default="high", nullable=False, index=True) # critical, high, medium, low
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    reasoning = Column(Text, nullable=True)
    impact_score = Column(Integer, default=85, nullable=False)
    is_applied = Column(Boolean, default=False, nullable=False)

class AITask(BaseModel):
    __tablename__ = "ai_tasks"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    recommendation_id = Column(UUID(as_uuid=True), ForeignKey("ai_recommendations.id", ondelete="SET NULL"), nullable=True)

    task_title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(32), default="todo", nullable=False) # todo, in_progress, completed
    assigned_to = Column(String(255), nullable=True)

class AIWorkflow(BaseModel):
    __tablename__ = "ai_workflows"

    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)

    name = Column(String(255), nullable=False)
    trigger_event = Column(String(64), nullable=False) # crawl_finished, rank_dropped, traffic_loss
    action_steps_json = Column(JSON, default=[], nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

class AIPromptTemplate(BaseModel):
    __tablename__ = "ai_prompt_templates"

    category = Column(String(64), nullable=False, index=True) # technical, content, schema, local_seo
    title = Column(String(255), nullable=False)
    prompt_text = Column(Text, nullable=False)
    tags_json = Column(JSON, default=[], nullable=False)

class AIKnowledgeArticle(BaseModel):
    __tablename__ = "ai_knowledge_articles"

    category = Column(String(64), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    content_markdown = Column(Text, nullable=False)
    tags_json = Column(JSON, default=[], nullable=False)

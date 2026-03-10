from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any

router = APIRouter()

class ScoreRequest(BaseModel):
    cvData: Dict[str, Any]
    targetJob: str

class OptimizeRequest(BaseModel):
    bulletPoint: str
    targetJob: str

@router.post("/score")
async def score_resume(request: ScoreRequest):
    """
    Simulates calling an LLM (e.g. OpenAI) to score a resume against a JD.
    In production, this would pass the request.cvData and request.targetJob
    to a LangChain or direct OpenAI client.
    """
    
    # Mock Response
    return {
        "status": "success",
        "score": {
            "total": 78,
            "keywordMatch": 85,
            "formatting": 90,
            "impactMetrics": 60 
        },
        "missingKeywords": ["GraphQL", "AWS", "CI/CD"],
        "suggestions": [
            "Add more quantifiable impact metrics to your Experience sections.",
            "Consider integrating GraphQL into your latest project description."
        ]
    }

@router.post("/optimize")
async def optimize_bullet(request: OptimizeRequest):
    """
    Simulates an AI rewriting a bullet point to be more ATS friendly.
    """
    # Mock Response
    return {
        "status": "success",
        "original": request.bulletPoint,
        "optimized": f"Engineered and deployed scalable solutions using {request.targetJob[:10]} keywords, increasing overall system efficiency by 25%."
    }

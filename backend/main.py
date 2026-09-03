import os

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from gemini_service import rewrite_resume

app = FastAPI()

allowed_origins = [
    origin.strip()
    for origin in os.getenv("FRONTEND_ORIGIN", "http://localhost:5173").split(",")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


class RewriteRequest(BaseModel):
    resume: str
    jd: str
    emphasis: str | None = None


class RewriteResponse(BaseModel):
    keywords: list[str]
    draft: str


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/api/rewrite", response_model=RewriteResponse)
def rewrite(body: RewriteRequest):
    if not body.resume.strip() or not body.jd.strip():
        raise HTTPException(status_code=400, detail="자소서(resume)와 채용공고(jd)는 필수입니다.")

    try:
        result = rewrite_resume(body.resume, body.jd, body.emphasis)
    except Exception as err:  # noqa: BLE001 - Gemini/네트워크 오류를 그대로 클라이언트에 전달
        raise HTTPException(status_code=502, detail=str(err)) from err

    return result

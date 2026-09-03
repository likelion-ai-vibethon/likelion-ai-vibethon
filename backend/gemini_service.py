import json
import os

from google import genai
from google.genai import types

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")


def rewrite_resume(resume: str, jd: str, emphasis: str | None = None) -> dict:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY가 설정되지 않았습니다. backend/.env를 확인하세요.")

    emphasis_block = ""
    if emphasis:
        emphasis_block = f"\n[강조하고 싶은 경험]\n{emphasis}\n이 경험을 중심으로 재구성하세요."

    prompt = f"""당신은 채용 자기소개서 첨삭 전문가입니다.
아래 채용공고(JD)를 분석해 핵심 키워드와 인재상을 추출하고,
자기소개서 원문을 해당 회사에 맞게 재구성하세요.

[채용공고]
{jd}

[자기소개서 원문]
{resume}
{emphasis_block}

다음 JSON 형식으로만 응답하세요:
{{
  "keywords": ["키워드1", "키워드2"],
  "draft": "재구성된 자기소개서 전체 텍스트"
}}"""

    client = genai.Client(api_key=api_key)

    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(response_mime_type="application/json"),
        )
    except Exception as err:  # noqa: BLE001 - surface any Gemini SDK/network error to the caller
        raise RuntimeError(f"Gemini API 오류: {err}") from err

    text = response.text
    if not text:
        raise RuntimeError("Gemini 응답에서 텍스트를 찾을 수 없습니다.")

    return json.loads(text)

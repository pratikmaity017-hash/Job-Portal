from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

# request format
class MatchRequest(BaseModel):
    resume: str
    job_description: str


@app.get("/")
def home():
    return {"message": "AI Service Running"}

@app.post("/match")
def match(req: MatchRequest):

    texts = [req.resume, req.job_description]

    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform(texts)

    score = cosine_similarity(vectors[0], vectors[1])[0][0]

    return {
        "match_score": round(score * 100, 2)
    }
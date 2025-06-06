from fastapi import APIRouter
from sqlalchemy import text
from dotenv import load_dotenv
import os
from app.utils.queries import queries
from sqlmodel import create_engine, Session

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

router = APIRouter()

# Sync engine using psycopg2
engine = create_engine(DATABASE_URL, echo=True)

@router.get("/metrics")
def all_metrics():
    result = {}
    with Session(engine) as session:
        for name, query in queries.items():
            res = session.exec(text(query))
            result[name] = res.scalar() if "AVG" in query or "COUNT" in query else [dict(row._mapping) for row in res.fetchall()]
    return result
from fastapi import FastAPI
from app.routes.analytics import router as analytics_router

app = FastAPI()

app.include_router(analytics_router, prefix="/analytics")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=4003, reload=True)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import ai_router, payment_router

app = FastAPI(
    title="CV Builder API",
    description="Backend services for AI resume generation and processing",
    version="1.0.0"
)

# Configure CORS for our local React app and future Vercel domain
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    # "https://your-vercel-domain.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router.router, prefix="/api/ai", tags=["AI Processing"])
app.include_router(payment_router.router, prefix="/api/payments", tags=["Payments"])

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "CV Builder API is running"}

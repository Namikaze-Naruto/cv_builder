from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class UnlockRequest(BaseModel):
    userId: str
    planType: str

@router.post("/unlock-pdf")
async def process_payment(request: UnlockRequest):
    """
    Mock payment processing endpoint. 
    In production you would generate a Razorpay Order ID here and return it to React.
    """
    
    return {
        "status": "success",
        "message": "Payment verified, PDF download unlocked.",
        "orderId": f"order_mock_{request.userId[:5]}",
        "amount": 79 if request.planType == "single" else 199
    }

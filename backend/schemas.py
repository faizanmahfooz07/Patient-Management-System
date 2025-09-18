from datetime import date
from typing import Optional
from pydantic import BaseModel, Field, EmailStr

class PatientBase(BaseModel):
    first_name: str = Field(..., min_length=1)
    last_name: str = Field(..., min_length=1)
    email: EmailStr
    phone: str = Field(..., pattern=r'^\+?[0-9]{7,15}$')
    dob: Optional[date] = None

class PatientCreate(PatientBase):
    pass

class Patient(PatientBase):
    id: int

    class Config:
        from_attributes = True

class PatientUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = Field(None, pattern=r'^\+?[0-9]{7,15}$')
    dob: Optional[date] = None

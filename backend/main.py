from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from gmail_service import get_gmail_service

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "MailMind AI Backend Running"}

@app.get("/emails")
def get_emails():
    service = get_gmail_service()

    results = service.users().messages().list(
        userId='me',
        maxResults=10
    ).execute()

    messages = results.get('messages', [])

    return messages
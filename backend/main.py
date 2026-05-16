from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from gmail_service import (
    get_gmail_service,
    get_email_details
)

from ai_service import (
    summarize_email,
    generate_reply
)

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
    return {"message": "NeuroMail AI Backend Running"}

@app.get("/emails")
def get_emails(label: str = Query("INBOX", description="The label to filter by")):

    service = get_gmail_service()

    results = service.users().messages().list(
        userId='me',
        labelIds=[label.upper()],
        maxResults=10
    ).execute()

    messages = results.get('messages', [])

    email_data = []

    for msg in messages:

        details = get_email_details(
            service,
            msg['id']
        )

        summary = summarize_email(
            details['body']
        )

        reply = generate_reply(
            details['body']
        )

        email_data.append({
            "subject": details['subject'],
            "sender": details['sender'],
            "date": details.get('date', 'Unknown Date'),
            "body": details['body'],
            "summary": summary,
            "reply": reply
        })

    return email_data
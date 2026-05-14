from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import os
import pickle
import base64

SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

def get_gmail_service():
    creds = None

    if os.path.exists("token.pickle"):
        with open("token.pickle", "rb") as token:
            creds = pickle.load(token)

    if not creds:
        flow = InstalledAppFlow.from_client_secrets_file(
            "credentials.json",
            SCOPES
        )
        creds = flow.run_local_server(port=0)

        with open("token.pickle", "wb") as token:
            pickle.dump(creds, token)

    service = build('gmail', 'v1', credentials=creds)

    return service

def get_email_details(service, message_id):

    message = service.users().messages().get(
        userId='me',
        id=message_id
    ).execute()

    payload = message.get('payload', {})
    headers = payload.get('headers', [])

    subject = ""
    sender = ""
    body = ""

    for header in headers:

        if header['name'] == 'Subject':
            subject = header['value']

        if header['name'] == 'From':
            sender = header['value']

    parts = payload.get('parts')

    if parts:

        for part in parts:

            mime_type = part.get('mimeType')

            if mime_type == 'text/plain':

                data = part['body'].get('data')

                if data:

                    decoded_data = base64.urlsafe_b64decode(
                        data
                    ).decode('utf-8')

                    body = decoded_data

                    break

    return {
        "subject": subject,
        "sender": sender,
        "body": body
    }
import os
import base64
import re

from html import unescape

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build


SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']


def get_gmail_service():

    creds = None

    if os.path.exists('token.json'):

        creds = Credentials.from_authorized_user_file(
            'token.json',
            SCOPES
        )

    if not creds or not creds.valid:

        if creds and creds.expired and creds.refresh_token:

            creds.refresh(Request())

        else:

            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json',
                SCOPES
            )

            creds = flow.run_local_server(port=0)

        with open('token.json', 'w') as token:

            token.write(creds.to_json())

    service = build('gmail', 'v1', credentials=creds)

    return service


def clean_html(html):

    html = re.sub(
        r'<(script|style).*?>.*?</\1>',
        '',
        html,
        flags=re.DOTALL
    )

    text = re.sub(r'<[^>]+>', ' ', html)

    text = unescape(text)

    text = re.sub(r'\\s+', ' ', text)

    return text.strip()


def extract_message_content(payload):

    body = ""

    mime_type = payload.get("mimeType", "")

    data = payload.get("body", {}).get("data")

    if data:

        decoded = base64.urlsafe_b64decode(
            data
        ).decode("utf-8", errors="ignore")

        if mime_type == "text/plain":

            return decoded

        elif mime_type == "text/html":

            return clean_html(decoded)

    parts = payload.get("parts", [])

    for part in parts:

        result = extract_message_content(part)

        if result:

            return result

    return body


def get_email_details(service, message_id):

    message = service.users().messages().get(
        userId='me',
        id=message_id,
        format='full'
    ).execute()

    payload = message.get('payload', {})

    headers = payload.get('headers', [])

    subject = "No Subject"
    sender = "Unknown Sender"
    date = "Unknown Date"

    for header in headers:

        if header['name'] == 'Subject':

            subject = header['value']

        elif header['name'] == 'From':

            sender = header['value']
            
        elif header['name'] == 'Date':
            
            date = header['value']

    body = extract_message_content(payload)

    if not body:

        body = "No readable content found."

    return {
        "subject": subject,
        "sender": sender,
        "date": date,
        "body": body
    }
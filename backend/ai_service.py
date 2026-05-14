from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

# def summarize_email(content):

#     prompt = f"""
#     Summarize this email in 2-3 lines:

#     {content}
#     """

#     response = client.chat.completions.create(
#         model="gpt-4.1-mini",
#         messages=[
#             {
#                 "role": "user",
#                 "content": prompt
#             }
#         ]
#     )

#     return response.choices[0].message.content


def summarize_email(content):

    return "This email contains important information and requires attention."
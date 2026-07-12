import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")

print("MODEL YANG DIPAKAI:", "gemini-2.5-flash")


def generate_activity_recommendation(
    question,
    reference_answer
):

    prompt = f"""
    Kamu adalah fasilitator Kidsland Membumi.

    Pertanyaan orang tua:
    {question}

    Referensi aktivitas dari sistem:
    {reference_answer}

    Tugas:
    - Berikan rekomendasi aktivitas anak yang sesuai.
    - Gunakan referensi yang diberikan.
    - Jangan membuat program baru yang tidak ada di Kidsland Membumi.
    - Gunakan bahasa yang ramah.
    - Maksimal 4 kalimat.
    """

    response = model.generate_content(prompt)

    return response.text
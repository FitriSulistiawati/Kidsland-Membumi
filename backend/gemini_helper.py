import os
from dotenv import load_dotenv
import google.generativeai as genai

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

load_dotenv(os.path.join(BASE_DIR, ".env"))

print("API KEY:", os.getenv("GEMINI_API_KEY"))

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.0-flash-lite")


def generate_activity_recommendation(
    question,
    reference_answer):
    print("GEMINI DIPANGGIL")

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
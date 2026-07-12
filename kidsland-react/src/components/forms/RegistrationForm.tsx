import "./RegistrationForm.css";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {

  const navigate = useNavigate();

  return (
    <div className="registration-form">
      <button
        type="button"
        className="registration-form__submit"
        onClick={() => navigate("/pendaftaran")}
      >
        Daftar Sekarang
      </button>
    </div>
  );
}
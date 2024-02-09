// ZakatCalculator.jsx
import React, { useState } from "react";
import "./CACU.css";

const ZakatCalculator = () => {
  const [income, setIncome] = useState("");
  const [nisab, setNisab] = useState(0); // Nilai nisab ditetapkan ke 0 (tidak ada nisab) sebagai nilai default
  const [totalZakat, setTotalZakat] = useState(null);
  const [verificationMessage, setVerificationMessage] = useState("");

  const calculateZakat = () => {
    // Perhitungan zakat (ilustratif, sesuaikan dengan ketentuan yang berlaku)
    const totalZakatAmount = calculateZakatAmount(income);

    // Pesan verifikasi
    if (totalZakatAmount >= 0) {
      setVerificationMessage(
        "Alhamdulillah, zakat Anda sudah sesuai dengan kriteria yang berlaku. Silakan membayarnya."
      );
    } else {
      setVerificationMessage(
        "Maaf, terdapat kesalahan dalam perhitungan zakat. Silakan periksa kembali."
      );
    }

    setTotalZakat(totalZakatAmount);
  };

  const calculateZakatAmount = (income) => {
    // Lakukan perhitungan zakat sesuai dengan ketentuan yang berlaku
    // (Contoh perhitungan ilustratif, sesuaikan dengan ketentuan zakat yang benar)

    // Cek apakah nisab diterapkan atau tidak
    if (nisab > 0 && parseFloat(income) < nisab) {
      return -1; // Kembalikan nilai negatif jika nisab tidak terpenuhi
    }

    // Hitung zakat 2.5% dari pendapatan
    return parseFloat(income) * 0.025;
  };

  return (
    <div className="container">
      <label className="label" htmlFor="income">
        Pendapatan (Income):
      </label>
      <input
        className="input-field"
        type="number"
        id="income"
        value={income}
        onChange={(e) => setIncome(parseFloat(e.target.value))}
      />

      <label className="label" htmlFor="nisab">
        Nisab (Opsional, biarkan 0 jika tidak ada):
      </label>
      <input
        className="input-field"
        type="number"
        id="nisab"
        value={nisab}
        onChange={(e) => setNisab(parseFloat(e.target.value))}
      />

      <button className="button" onClick={calculateZakat}>
        Hitung Zakat (Calculate Zakat)
      </button>

      {verificationMessage && (
        <div className="verification-message">{verificationMessage}</div>
      )}

      {totalZakat !== null && (
        <div className="result">Total Zakat: {totalZakat} IDR</div>
      )}
    </div>
  );
};

export default ZakatCalculator;

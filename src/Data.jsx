// Data.jsx
import React, { useState, useEffect } from "react";
import "./Data.css";

const Data = () => {
  const [zakatData, setZakatData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://backendzakat.vercel.app/api/items"
        );
        const data = await response.json();
        setZakatData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  const formatDate = (timestamp) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return new Date(timestamp).toLocaleDateString("id-ID", options);
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const filteredData = zakatData.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleData = showAll ? filteredData : filteredData.slice(0, 5);

  return (
    <div className="data">
      <div className="header">
        <h1>Data Zakat</h1>
      </div>

      <div className="total">
        <p>
          <b>Total Data: {filteredData.length}</b>
        </p>
        <p>
          <b>
            Total Beras:{" "}
            {filteredData.length > 0
              ? `${filteredData
                  .reduce(
                    (total, item) => total + (parseFloat(item.beras) || 0),
                    0
                  )
                  .toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })} Liter`
              : "konsong"}
          </b>
        </p>
        <p>
          <b>
            Total Uang:{" "}
            {filteredData.length > 0
              ? formatRupiah(
                  filteredData.reduce(
                    (total, item) => total + (parseInt(item.uang, 10) || 0),
                    0
                  )
                )
              : "konsong"}
          </b>
        </p>
      </div>

      <div className="search">
        <input
          type="text"
          name=""
          id=""
          placeholder="Cari Nama"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Nomor</th>
            <th>Nama</th>
            <th>Gender</th>
            <th>Barang</th>
            <th>Beras</th>
            <th>Uang</th>
            <th>Waktu</th>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.nama}</td>
              <td>{item.gender}</td>
              <td>{item.barang}</td>
              <td>{item.beras ? `${item.beras} Liter` : "-"}</td>
              <td>
                {isNaN(item.uang)
                  ? "-"
                  : item.uang
                  ? formatRupiah(item.uang)
                  : "-"}
              </td>
              <td>{formatDate(item.waktu)}</td>
            </tr>
          ))}
          <tr className="total-row">
            <td colSpan="3">Total Zakat</td>
            <td>{filteredData.length} Item</td>
            <td>
              {filteredData.length > 0
                ? `${filteredData
                    .reduce(
                      (total, item) => total + (parseFloat(item.beras) || 0),
                      0
                    )
                    .toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })} Liter`
                : "konsong"}
            </td>
            <td>
              {filteredData.length > 0
                ? formatRupiah(
                    filteredData.reduce(
                      (total, item) => total + (parseInt(item.uang, 10) || 0),
                      0
                    )
                  )
                : "konsong"}
            </td>
          </tr>
          {filteredData.length > 5 && (
            <tr>
              <td className="show-all-button" colSpan="7">
                <button onClick={() => setShowAll(!showAll)}>
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Data;

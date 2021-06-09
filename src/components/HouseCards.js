import axios from "axios";
import "../styles/houseCards.css";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import "../styles/error.css";

export default function HouseCards() {
  const [houses, setHouses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = false;
    async function getHouses() {
      try {
        const res = await axios.get(
          "https://gist.githubusercontent.com/huvber/b51c0279d3f452513a7c1f576a54f4d7/raw/4497a12b181713c6856303a666d240f7d561e4fe/mock-house"
        );
        if (!isMounted) {
          setLoading(false);
          setHouses(res.data);
        }
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    }
    getHouses();
    return function () {
      isMounted = true;
    };
  });

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {loading && <Loading />}

      {houses.length !== 0 ? (
        <div className="house-cards">
          {houses.map((house) => (
            <div
              key={house.id}
              className={
                house.bookable && house.booked === 0
                  ? "house-card available-card"
                  : "house-card"
              }
            >
              <div className="top-part">
                {house.bookable && house.booked === 0 && (
                  <div className="house-status status-available">available</div>
                )}
                {house.bookable && house.booked !== 0 && (
                  <div className="house-status status-booked">booked</div>
                )}
                {!house.bookable && house.booked === 0 && (
                  <div className="house-status status-unavailable">
                    unavailable
                  </div>
                )}
                {!house.bookable && house.booked !== 0 && (
                  <div className="house-status status-booked">booked</div>
                )}

                <div className="house-img-container">
                  <img className="house-img" src={house.image} alt="house" />
                </div>
              </div>
              <div className="bottom-part">
                <div className="bottom-part-text">
                  <p className="house-id">Id:{house.id}</p>
                  <b>
                    {" "}
                    <p className="house-name">{house.name}</p>
                  </b>
                </div>
                {house.bookable && house.booked !== 0 && (
                  <div className="alreadyBooked">
                    <i className="material-icons">check_circle</i> booked for{" "}
                    {house.booked} days
                  </div>
                )}
                {house.bookable && house.booked === 0 && (
                  <button className="book-btn btn-available">Book</button>
                )}
                {!house.bookable && house.booked === 0 && (
                  <button className="book-btn btn-unavailable" disabled>
                    Not Bookable
                  </button>
                )}
                {!house.bookable && house.booked !== 0 && (
                  <div className="alreadyBooked">
                    <i className="material-icons">check_circle</i> booked for{" "}
                    {house.booked} days
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

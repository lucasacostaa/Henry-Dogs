import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/detail/Detail.scss";

const Detail = () => {
  const [data, setData] = useState();

  useEffect(() => {
    let id = window.location.href.split("/").pop();
    if (id) {
      (async () => {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`);

        setData(response.data);
      })();
    }
  }, []);

  useEffect(() => {
    const scrollHistory = [window.pageXOffset, window.pageYOffset];
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
      window.scrollTo(...scrollHistory);
    };
  }, []);

  return (
    <div className="detail-container">
      <div className="detailCard">
        <div className="imageSide">
          {data && data.image && (
            <img
              src={data.image}
              style={{ maxWidth: "400px", width: "80%" }}
              alt=""
            />
          )}
        </div>
        <div className="dataSide">
          <Link to="/main" className="close-btn">
            X
          </Link>
          {data && (
            <>
              <h2>{data.name}</h2>

              <span className="data"><b>Height:</b> {data.height}</span>

              <span className="data"><b>Weight:</b> {data.weight}</span>

              <span className="data">
                <b>Life span:</b>{" "}
                {data["life_span"] ? data["life_span"] : "Not specified"}
              </span>

              <section>
                <span><b>Temperaments:</b></span>
                <section className="temperament-section">
                  {data.temperaments &&
                    data.temperaments.map((el) => <span className="temperament-tag">{el.name}</span>)}
                </section>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;

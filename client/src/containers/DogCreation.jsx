import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/dogCreation/DogCreation.scss";

export const DogCreation = () => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(["", ""]);
  const [height, setHeight] = useState(["", ""]);
  const [lifeSpan, setLifeSpan] = useState(["", ""]);
  const [temperaments, setTemperaments] = useState();
  const [selected, setSelected] = useState([]);
  const [tempSearch, setTempSearch] = useState("");
  const [link, setLink] = useState("");
  const [result, setResult] = useState("");

  const resetForm = () => {
    setName("");
    setWeight(["", ""]);
    setHeight(["", ""]);
    setLifeSpan(["", ""]);
    setSelected([]);
  };

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if([
        name,
        weight[0],
        weight[1],
        height[0],
        height[1],
        lifeSpan[0],
        lifeSpan[1],
        ...selected,
        link
      ].every((el) => el === "")) {throw {data: "One or more fields are empty"}}
      setResult("");
      await axios.post("http://localhost:3001/dog", {
        name,
        weight: `${weight.join(" - ")} kg`,
        height: `${height.join(" - ")} cm`,
        life_span: `${lifeSpan.join(" - ")} years`,
        temperament: `${selected.map((el) => capitalize(el)).join(", ")}`,
        image: `${link}`,
      });

      setResult("Successful");
      resetForm();
    } catch (err) {
      setResult(err);
      alert(err);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3001/temperament");
      setTemperaments(response.data);
    })();
  }, []);

  const handleAddTemp = () => {
    setSelected([...selected, tempSearch]);
    setTempSearch("");
  };

  const tagDelete = (deleteTag) => {
    setSelected([...selected.filter((tag) => tag !== deleteTag)]);
  };

  useEffect(() => {
    const scrollHistory = [window.pageXOffset, window.pageYOffset];
    window.scrollTo(0, 20);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
      window.scrollTo(...scrollHistory);
    };
  }, []);


  return (
    <div className="creation-container">
      <div className="image-insertion">
        {result === "success" && (
          <div>
            Your dog was created succesfully{" "}
            <button onClick={() => setResult("Redirect")}>X</button>
          </div>
        )}
        {link && (
          <img
            src={link}
            style={{
              maxWidth: "400px",
              maxHeight: "600px",
              width: "auto",
              height: "auto",
            }}
            alt=""
          />
        )}
        Image Link
        <input
          type="text"
          placeholder="Image link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        ></input>
      </div>
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <Link to="/main" className="close-btn">
          X
        </Link>
        <div className="form-field">
          <fieldset>
            <label>Breed Name</label>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </fieldset>
        </div>

        <div className="form-field">
          <fieldset>
            <label>Height (cm)</label>
            <span className="divided-input-wrap">
              <input
                className="divided-input"
                type="number"
                placeholder="Min"
                min="0"
                max="500"
                onChange={(e) => setHeight([e.target.value, height[1]])}
                value={height[0]}
                required
              />
              <input
                className="divided-input"
                type="number"
                placeholder="Max"
                min="0"
                max="500"
                onChange={(e) => setHeight([height[0], e.target.value])}
                value={height[1]}
                required
              />
            </span>
          </fieldset>
        </div>

        <div className="form-field">
          <fieldset>
            <label>Weight (kg)</label>
            <span className="divided-input-wrap">
              <input
                className="divided-input"
                type="number"
                placeholder="Min"
                min="0"
                max="500"
                onChange={(e) => setWeight([e.target.value, weight[1]])}
                value={weight[0]}
                required
              />
              <input
                className="divided-input"
                type="number"
                placeholder="Max"
                min="0"
                max="500"
                onChange={(e) => setWeight([weight[0], e.target.value])}
                value={weight[1]}
                required
              />
            </span>
          </fieldset>
        </div>

        <div className="form-field">
          <fieldset>
            <label>Life Span (years)</label>
            <span className="divided-input-wrap">
              <input
                className="divided-input"
                type="number"
                placeholder="Min"
                min="1"
                max="500"
                onChange={(e) => setLifeSpan([e.target.value, lifeSpan[1]])}
                value={lifeSpan[0]}
                required
              />
              <input
                className="divided-input"
                type="number"
                placeholder="Max"
                min="1"
                max="500"
                onChange={(e) => setLifeSpan([lifeSpan[0], e.target.value])}
                value={lifeSpan[1]}
                required
              />
            </span>
          </fieldset>
        </div>

        <div className="form-field">
          <fieldset id="tagSelection">
            <label htmlFor="temperament">Temperaments:</label>
            <input
              id="tempSearch"
              list="tags"
              type="text"
              placeholder="Search temperaments"
              onChange={(e) => setTempSearch(e.target.value)}
              value={tempSearch}
              style={{ textTransform: "capitalize" }}
            />
            <datalist name="tags" id="tags">
              {temperaments &&
                temperaments.map((temp) => {
                  return <option value={temp} />;
                })}
            </datalist>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {selected &&
                selected.map((el) => (
                  <span className="tempTag">
                    {el}
                    <button
                      className="tempDelete"
                      type="button"
                      onClick={() => tagDelete(el)}
                    >
                      X
                    </button>
                  </span>
                ))}
            </div>
            <button
              type="button"
              style={{ width: "50%", marginTop: "10px" }}
              onClick={() => handleAddTemp()}
            >
              Add temperament
            </button>
          </fieldset>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

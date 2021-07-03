import React from "react";
import { useEffect, useState } from "react";
import { category_get } from "../../utilities/movieService";
import Movie from "./Movie";
import "./Category.css";
import { useHistory } from "react-router-dom";
import Banner from "./Banner";

const Category = () => {
  const history = useHistory();

  const [category, setCategory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function cat() {
      await category_get(history)
        .then((res) => {
          setLoading(true);
          setError("");
          setCategory(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response?.data.msg);
        });
    }
    cat();
  }, [history]);

  return loading ? (
    <h3>loading</h3>
  ) : error ? (
    <h3>{error}</h3>
  ) : (
    <>
      <Banner type={category[0]} />
      {!loading &&
        category.map((c, index) => (
          <div key={c._id} className="row">
            <h2>{c.cat_type}</h2>
            {index === 0 ? (
              <Movie type={c._id} isLargeRow />
            ) : (
              <Movie type={c._id} />
            )}
          </div>
        ))}
    </>
  );
};

export default Category;

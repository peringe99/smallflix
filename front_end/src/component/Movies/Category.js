import React from "react";
import { useEffect, useState } from "react";
import { category_get } from "../../utilities/movieService";
import Movie from "./Movie";
import "./Category.css";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Banner from "./Banner";
import Search from "../Search/Search";

const Category = () => {
  const history = useHistory();

  const [category, setCategory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    async function cat() {
      await category_get(history)
        .then((res) => {
          setShowSearch(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowSearch(true);
  };
  if (search === "" && showSearch) {
    setShowSearch(false);
  }
  return loading ? (
    <h3>loading</h3>
  ) : error ? (
    <h3>{error}</h3>
  ) : (
    <>
      <Banner type={category[4]} />
      <form className="search_input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter movie"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit" variant="outline-light">
          Search
        </Button>
      </form>
      {showSearch && <Search searchTitle={search} />}

      {!showSearch &&
        category &&
        category.map((c, index) => (
          <div key={c._id} className="row">
            <h2>{c.cat_type.replace(/_/g, ' ')}</h2>
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

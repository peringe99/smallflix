import React from "react";
import { useEffect, useState } from "react";
import { category_get, movieSearch } from "../../utilities/movieService";
import Movie from "./Movie";
import "./Category.css";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Banner from "./Banner";

const Category = () => {
  const history = useHistory();

  const [category, setCategory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await movieSearch(search);
    console.log(result.data);
  };

  return loading ? (
    <h3>loading</h3>
  ) : error ? (
    <h3>{error}</h3>
  ) : (
    <>
      <Banner type={category[4]} />
      {/* <div className="search_input">
        <input type="test" placeholder="Search" onSubmit/>
      </div> */}
      <div className="search_input">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Search Movie</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter movie"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
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

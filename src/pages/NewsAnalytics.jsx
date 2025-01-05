import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const NewsAnalytics = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [filters, setFilters] = useState({
    author: "",
    dateFrom: "",
    dateTo: "",
    search: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=apple&from=2025-01-03&to=2025-01-03&sortBy=popularity&apiKey=4481422b2ebb4f5a9373dcba3219cd68`
        );

        const validArticles = response.data.articles.filter(
          (article) => article.author && article.source?.name
        );

        setArticles(validArticles);
        setFilteredArticles(validArticles);

        const uniqueAuthors = [
          ...new Set(
            validArticles.map((article) => article.author).filter(Boolean)
          ),
        ];
        setAuthors(uniqueAuthors);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch news");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let filtered = articles;

    if (filters.author) {
      filtered = filtered.filter((article) => article.author === filters.author);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(
        (article) => new Date(article.publishedAt) >= new Date(filters.dateFrom)
      );
    }

    if (filters.search) {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        (article.description &&
          article.description.toLowerCase().includes(filters.search.toLowerCase())) ||
        (article.source?.name &&
          article.source.name.toLowerCase().includes(filters.search.toLowerCase())) ||
        (article.author &&
          article.author.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    setFilteredArticles(filtered);
  }, [filters, articles]);

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="pt-20 min-h-screen ">
      <h1 className="text-3xl font-bold text-center mb-6"> News </h1>
      {loading ? (
        <div className="flex justify-center items-center h-72">
          <ReactLoading type={"bubbles"} color={"black"} height={80} width={80} />
        </div>
      ) : (
        <>
          <div className="bg-white w-full sticky top-20 z-20 px-4 p-2 sm:px-8">
            <TextField
              type="text"
              name="search"
              label="Search News"
              variant="outlined"
              placeholder="Global Search"
              className="rounded-xl w-full outline-none border-cyan-700"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>

          <div className="p-2 z-10 shadow-md px-4 sm:px-8">
            <div className="mb-4 flex justify-between md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 items-center">
              <FormControl fullWidth variant="outlined">
                <InputLabel>Authors</InputLabel>
                <Select
                  name="author"
                  label="Authors"
                  className="rounded"
                  value={filters.author}
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">Search by Author</MenuItem>
                  {authors.map((author, index) => (
                    <MenuItem key={index} value={author}>
                      {author}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full flex items-center justify-center">
                  <label className="text-xl p-1 flex items-center" htmlFor="Date">
                    <span className="pr-4">From</span>
                    <input
                      type="date"
                      name="dateFrom"
                      className="p-2 border rounded"
                      value={filters.dateFrom}
                      onChange={handleFilterChange}
                    />
                  </label>
                </div>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {filteredArticles.map((article, index) => (
              <div
                key={index}
                className="relative p-4 border rounded-lg shadow-sm hover:shadow-2xl bg-cover bg-center bg-black/20"
                style={{
                  backgroundImage: `url(${article.urlToImage || "https://via.placeholder.com/400"})`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                <div className="relative z-10 text-white">
                  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                  <p className="text-gray-200 mb-2">
                    <strong>Author:</strong> {article.author || "Unknown"}
                  </p>
                  <p className="text-gray-300 mb-2">
                    <strong>Date:</strong>{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                  <p className="text-green-300">
                    <strong>Source:</strong> {article.source.name}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 underline mt-2 block"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center mt-10">
              No articles found for the selected filters.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsAnalytics;

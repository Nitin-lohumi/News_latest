import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
} from "@mui/material";

const PayoutDetails = () => {
  const [payoutData, setPayoutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=apple&from=2025-01-03&to=2025-01-03&sortBy=popularity&apiKey=4481422b2ebb4f5a9373dcba3219cd68"
        );
        const articles = response.data.articles;
        const authorMap = {};
        articles.forEach((article) => {
          if (article.author) {
            if (!authorMap[article.author]) {
              authorMap[article.author] = { articles: 0, payoutRate: 200 };
            }
            authorMap[article.author].articles += 1;
          }
        });

        const formattedData = Object.entries(authorMap).map(([author, data]) => ({
          author,
          ...data,
        }));
        setPayoutData(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch data from NewsAPI.");
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handlePayoutRateChange = (index, value) => {
    const updatedData = [...payoutData];
    updatedData[index].payoutRate = parseFloat(value) || 0;
    setPayoutData(updatedData);
  };

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <ReactLoading type={"spin"} color={"black"} height={50} width={50} />
        </div>
      ) : (
        <Box
          className="flex flex-col mt-16 payout h-fit overflow-y-hidden payoutContainer"
        >
          <div className="overflow-y-auto">
            <TableContainer
              component={Paper}
              className="h-full max-h-[calc(100vh-100px)] overflow-auto">
              <Table className="min-w-full payouttable">
                <TableHead className="sticky top-0 z-10 bg-white border-b">
                  <TableRow className="bg-gray-100">
                    <TableCell className="border-b author"><strong>Author</strong></TableCell>
                    <TableCell align="center" className="border-b artical"><strong>Articles</strong></TableCell>
                    <TableCell align="center" className="border-b payoutRate"><strong>Payout Rate (₹/Article)</strong></TableCell>
                    <TableCell align="center" className="border-b payoutRate"><strong>Total Payout (₹)</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payoutData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="authorcol" >{row.author}</TableCell>
                      <TableCell className="articalCol" align="center">{row.articles}</TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          className="payoutCol"
                          value={row.payoutRate}
                          onChange={(e) => handlePayoutRateChange(index, e.target.value)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        ₹{(row.articles * row.payoutRate).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {payoutData.length === 0 && (
              <Typography variant="body1" className="text-center mt-4">
                No payout details available.
              </Typography>
            )}
          </div>
        </Box>
      )}
    </>
  );
};

export default PayoutDetails;

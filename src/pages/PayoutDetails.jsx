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
        const response = await axios.get("https://saurav.tech/NewsAPI/everything/cnn.json");
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
        setError(err.message || "Failed to fetch data from the NewsAPI.");
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
        <div className="flex justify-center items-center h-screen">
          <ReactLoading
            className="dark:bg-white rounded-full"
            type={"spin"}
            color={"black"}
            height={80}
            width={80}
          />
        </div>
      ) : (
        <Box className="flex flex-col mt-16 payout h-screen overflow-y-hidden payoutContainer dark:bg-black">
          <div className="overflow-y-auto">
            <TableContainer
              component={Paper}
              className="h-full max-h-[calc(100vh-100px)] overflow-auto dark:bg-black dark:text-white"
            >
              <Table className="min-w-full payouttable dark:bg-black dark:text-white">
                <TableHead className="sticky top-0 z-10 bg-white border-b">
                  <TableRow className="bg-gray-100 dark:bg-black dark:text-white">
                    <TableCell className="border-b author dark:text-white">
                      <strong>Author</strong>
                    </TableCell>
                    <TableCell align="center" className="border-b artical dark:text-white">
                      <strong>Articles</strong>
                    </TableCell>
                    <TableCell align="center" className="border-b payoutRate dark:text-white">
                      <strong>Payout Rate (₹/Article)</strong>
                    </TableCell>
                    <TableCell align="center" className="border-b payoutRate dark:text-white">
                      <strong>Total Payout (₹)</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payoutData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="authorcol dark:text-white">{row.author}</TableCell>
                      <TableCell className="articalCol dark:text-white" align="center">
                        {row.articles}
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          className="payoutCol dark:bg-gray-400 dark:rounded-lg"
                          value={row.payoutRate}
                          onChange={(e) => handlePayoutRateChange(index, e.target.value)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center" className="dark:text-white">
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

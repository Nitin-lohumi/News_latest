import React from "react";
import { useOutletContext } from "react-router-dom";
import { CSVLink } from "react-csv";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@mui/material";
import ReactLoading from "react-loading";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const ExportOptions = () => {
  const { articles } = useOutletContext(); 

  const handleExportCSV = () => {
    const headers = ["Title", "Author", "Source", "PublishedAt", "URL"];
    const data = articles.map((article) => [
      article.title,
      article.author,
      article.source.name,
      article.publishedAt,
      article.url,
    ]);
    return { headers, data };
  };

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Articles Report</Text>
        </View>
        {articles.map((article, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.text}>{`${index + 1}. ${article.title}`}</Text>
            <Text style={styles.text}>Author: {article.author || "Unknown"}</Text>
            <Text style={styles.text}>Source: {article.source.name}</Text>
            <Text style={styles.text}>Published At: {new Date(article.publishedAt).toLocaleDateString()}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  const downloadCSV = (e) => {
    e.preventDefault(); // Prevent navigation
    const link = document.createElement("a");
    const csvData = new Blob(
      [handleExportCSV().headers.join(",") + "\n" + handleExportCSV().data.map(row => row.join(",")).join("\n")],
      { type: "text/csv" }
    );
    link.href = URL.createObjectURL(csvData);
    link.download = "articles.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 dark:bg-black">
      <div className="w-full sm:w-96 md:w-1/2 lg:w-1/3 p-6 shadow-lg rounded-lg bg-green-200 dark:bg-gray-800">
        <h2 className="font-extrabold text-2xl mb-6 text-center dark:text-gray-300">Download Articles</h2>

        <div className="mb-6">
          <Button variant="outlined" color="primary" fullWidth onClick={downloadCSV}>
            Download as CSV
          </Button>
        </div>

        <div className="mb-6">
          <PDFDownloadLink document={<MyDocument />} fileName="articles_report.pdf">
            {({ loading }) =>
              loading ? (
                <Button fullWidth disabled variant="outlined">
                  <ReactLoading className="rounded-full" type={"spokes"} color={"black"} height={40} width={40} />
                </Button>
              ) : (
                <Button variant="outlined" color="primary" fullWidth>
                  Download as PDF
                </Button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;

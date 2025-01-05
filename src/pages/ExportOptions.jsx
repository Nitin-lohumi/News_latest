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

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Articles Report", 20, 20);
    articles.forEach((article, index) => {
      doc.text(`${index + 1}. ${article.title}`, 20, 30 + index * 10);
    });
    doc.save("articles_report.pdf");
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


  return (
    <div className="flex justify-center items-center min-h-screen p-4 dark:bg-black">
      <div className="w-full sm:w-96 md:w-1/2 lg:w-1/3 p-6 shadow-lg rounded-lg bg-green-200 dark:bg-gray-800">
        <h2 className="font-extrabold text-2xl mb-6 text-center dark:text-gray-300">Download Articles</h2>
        <div className="mb-6">
        <CSVLink data={handleExportCSV().data} headers={handleExportCSV().headers} filename={"articles.csv"}>
          <Button variant="outlined" color="primary" fullWidth>
            Download as CSV
          </Button>
        </CSVLink>
        </div>

       <div className="mb-6">
       <PDFDownloadLink document={<MyDocument />}  className="" fileName="articles_report.pdf">
          {({ loading }) =>
            loading ? (
              <Button fullWidth disabled variant="outlined">
               <ReactLoading  className="rounded-full" type={"spokes"} color={"black"} height={40} width={40} />
              </Button>
            ) : (
              <Button variant="outlined" color="primary" fullWidth >
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

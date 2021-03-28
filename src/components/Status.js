import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import "./Status.css";

const url="https://ttt-assingment.herokuapp.com/";



function Status() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [reload, setReload] = useState(false);
  

  const handleClick = async () => {
    if (text === "") {
      setError("Empty Field!");
      setIsReady(false);
      return -1;
    }

    if (isReady) {
      results.length = 0;
      setReload(!reload);
    }

    let rollno = { rollno: text };
    await axios.post(url, rollno);

    await axios.get(`${url}result`).then((res) => {
      console.log(res.data);
      setResults(res.data);
    });
    setIsReady(true);
    setText("");
    // alert("Submitted");
    return 0;
  };
  console.log(results);
  return (
    <div className="container">
      <div style={{ margin: "0 auto", padding: "1rem 0" }}>
        <div className="heading">Result Predictor</div>
        <div className="underline" />
      </div>
      <div className="sub-container1">
        <TextField
          id="outlined-basic"
          label="Enter RollNo Separated with Comma"
          variant="outlined"
          className="input-field"
          value={text}
          onChange={(e) => setText(e.target.value)}
          helperText={
            text === "" ? (
              <span style={{ color: "tomato" }}>{error}</span>
            ) : null
          }
        />
        <Button
          variant="contained"
          style={{
            backgroundColor: "lightskyblue",
            cursor: "pointer",
            margin: "1rem 0",
          }}
          onClick={handleClick}
        >
          Submit
        </Button>
      </div>
      <div className="sub-container2">
        <div className="table">
          {isReady ? (
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="table-cell"
                      style={{ color: "white" }}
                      align="center"
                    >
                      Roll No
                    </TableCell>
                    <TableCell
                      className="table-cell"
                      style={{ color: "white" }}
                      align="center"
                    >
                      Result
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((result, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row" align="center">
                        {result.rollno}
                      </TableCell>
                      <TableCell align="center">{result.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Status;

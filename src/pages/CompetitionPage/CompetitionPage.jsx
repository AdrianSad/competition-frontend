import React, { Component } from "react";
import HttpService from "../../services/HttpService";
import Spinner from "../../components/Loader/Spinner";
import Grid from "@material-ui/core/Grid";
import { last, random } from "lodash-es";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "./CompetitionPage.module.css";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Line } from "react-chartjs-2";
import TextField from "@material-ui/core/TextField";
import { Button } from "../../components";

class CompetitionPage extends Component {
  state = {
    competition: {},
    loading: true,
    graphData: {},
    predictedData: {},
    result: 0,
  };

  componentDidMount() {
    const id = last(this.props.location.pathname.split("/"));
    HttpService.getCompetitionDetails(id)
      .then((response) => {
        this.setGraphData(response);
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  }

  setGraphData = (response) => {
    const data = response.data;
    console.log(data);
    const labels = data.labels.reverse();
    const dataset = data.usernames.map((item) => {
      const random0 = random(0, 255);
      const random1 = random(0, 255);
      const random2 = random(0, 255);
      return {
        label: item.username,
        data: Array.from(
          Object.values(item.statistics).map((item) => item.sum)
        ),
        fill: false,
        backgroundColor: `rgb(${random0}, ${random1}, ${random2})`,
        borderColor: `rgba(${random0}, ${random1}, ${random2}, 0.2)`,
      };
    });
    const user = data.usernames.filter(
      (item) => item.id === JSON.parse(localStorage.getItem("user")).id
    );
    const random0 = random(0, 255);
    const random1 = random(0, 255);
    const random2 = random(0, 255);
    const predictedSet = [
      {
        label: user[0].username,
        data: Array.from(
          Object.values(user[0].predictionData).map((item) => item.sum)
        ),
        fill: false,
        backgroundColor: `rgb(${random0}, ${random1}, ${random2})`,
        borderColor: `rgba(${random0}, ${random1}, ${random2}, 0.2)`,
      },
    ];
    this.setState({
      loading: false,
      competition: response.data,
      graphData: {
        labels: labels,
        datasets: dataset,
      },
      predictedData: {
        labels: Array.from(Object.keys(user[0].predictionData)),
        datasets: predictedSet,
      },
    });
  };

  useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });

  onChange = (event) => {
    this.setState({ result: event.target.value });
  };

  sendResult = () => {
    const { result, competition } = this.state;
    this.setState({ loading: true });
    HttpService.addCompetitionResult(competition.id, result)
      .then((response) => {
        this.setGraphData(response);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const Row = ({ user }) => {
      const [open, setOpen] = React.useState(false);
      const classes = this.useRowStyles();
      return (
        <React.Fragment>
          <TableRow className={classes.root}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              {user.username}
            </TableCell>
            <TableCell align="right">{user.participatedDays}</TableCell>
            <TableCell align="right">{user.totalSum}</TableCell>
            <TableCell align="right">{user.averageScore}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Typography variant="h6" gutterBottom component="div">
                    History
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Total Sum</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(user.statistics).map((date) => (
                        <TableRow key={date}>
                          <TableCell component="th" scope="row">
                            {date[0]}
                          </TableCell>
                          <TableCell>{date[1].amount}</TableCell>
                          <TableCell>{date[1].sum}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    const {
      competition,
      loading,
      graphData,
      result,
      predictedData,
    } = this.state;
    return (
      <main>
        <Spinner visible={loading} />
        <Grid container direction="column" justify="center" alignItems="center">
          {!loading && (
            <>
              <div>
                <Line
                  data={graphData}
                  options={options}
                  height={300}
                  width={1000}
                />
                <Typography variant="h3" noWrap className={styles.header}>
                  Predicted data :
                </Typography>
                <Typography
                  variant="h5"
                  color={"textSecondary"}
                  noWrap
                  className={styles.header}
                >
                  Minimal sum of repetitions every day to win competition :)
                </Typography>
                <Line
                  data={predictedData}
                  options={options}
                  height={300}
                  width={1000}
                />
              </div>

              <TableContainer
                component={Paper}
                className={styles.tableContainer}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Username</TableCell>
                      <TableCell align="right">Participated days</TableCell>
                      <TableCell align="right">
                        Total sum of repetitions
                      </TableCell>
                      <TableCell align="right">Average reps</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {competition.usernames.map((user) => (
                      <Row key={user.id} user={user} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography variant="h5" noWrap className={styles.header}>
              Insert your result on {new Date().toISOString().split("T")[0]}
            </Typography>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={styles.bottomContainer}
            >
              <TextField
                id="result"
                label="Your result"
                variant="outlined"
                type={"number"}
                value={result}
                onChange={this.onChange}
                className={styles.textField}
              />
              <Button
                type={"button"}
                text={"Submit"}
                onClick={this.sendResult}
                className={styles.button}
              />
            </Grid>
          </Grid>
        </Grid>
      </main>
    );
  }
}

export default CompetitionPage;

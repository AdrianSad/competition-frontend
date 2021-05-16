import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import CompetitionItem from "../../components/Competition/CompetitionItem";
import HttpService from "../../services/HttpService";
import styles from "./CompetitionListPage.module.css";

import Spinner from "../../components/Loader/Spinner";

class CompetitionListPage extends Component {
  state = {
    loading: true,
    competitions: [],
    userId: "",
  };

  componentDidMount() {
    if (localStorage.getItem("user")) {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      this.setState({ userId });
    }
    this.getCompetitions();
  }

  getCompetitions = () => {
    HttpService.getCompetitions()
      .then((response) => {
        this.setState({
          loading: false,
          competitions: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  onDelete = (id) => {
    this.setState({ loading: true });
    HttpService.deleteCompetition(id)
      .then(this.getCompetitions)
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  onLeave = (id) => {
    console.log(id);
    this.setState({ loading: true });
    HttpService.leaveCompetition(id)
      .then(this.getCompetitions)
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  render() {
    const { competitions, loading, userId } = this.state;
    return (
      <main>
        <Spinner visible={loading} />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={4}
          className={styles.container}
        >
          {competitions.map((competition) => (
            <Grid item xs={3} key={competition.id}>
              <CompetitionItem
                competition={competition}
                onDelete={userId === competition.addedById && this.onDelete}
                onLeave={userId !== competition.addedById && this.onLeave}
              />
            </Grid>
          ))}
        </Grid>
      </main>
    );
  }
}

export default CompetitionListPage;

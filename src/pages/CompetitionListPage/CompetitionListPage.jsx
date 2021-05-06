import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import CompetitionItem from "../../components/Competition/CompetitionItem";
import HttpService from "../../services/HttpService";
import styles from "./CompetitionListPage.module.css";
import Loader from "react-loader-spinner";

class CompetitionListPage extends Component {
  state = {
    loading: true,
    competitions: [],
  };

  componentDidMount() {
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
  }

  render() {
    const { competitions, loading } = this.state;
    return (
      <main>
        {loading && (
          <div className={styles.spinner}>
            <Loader type="Circles" color="#00BFFF" height={50} width={50} />
          </div>
        )}
        {!loading && (
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
                <CompetitionItem competition={competition} />
              </Grid>
            ))}
          </Grid>
        )}
      </main>
    );
  }
}

export default CompetitionListPage;

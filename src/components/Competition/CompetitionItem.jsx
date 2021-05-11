import React from "react";
import styles from "./CompetitionItem.module.css";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import CardActionArea from "@material-ui/core/CardActionArea";

const CompetitionItem = ({ competition }) => {
  return (
    <Card className={styles.card}>
      <CardActionArea component={Link} to={`/competition/${competition.id}`}>
        <CardMedia
          className={styles.image}
          image={competition.image}
          title={competition.title}
        />
        <CardContent>
          <Typography variant="h4" color="textSecondary" noWrap>
            {competition.title}
          </Typography>
          <Typography variant="h6" color="textSecondary" noWrap>
            {competition.category}
          </Typography>
          <Typography variant="h6" color="textSecondary" noWrap>
            Participants: {competition.usernames.length}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CompetitionItem;

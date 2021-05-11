import React from "react";
import styles from "./CompetitionItem.module.css";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { ExitToApp } from "@material-ui/icons";
import CardActions from "@material-ui/core/CardActions";

const CompetitionItem = ({ competition, onLeave, onDelete }) => {
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
      <CardActions>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
        >
          <Grid item>
            {onLeave && (
              <IconButton
                aria-label="add to favorites"
                onClick={(e) => {
                  e.stopPropagation();
                  onLeave(competition.id);
                }}
              >
                <ExitToApp className={styles.icon} />
              </IconButton>
            )}
          </Grid>
          <Grid item>
            {onDelete && (
              <IconButton
                aria-label="share"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(competition.id);
                }}
              >
                <DeleteIcon className={styles.icon} />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default CompetitionItem;

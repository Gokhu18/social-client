import React, { Component } from 'react';
import Link from 'react-router-dom/Link'
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}

class Post extends Component {
  render() {
    const { classes, post : { body, createdAt, userImage, userHandle, postId, likeCount, commentCount } } = this.props;
    
    return (
      <Card className={classes.card}>
        <CardMedia image={userImage} title="Profile Image" className={classes.image}/>
        <CardContent className={classes.content}>
          <Typography 
            variant="h5" 
            component={Link} 
            to={`/${userHandle}`}
            color='primary'
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color='textSecondary'>{createdAt}</Typography>
          <Typography variant="body1" color=''>{body}</Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Post)
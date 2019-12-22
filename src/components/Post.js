import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types';
// REDUX
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';

// Components
import DeletePost from './DeletePost';
// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import MyButton from '../util/MyButton';
// Icons
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatIcon from '@material-ui/icons/Chat';


const cardStyles = {
  card: {
    position: 'relative',
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
  isLiked = () => {
    if(this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.post.postId)) {
      return true;
    } else {
      return false;
    }
  };
  handleLike = () => {
    this.props.likePost(this.props.post.postId)
  };
  handleUnlike = () => {
    this.props.unlikePost(this.props.post.postId)
  }; 

  render() {
    dayjs.extend(relativeTime)

    const { 
      classes, 
      post: { body, createdAt, userImage, userHandle, postId, likeCount, commentCount },
      user: { authenticated, credentials: { handle} } 
    } = this.props;

    const likeButton = !authenticated ? (
      <MyButton tip='Like'>
        <Link to='/login'>
          <ThumbUpOutlinedIcon color='primary'/>
        </Link>
      </MyButton>
    ) : (
      !this.isLiked() ? 
      (
        <MyButton tip='Like' color='secondary' onClick={this.handleLike} className='button'>
            <ThumbUpOutlinedIcon color='primary'/>
        </MyButton>
      ) : (
        <MyButton tip='Unlike' color='secondary' onClick={this.handleUnlike} className='button'>
            <ThumbUpIcon color='primary'/>
        </MyButton>
      )
    )
    
    const deleteButton = authenticated && userHandle === handle ? (
      <DeletePost postId={postId} />
    ) : null
    return (
      <Card className={classes.card}>
        <CardMedia image={userImage} title="Profile Image" className={classes.image}/>
        <CardContent className={classes.content}>
          <Typography 
            variant="h5" 
            component={Link}
            to={`/${userHandle}`}
            color='secondary'
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
          <Typography variant="body1">{body}</Typography>
          
          <MyButton tip='comments'>
            <ChatIcon color='primary'/>
          </MyButton>
          <span>{commentCount}</span>
          
          {likeButton}
          <span>{likeCount}</span>
          <span>{deleteButton}</span>
        </CardContent>
      </Card>
    )
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapStateToActions = {
  likePost,
  unlikePost
}

export default connect(mapStateToProps, mapStateToActions)(withStyles(cardStyles)(Post))

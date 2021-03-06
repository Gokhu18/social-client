import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Post from '../components/post/Post'
// REDUX
import { connect } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions'
// COMPONENTS
import StaticProfile from '../components/profile/StaticProfile'
// MATERIAL-UI
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = (theme) => ({
	...theme.spreadThis
})


class userProfile extends Component {
  state = {
    profile: null,
    postIdParam: null
  }
  componentDidMount(){
    const handle = this.props.match.params.handle;
    const postId = this.props.match.params.postId;

    // if the postId is included in the route ('/:handle/post/:postId')
    if(postId) {
      this.setState({ postIdParam: postId })
    }

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        })
      })
      .catch(err => console.log(err));
  }
  render() {
    const { classes } = this.props;
    const { posts, loading } = this.props.data;
    const { postIdParam } = this.state;


    const postsMarkup = loading ? ( // If the page is loading, show loading circle
      <div style={{margin:'auto', maxWidth:'10px'}}>
        <CircularProgress className={classes.progress} color='primary' />
      </div>
    ) : posts === null ? ( // If the userProfile has no posts, show 'No posts yet'
      <p>No posts yet...</p>
    ) : !postIdParam ? ( // If the route doesn't include a postId, show all posts
      posts.map(post => <Post key={post.postId} post={post} />)
    ) : (
      posts.map(post => {
        if(post.postId !== postIdParam) { // If the post's postId doesn't equal the postId in the route, return normal post
          return <Post key={post.postId} post={post} />
        } else { // If the post's postId is included in the route, return the post's open dialog (prop drilling)
          return <Post key={post.postId} post={post} openDialog/> //openDialog passed to PostDialog component
        }
        
      })
    )
    return (
      <Grid container spacing={10}>
				<Grid item sm={8} xs={12}>
					{postsMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					{this.state.profile && <StaticProfile profile={this.state.profile}/>}
				</Grid>
			</Grid>
    )
  }
}

userProfile.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

const mapStateToActions = {
  getUserData
}

export default connect(mapStateToProps, mapStateToActions)(withStyles(styles)(userProfile))

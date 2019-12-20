import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CoolIcon from '../images/coolblue.png';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

// Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = (theme) => ({
  ...theme.spreadThis
})


class login extends Component {
	
	constructor(){
		super();
		this.state = {
			email: '',
			password: '',
			// loading: false,
			errors: {}
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors })
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		// this.setState({
		// 	loading: true
		// });
		const userData = {
			email: this.state.email,
			password: this.state.password
		}
		this.props.loginUser(userData, this.props.history);
	}

	handleChange = (e) => {
		this.setState ({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { classes, UI: { loading } } = this.props;
		const { errors } = this.state;
		
		// if (token) {
    //   return <Redirect to="/" />;
    // }
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img src={CoolIcon} alt='cool' className={classes.image} />
					{/* h1 good for SEO */}
					<Typography variant="h2" className={classes.pageTitle}>
						Login
					</Typography>
					<form onSubmit={this.handleSubmit} noValidate>
						<TextField 
							id='email' 
							name='email' 
							type='email' 
							label='Email' 
							className={classes.textField}
							helperText={errors.email}
							error={errors.email ? true : false}
							value={this.state.email} 
							onChange={this.handleChange} 
							fullWidth 
						/>
						<TextField 
							id='password' 
							name='password' 
							type='password' 
							label='Password' 
							className={classes.textField}
							helperText={errors.password}
							error={errors.password ? true : false}
							value={this.state.password} 
							onChange={this.handleChange} 
							fullWidth 
						/>
						{errors.general && (
							<Typography variant='body2' className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button type='submit' variant='contained' color='secondary' className={classes.button} disabled={loading}>
							Login
							{loading &&
								<CircularProgress className={classes.progress} color='primary' size={30}/>
							}
						</Button>
						<br/>
						<small>Don't have an account? Sign up <Link to='/signup'>here</Link> </small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		)
	}
}

login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = {
	loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))

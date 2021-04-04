import Head from 'next/head'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'
const Login = () => {
	const signIn = () => {
		auth.signInWithPopup(provider).catch(alert)
	}
	return (
		<Container>
			<Head>
				<title>Login</title>
			</Head>
			<LoginContainer>
				<Logo src='https://www.clicom.it/wedit/uploads/news/32/tmb_whatsapp-icon-logo.png' />
				<Button onClick={signIn} variant='outlined'>Sign in with google</Button>
			</LoginContainer>
		</Container>
	)
}

export default Login

const Container = styled.div`
	display: grid;
	place-items: center;
	height:100vh;
	background-color:whitesmoke;
`
const LoginContainer = styled.div`
	padding: 100px;
	align-items: center;
	display: flex;
	box-shadow:0 4px 14px -3px rgba(0,0,0,0.7);
	background-color: white;
	border-radius:5px;
	flex-direction:column;
`
const Logo = styled.img`
	width: 200px; 
	height:200px;
	margin-bottom: 50px;
`
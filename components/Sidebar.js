import styled from 'styled-components'
import { Avatar, Button, IconButton, recomposeColor } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import * as EmailValidator from 'email-validator'
import { auth, db } from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import Chat from './Chat'

const Sidebar = () => {
	const [user] = useAuthState(auth)
	const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
	const [chatSnapshot] = useCollection(userChatRef)


	const createChat = () => {
		const input = prompt('Insert email')
		if (!input) return;
		if (EmailValidator.validate(input) && !chatAlreadyExist(input) && input !== user.email) {
			// we need to add the chat into the DB 'chats' collection
			db.collection('chats').add({
				users: [user.email, input]
			})
		}


	}
	// ** !! convert falsy value to false and truthy to true
	const chatAlreadyExist = (recipientEmail) => !!chatSnapshot?.docs.find(chat => chat.data().users.find(user => user === recipientEmail)?.length > 0)

	return (
		<Container>
			<Header>
				<UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
				<IconsContainer>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</IconsContainer>
			</Header>
			<Search>
				<SearchIcon />
				<SearchInput placeholder='Search chat' />
			</Search>
			<SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

			{/* List of chats */}
			{chatSnapshot?.docs.map(chat => (
				<Chat key={chat.id} id={chat.id} users={chat.data().users} />
			))}
		</Container>
	)
}

export default Sidebar


const Container = styled.div`
	flex: 0.45;
	border-right: 1px solid whitesmoke;
	height: 100vh;
	min-width: 300px;
	max-width: 350px;
	overflow-y: scroll;
 
`
const Header = styled.div`
	display: flex;
	position: sticky;
	top: 0;
	background-color: #fff;
	z-index: 1;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	height: 80px;
	border-bottom: 1px solid whitesmoke;
`
const UserAvatar = styled(Avatar)`
	cursor: pointer;
	:hover {
		opacity:.8;
	}
`
const IconsContainer = styled.div``

const SidebarButton = styled(Button)`
	width: 100%;
	&&& {
		border-bottom: 1px solid whitesmoke;
		border-top: 1px solid whitesmoke;
	}
`

const Search = styled.div`
	display: flex;
	align-items: center;
	padding: 20px;
	border-radius: 2px;
`
const SearchInput = styled.input`
	border: none;
	outline-width: 0;
	flex: 1;
`
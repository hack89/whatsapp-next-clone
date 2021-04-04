import { Circle } from 'better-react-spinkit'
function Loading() {
	return (
		<center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
			<div>
				<img height={200} src='https://www.clicom.it/wedit/uploads/news/32/tmb_whatsapp-icon-logo.png' alt="" style={{ marginBottom: 20 }} />
				<Circle color="#3cbc28" size={60} />
			</div>

		</center>
	)
}

export default Loading

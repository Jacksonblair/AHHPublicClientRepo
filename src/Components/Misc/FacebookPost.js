import react from 'react'
import './FacebookPost.css'
import ahhlogo from '../../Assets/Images/ahhlogo.png'
import { useParams } from 'react-router-dom'

let facebookPage = {
	corangamite: "https://www.facebook.com/ahelpinghandcorangamite/",
	colac: "https://www.facebook.com/ahelpinghandcolac/",
	warrnambool: "https://www.facebook.com/ahelpinghandwarrnambool/"
}

const FacebookPost = props => {

	let attachment = null
	let createdTime = new Date(Date.parse(props.post.created_time))
	let { region } = useParams()

	// If post does not have attachments, it's just a message.
	if (props.post.attachments) {
		// console.log(props.post.attachments.data[0].type)
		attachment = ""

		switch(props.post.attachments.data[0].type) {
			case "photo":
				attachment = (
					<> 
						<div className="attachment photo"> 
							<a href={props.post.attachments.data[0].target.url} target="_none">
							{
								props.post.attachments.data[0].media.image.src && 
								<div className="image">
									<img src={props.post.attachments.data[0].media.image.src}/>
								</div>
							}
							</a>
						</div>
					</>
				)

			break;
			case "video_direct_response":
				attachment = (
					<>
						{ props.post.attachments.data[0].media.source &&  							
							<div className="attachment video">
								<video controls src={props.post.attachments.data[0].media.source}/>
							</div>	
						}
					</>
				)
			break;
			case "video_inline":
				attachment = (
					<>
						{ props.post.attachments.data[0].media.source &&  
							<div className="attachment video">
								<video controls src={props.post.attachments.data[0].media.source}/>
							</div>	
						}

						{ !props.post.attachments.data[0].media.source && 
							<div className="attachment video">
								<a className="image" href={props.post.attachments.data[0].target.url} target="_none">
									<img src={props.post.attachments.data[0].media.image.src}/>
								{
									props.post.attachments.data[0].title &&
									<div className="message"> {props.post.attachments.data[0].title} </div>
								}
								</a>
							</div>	
						}
					</>
				)
			break;
			case "share":
				attachment = (
					<>
						<div className="attachment share"> 
							<a href={props.post.attachments.data[0].target.url} target="_none">

							{
								props.post.attachments.data[0].media.image.src && 
								<div className="image">
									<img src={props.post.attachments.data[0].media.image.src}/>
								
								</div>
							}

							{
								props.post.attachments.data[0].description &&
								<div className="message"> {props.post.attachments.data[0].title} </div>
							}
							</a>
						</div>
					</>
				)
			break;
			case "album":
				attachment = (
					<> 
						<div className="attachment album"> 
							<a href={props.post.attachments.data[0].target.url} target="_none">

							{
								props.post.attachments.data[0].media.image.src && 
								<div className="image">
									<img src={props.post.attachments.data[0].media.image.src}/>
								</div>
							}

							</a>
						</div>			
					</>
				)
			break;

			case "cover_photo":
				attachment = (
					<>
						<div className="attachment cover-photo"> 

							{
								props.post.attachments.data[0].media.image.src && 
								<div className="image">
									<img src={props.post.attachments.data[0].media.image.src}/>
								</div>
							}
						</div>
					</>
				)
			break;
			case "native_templates": // Usually means we cant get attachment information
				attachment = (
					<>
						<div className="attachment idk"> 

							{
								props.post.attachments.data[0].description &&
								<div className="message"> {props.post.attachments.data[0].title} </div>
							}
						</div>
					</>
				)
			break;
		}
	}

	return (
		<>
			<div className="facebook-post display-flex flex-column">
				<a href={facebookPage[region]} target="_none">
					<div className="header display-flex align-items-center">
						<div className="thumb display-flex justify-center align-items-center">
							<i className="fab fa-facebook-f header-3 blue"/>
						</div>
						<div className="text display-flex flex-column">
							<div style={{"textTransform":"capitalize"}}> A Helping Hand {!!region && region} </div>
							<div className="created"> 
								{createdTime.toLocaleDateString("en-au", { 
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})} 
							</div>
						</div>
					</div>
				</a>

				{ props.post.story && 
					<div className="story display-flex"> 
						{props.post.story} 
					</div> 
				}

				{ props.post.message && 
					<div className="message">
						{props.post.message && <> {props.post.message} </>}
					</div>
				}

				{attachment}

			</div>
		</>
	)

}

export default FacebookPost
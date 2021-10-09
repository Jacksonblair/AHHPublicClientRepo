import react from 'react'

function Testimonials(props) {

	return (
		<div className="display-flex justify-center">
			<article className="ctr-color ctr-blue">
				<h1 className="header-2 blue"> Testimonials </h1> 
				<br className="desktop-only"/>
				<section className="ctr-2">
					<h2 className="header-3"> A Helping Hand Christmas Appeal </h2>
					<div className="display-flex justify-center">
						<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/P_GOGRtZcpo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
					</div>
				</section>
				<br className="desktop-only"/>
				<section className="ctr-2">
					<h2 className="header-3"> Deakin University </h2>
					<div className="display-flex justify-center">
						<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/sdQhjy5ie9M" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
					</div>
				</section>
			</article>
		</div>
	)

}

export default Testimonials
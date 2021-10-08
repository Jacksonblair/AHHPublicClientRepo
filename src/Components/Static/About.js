import react from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import logoWithValues from '../../Assets/Images/logoWithValue.png';
import about1 from '../../Assets/Images/about1.jpg'
import about2 from '../../Assets/Images/about2.jpg'
import about3 from '../../Assets/Images/about3.jpg'
import about4 from '../../Assets/Images/about4.jpg'
import about5 from '../../Assets/Images/about5.jpg'
import about6 from '../../Assets/Images/about6.jpg'
import about7 from '../../Assets/Images/about7.jpg'

function About(props) {
	return (
		<div className="display-flex justify-center">
		<div className="ctr-color ctr-blue housing">
			<h1 className="header-2 blue"> About A Helping Hand </h1>
			<br/>
			<img style={{"width":"100%", "maxWidth":"200px"}} src={logoWithValues}/>
	      	<div>
				<br/>
		        <Carousel
		        infiniteLoop={true}
		        showThumbs={false}
		        dynamicHeight={false}>
	    			<div className="carousel-image" style={{"backgroundImage":`url(${about1})`}}/>
	    			<div className="carousel-image" style={{"backgroundImage":`url(${about2})`}}/>
	    			<div className="carousel-image" style={{"backgroundImage":`url(${about3})`}}/>
	    			<div className="carousel-image" style={{"backgroundImage":`url(${about4})`}}/>
	    			<div className="carousel-image" style={{"backgroundImage":`url(${about5})`}}/>
	    			<div className="carousel-image" style={{"backgroundImage":`url(${about6})`}}/>
	    			<div className="carousel-image" style={{"backgroundImage":`url(${about7})`}}/>
		        </Carousel>
				<br className="desktop-only"/>
				<br/>
	      	</div>

			<div className="ctr-6 medium text-left">
				We know that so many people and businesses in our community would love to help a local family or individual in need, but it’s difficult to know how to make a real difference. This is why A Helping Hand has been created.
				<br/><br/>A Helping Hand is a special new online community; a place we can all visit to find out how we can help someone local in a practical way. It’s about the community working together for the people who need us.
				<br/><br/>A Helping Hand will connect anonymous requests from local community organisations with community members and local businesses who wish to help a family or individual their ‘own backyard’.
				<br/><br/>All local health organisations, schools and other community groups can list the needs of those in their care through A Helping Hand. The community can then see what they can do to assist and support our agencies to fulfil a need.
				<br/><br/>The first A Helping Hand community platform was launched in the Corangamite Shire, SW Victoria in November 2020 in time for Christmas. This was a pilot program developed with Deakin University’s FreelancingHUB who have built the online platform www.ahelpinghand.com.au
				<br/><br/>We hope that we can bring A Helping Hand to other regions across Victoria and Australia very soon and we hope through A Helping Hand we can together create more opportunities for our local families and children and build more resilient and stronger communities. 
			</div>
			<br className="desktop-only"/>

			<div className="ctr-6 medium text-left">
				<div className="header-3 blue"> Vision: </div>
				<br/>
				To change the future of vulnerable families and children through practical, real support and opportunities provided by their OWN LOCAL COMMUNITIES.
				<br/><br/>To build more resilient communities and stop the cycle of intergenerational exclusion, poverty and abuse through community support.
			</div>
			<br className="desktop-only"/>

			<div className="ctr-6 medium text-left">
				<div className="header-3 blue"> Mission: </div>
				<br/>
				To provide an ‘online place’ where all individuals and businesses can go to find out how they can provide real and practical assistance for local people and families in need who live in their ‘own backyards’.
			</div>
			<br className="desktop-only"/>

			<div className="ctr-6 medium display-flex flex-space-between">
				<div>
					<div className="header-3 blue text-left"> Values: </div>
					<ul className="text-left">
						<li> 
							Privacy
						</li>
						<li> 
							Respect
						</li>
						<li> 
							Dignity
						</li>
						<li> 
							Community
						</li>
						<li> 
							Inclusion
						</li>
					</ul>
				</div>
				<div className="flex">
					<img style={{"width":"100%", "maxWidth":"200px"}} src={logoWithValues}/>
				</div>
			</div>
			<br className="desktop-only"/>

			<div id="protect" className="ctr-6 medium text-left">
				<div className="header-3 blue"> Protecting vulnerable people: </div>
				<br/>
					A Helping Hand is focused on making a positive impact within local communities. We take safety seriously and maintaining the dignity and privacy of all people is of paramount importance.
					<br/><br/>
					A Helping Hand will not require or have any identifying information of any person we seek to help. It is an anonymous service with only the registered agencies having knowledge of the individuals or families they are requesting help for. The Agency will liaise directly with the donor/volunteer/business – whoever has offered to fulfil the need, ensuring the right protocols and legal requirements in child safety and protection are adhered to.
			</div>
			<br className="desktop-only"/>

			<div id="began" className="ctr-6 medium text-left">
				<div className="header-3 blue"> How A Helping Hand began </div>
					<br/>
					Local Camperdown mother of three Elise McKinnon is the founder of A Helping Hand.
					<br/><br/>Elise has assisted many charities and community groups as both an Ambassador for the Ovarian Cancer Research Foundation and Treasure Chest Charities as well as organising special events as a committee member with Lillian Frank’s Royal Children’s Hospital Fundraising Committee. She has donated her time to work with the Reach Foundation, Starlight Children’s Foundation, as well as creating and producing her own television program for the Nine Network Australia titled ‘Australian Success’.
					<br/><br/><div className="header-3 italic text-center">"It's about basic human care"</div>
					<br/>Elise started working on developing a way to connect the community to the needs of our most vulnerable many years ago after reading too many stories of children as young as five who were placed into residential care with drug users and prostitutes. What hope did they have to overcome these influences? Knowing that so many people would love to be able to support these children if only they knew how, Elise spent time with various community and health organisations to establish where the gap lay in assisting vulnerable families and children in our communities, thus the idea for A Helping Hand was born.
					<br/><br/><br/><div className="italic bold quote">"Every solution to disadvantage involved the local community caring for its own. The feedback from every organisation I spent time with was that establishing a sense of belonging within one’s own community was essential to building resilience in young people and that one positive role model or interaction has the capacity to change a person’s life. It is not a matter of the government or welfare organisations solving society’s problem alone; it is about basic human care. If each of us was able to do something small to help each other and particularly to help those most vulnerable in our local communities, we would all prosper and grow.”
					</div><br/><div className="italic bold">- Elise McKinnon </div>
					<br/><br/>Thank you to the Deakin University FreelancingHUB who has been an integral part of the development of A Helping Hand. Without their enormous commitment, enthusiasm and incredible talent, this platform would not have been possible.
					<br/><br/><div className="bold"> Thank you! Together we are creating something that has the potential to change many lives. </div>
			</div>
			<br className="desktop-only"/>

			<div id="works" className="ctr-6 medium text-left">
				<div className="header-3 blue"> How the website works </div>
				<br/>	
				<div className="blue inline bold">ahelpinghand.com.au&nbsp;</div> 
				works by connecting individuals and businesses to those in need. It is about meeting needs NOT about providing money.
		
				<ul className="text-left" style={{"paddingInlineStart":"20px"}}>
					<li>Local welfare agencies, schools and community organisations list the needs of families and children in their care.
					</li><li>People and businesses can then login to ahelpinghand.com.au and choose their local community page.
					</li><li>Here they can see a list of skills, expertise or donated items that are needed by local individuals and families.
					</li><li>They can then choose to do one of 3 things: </li>
					<ul style={{"paddingInlineStart":"20px"}}>
						<li>Fulfil a need whereby they liaise directly with the Agency who listed the need;
						</li><li>Share the need with their social networks and friends who may be able to help or;
						</li><li>Offer to donate their skills, products, opportunities or time. Only Agencies can see the donated items and accept a donation on behalf of someone in their care.
						</li>
					</ul>
				</ul>
				<br />
				<div className="display-flex justify-center">
					<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/qz6enzREk4I" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				</div>
				<br />
				<div className="text-left bold italic">*Any payments for goods or services are made direct to the Agency to cover the cost of the items.  
				</div><br/><div className="text-left bold italic">*Agencies agree not to take any funds for administration fees and that they are responsible for the safety of their clients and all police and Working With Children Checks.
				</div>
			</div>
		</div>
		</div>
	)
}

export default About
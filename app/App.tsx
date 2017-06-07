import _ from 'lodash';
import React from 'react';
import Classnames from 'classnames';

import { Nav } from './Nav';
import { Page } from './Page';
import { Flightplan } from './Flightplan';
import { MediaGallery } from './MediaGallery';

import './lib/reset.less';
import './App.less';

export enum PageKey {
	Flightplan,
	Zazzle,
	SecondaryMissions,
	Resume,
	Contact
}

interface AppState {
	activePage: PageKey;
	isLightboxOpen: boolean;
	isTransitioningToPage: boolean;
}

export class App extends React.Component<{}, AppState> {
	state = {
		activePage: PageKey.Flightplan
	} as AppState;

	private pagesRef: HTMLDivElement;

	componentWillMount() {
		// add keyboard navigation listeners
		window.addEventListener('keydown', (e) => {
			switch (e.which) {
				// space
				case 32:
				// left
				case 37:
				// up
				case 38:
					if (!this.state.isLightboxOpen)
						this.handleNavigatePrev();
					break;

				// right
				case 39:
				// down
				case 40:
					if (!this.state.isLightboxOpen)
						this.handleNavigateNext();
					break;
			}
		});

		// handle initial navigation (via hash)
		const activePageKey = Object.keys(PageKey).find(key => {
			return key.toLowerCase() === window.location.hash.substr(1).toLowerCase();
		});
		if (activePageKey) {
			const fragmentFromPageKey = (PageKey as any as { [key: string]: string })[activePageKey] as any;
			this.navigateToPage(fragmentFromPageKey);
		}
		else
			window.history.replaceState({}, document.title, '/');

		// listen for hashchange so links work properly
		window.addEventListener('hashchange', e => {
			const hash = document.location.hash.substr(1);
			let pageKey = null as PageKey;
			_.forEach(PageKey, (value, key) => {
				if (hash.toLowerCase() === key.toLowerCase())
					pageKey = value;
			});

			if (pageKey !== null)
				this.navigateToPage(pageKey);
		});
	}

	private handleLightboxClose = () => {
		this.setState({ isLightboxOpen: false });
	}
	private handleLightboxOpen = () => {
		this.setState({ isLightboxOpen: true });
	}

	private handleNavigateNext = () => {
		const pageCount = Object.keys(PageKey).length / 2;
		if (this.state.activePage < pageCount - 1)
			this.navigateToPage(this.state.activePage + 1);
	}

	private handleNavigatePrev = () => {
		if (this.state.activePage > 0)
			this.navigateToPage(this.state.activePage - 1);
	}

	/** Navigates to the given page, while maintaining state.isTransitioningToPage. */
	private navigateToPage = (pageKey: PageKey) => {
		if (this.state.activePage !== pageKey) {
			this.setState({
				activePage: pageKey,
				isTransitioningToPage: true
			});

			// TODO: Replace this with the transitionend event, but it's firing multiple times before the transition is actually done.
			// Maybe because of CSS prefixing?
			setTimeout(() => {
				this.setState({
					isTransitioningToPage: false
				});
			}, 500 + 1000);

			// update the URL hash
			window.history.replaceState({}, document.title, `#${PageKey[pageKey].toLowerCase()}`);
		}
	}

	render() {
		const { activePage, isTransitioningToPage } = this.state;

		const pageCount = Object.keys(PageKey).length / 2;
		const vhPerPage = 4;
		const backgroundStyle: React.CSSProperties = {
			paddingBottom: `${vhPerPage * (pageCount - 1)}vh`,
			transform: `translateY(-${activePage * vhPerPage}vh)`
		};

		const classnames = Classnames(
			'App',
			{ 'App--lightboxOpen': this.state.isLightboxOpen }
		)

		return (
			<div className={classnames}>
				<div className="App-background" style={backgroundStyle} />

				<Nav activePage={activePage} onNavigate={this.navigateToPage} />

				<div
					className="App-pages"
					ref={div => { this.pagesRef = div; }}
					style={{ transform: `translateY(${-activePage * 100}vh)` }}
				>
					<Page
						isFirstPage
						isTransitioning={isTransitioningToPage}
						onNavigateNext={this.handleNavigateNext}
						pageKey={PageKey.Flightplan}
					>
						<Flightplan />
					</Page>

					<Page
						isTransitioning={isTransitioningToPage}
						onNavigateNext={this.handleNavigateNext}
						onNavigatePrev={this.handleNavigatePrev}
						pageKey={PageKey.Zazzle}
					>
						<h1>Zazzle</h1>
						<p>
							Zazzle is an e-commerce platform that brings together designers, product manufacturers, and consumers. Designers earn royalties, manufacturers gain customers, and consumers can buy any pre-existing design or bring their custom creation to life. As Lead Developer on the UI team, I've helped solve some of Zazzle's most complex UI issues, consistently advocating for the best possible user experience.
						</p>

						<h2>The Product Page</h2>
						<MediaGallery
							items={[
								{
									type: 'image',
									alt: 'Zazzle product page: beer carrier',
									src: '/img/pdp-(beer-carrier).jpg',
									thumbnailSrc: '/img/pdp-(beer-carrier).jpg'
								},
								{
									type: 'image',
									alt: 'Zazzle product page: mug',
									src: '/img/pdp-(mug).jpg',
									thumbnailSrc: '/img/pdp-(mug).jpg'
								},
								{
									type: 'image',
									alt: 'Zazzle product page: shirt design tool',
									src: '/img/pdp-(shirt-design-tool-2).jpg',
									thumbnailSrc: '/img/pdp-(shirt-design-tool-2).jpg'
								}
							]}
							onLightboxClose={this.handleLightboxClose}
							onLightboxOpen={this.handleLightboxOpen}
						/>
						<p>
							Since my arrival at Zazzle, I've been a part of three product page releases. In that time, I've released countless AB tests, added many dozens of features, and evolved our UI stack (see React+TypeScript below).
						</p>
						<p>
							I was initially drawn to the product page because it aligns with many of my interests. It needs to be highly interactive, fast, and playful. It needs to be usable for novices and powerful enough for experts. It needs to scale; some products have upwards of 1,000,000 possible configurations, while some have one or none. It needs to be extensible; full color printing, screen print, embroidery, foil, letterpress, and engraving are all supported. It needs to be internationalized to over a dozen domains. In building and maintaining the product page, I needed to keep all of these features and requirements in mind in order to deliver a successful product.
						</p>

						<h2>React+TypeScript</h2>
						<MediaGallery
							items={[
								{
									type: 'image',
									alt: 'React code',
									src: '/img/react-(code).jpg',
									thumbnailSrc: '/img/react-(code).jpg'
								},
								{
									type: 'image',
									alt: 'React dev tools',
									src: '/img/react-(react-tools).jpg',
									thumbnailSrc: '/img/react-(react-tools).jpg'
								},
								{
									type: 'image',
									alt: 'Redux dev tools',
									src: '/img/react-(redux-tools).jpg',
									thumbnailSrc: '/img/react-(redux-tools).jpg'
								}
							]}
							onLightboxClose={this.handleLightboxClose}
							onLightboxOpen={this.handleLightboxOpen}
						/>
						<p>
							In 2016, I began pushing React at Zazzle (see <a href="#secondarymissions">RideWeather</a> for my origin story with React). I built an internal tool as a proof of concept, and then a wonderful opportunity presented itself: a total redesign of the order history page. This project was self-contained, complex enough to make a good stress test of our new React stack, and simple enough to be a feasible project.
						</p>

						<h3>Exec buy-in on React</h3>
						<p>
							The next step was exec buy-in. I set about building my case that would (hopefully) convince the engineering leads and greater team of the merits of switching to React. The first step was researching other framework options. At the time, the two frontrunners were React and Angular, with React being a clear winner in my opinion. But alas, React is just a view, so understanding Redux and Redux-Saga was a prerequisite for having confidence that this stack could scale. Data delivery was next; the team and I brainstormed how to build a C# layer to collate and serialize the data needed to render the page, leveraging existing middle tier data sources. As icing on the cake, I demoed hot module reloading. Game changer. Needless to say, we were green-lit to start building the new orders history experience with React.
						</p>

						<h3>TypeScript</h3>
						<p>

							Not long into the journey, TypeScript began tempting us. PropTypes were great and all, but the idea of strongly typed Javascript was enticing. This strong typing, coupled with the fact the TypeScript is ultimately a proper superset of Javascript, pushed us over the edge. And so the TypeScript conversion began on our (thankfully) small React codebase. Looking back on using TypeScript has been a boon for Zazzle's UI team. Bug frequency was decimated, iteration was faster, documentation was inherent via types, and refactoring was a breeze.
						</p>
						<p>
							Fast forward through another React project and some design team cycles, and we find ourselves with a brand new product page, build entirely on React, TypeScript, Redux, and Redux-Saga.
						</p>
					</Page>

					<Page
						isTransitioning={isTransitioningToPage}
						onNavigateNext={this.handleNavigateNext}
						onNavigatePrev={this.handleNavigatePrev}
						pageKey={PageKey.SecondaryMissions}
					>
						<h1>Secondary Missions</h1>

						<h2>RideWeather</h2>
						<MediaGallery
							items={[
								{
									type: 'image',
									alt: 'RideWeather routes screen',
									src: '/img/rideweather-(routes).jpg',
									thumbnailSrc: '/img/rideweather-(routes).jpg',
								},
								{
									type: 'image',
									alt: 'RideWeather main screen',
									src: '/img/rideweather-(main).jpg',
									thumbnailSrc: '/img/rideweather-(main).jpg',
								},
								{
									type: 'image',
									alt: 'RideWeather sketches',
									src: '/img/rideweather-sketches.jpg',
									thumbnailSrc: '/img/rideweather-sketches.jpg',
								}
							]}
							onLightboxClose={this.handleLightboxClose}
							onLightboxOpen={this.handleLightboxOpen}
						/>
						<p>
							I bike a lot; I design a lot; I build a lot. This clearly means I need a good weather app and testbed in which I can experiment with UI design and UI tech. RideWeather is that app.
						</p>

						<h3>The need</h3>
						<p>
							RideWeather was conceived one summer day when I was biking to work from SF to Redwood City. The weather report seemed clear, but I got rained on halfway there. On the train home, I thought, "Wouldn't it be nice if I could forecasts along my route?" I went to work researching extant solutions to my problem, but found nothing of any substance that could be applied to cycling. Challenge accepted.
						</p>

						<h3>The design</h3>
						<p>
							I quickly formed the basic concept: 6 forecasts along a given bike route, each one timed to match my average pace. I listed my data requirements, sketched the UI, found a nice weather icon set, created a blue sky color palette, and found a suitable font. After a few iterations, the design was ready to build.
						</p>

						<h3>The initial build</h3>
						<p>
							At the time, I was fresh off the heels of ForwardJS, and Angular 1.x had caught my eye. Accordingly, this became my first Angular project. Angular was fine, but as time went on, React started to lure me in. I wanted to change how the departure tim selection worked, so I decided I might as well start over in React. Reasonable, right? This was an excellent decision that resulted in my current passion for working in React.
						</p>

						<h3>Refining</h3>
						<p>
							Eventually my use case changed, so I needed to rethink RideWeather's design. I no longer wanted to choose a departure time and select the route with the best weather. I wanted to choose a route and find the best time to go. To accomplish this, I created a slider with which to scrub through the next 24 hours, complete with sunrise/sunset indicators so as to avoid riding in the dark. This time around, I used the stack I had been refining over time: React+TypeScript (the same one I pioneered at Zazzle).
						</p>

						<h2>Kerbal Space Program</h2>
						<MediaGallery
							items={[
								{
									type: 'video',
									embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/XLmo_FFH6v4" frameborder="0" allowfullscreen></iframe>`,
									thumbnailSrc: '/img/ksp-vab-climber.jpg'
								},
								{
									type: 'video',
									embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/iQ8ixbXC-W4" frameborder="0" allowfullscreen></iframe>`,
									thumbnailSrc: '/img/ksp-india-tribute.jpg'
								},
								{
									type: 'video',
									embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/egExmjvG0Gg" frameborder="0" allowfullscreen></iframe>`,
									thumbnailSrc: '/img/ksp-mun-ore-grabber.jpg'
								},
							]}
							onLightboxClose={this.handleLightboxClose}
							onLightboxOpen={this.handleLightboxOpen}
						/>
						<p>
							Space. Is. Awesome. I love all things space: rockets, flight planning, and the math and engineering it takes to get there. Moreover, I'm inspired by the aerospace industry's ability to help people through information services, science, and accessible technologies that come out of space technology. Actually going to space is hard, but video games are a bit simpler This is (at least partially) why I've logged way too many hours playing KSP.
						</p>

						<p>
							It's very easy to get engrossed in the process. Let's take the classic example of sending a rover to Duna (KSP's Mars), loosely recreating the MSL (Curiosity) mission. First up, we send a satellite to find a landing site and act as orbital comms. Quick and easy. Next is building the rover and the EDL (entry, descent, and landing) system. The rover needs to get to Duna, so we need to calculate the deltaV requirements, plan our ejection burn, and build the cruise stage that will get us from Kerbin (KSP's Earth) to Duna. Now we just need to get those two stages into Kerbin orbit, and voila! Spaceflight!
						</p>
					</Page>

					<Page
						isTransitioning={isTransitioningToPage}
						onNavigateNext={this.handleNavigateNext}
						onNavigatePrev={this.handleNavigatePrev}
						pageKey={PageKey.Resume}
					>
						<h1>Resume</h1>
					</Page>

					<Page
						isLastPage
						isTransitioning={isTransitioningToPage}
						onNavigatePrev={this.handleNavigatePrev}
						pageKey={PageKey.Contact}
					>
						<div className="App-contactImage">
							<div className="App-contactText">
								Connect with me for your next mission.
								<br />

								> <a href="https://twitter.com/parkerbossier" target="_blank">
									<img alt="twitter" src="/img/twitter.png" />
									{' '}
									@parkerbossier
								</a>;
								<br />

								> <a href="https://github.com/parkerbossier" target="_blank">
									<img alt="GitHub" src="/img/github.png" />
									{' '}
									parkerbossier
								</a>;
								<br />

								> <a href="mailto:me@parkerbossier.com" target="_blank">
									{/* https://www.iconfinder.com/icons/326515/email_mail_icon#size=128 */}
									<svg viewBox="0 0 20 16"><g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1"><g fill="#000000" id="Icons-Communication" transform="translate(-168.000000, -43.000000)"><g id="email" transform="translate(168.000000, 43.000000)"><path d="M18,0 L2,0 C0.9,0 0,0.9 0,2 L0,14 C0,15.1 0.9,16 2,16 L18,16 C19.1,16 20,15.1 20,14 L20,2 C20,0.9 19.1,0 18,0 L18,0 Z M18,4 L10,9 L2,4 L2,2 L10,7 L18,2 L18,4 L18,4 Z" id="Shape" /></g></g></g></svg>
									{' '}
									parkerbossier@gmail.com
								</a>;
							</div>

							<div className="App-contactSash" />
						</div>
					</Page>
				</div>

				<div className="App-photoCredit">Photo credit: NASA</div>
			</div>
		)
	}
}
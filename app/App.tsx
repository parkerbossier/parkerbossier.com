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

						<h3>Exec buy-in</h3>
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
							I bike a lot; I design a lot; I build a lot. This means I need a good weather app and a testbed app in which I can experiment with UI design and UI tech. RideWeather is that app.
						</p>

						<p>
							RideWeather was conceived one summer day when I was biking to work from SF to Redwood City. The weather report seemed clear, but I got rained on halfway there. On the train home, I thought, "Wouldn't it be nice if I could collate several weather reports together, each report being for the prorated time/location along the ride?" I went to work researching extant solutions to my problem, but found nothing. And so it began.
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
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>

						<h2>Archdata</h2>
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
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
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
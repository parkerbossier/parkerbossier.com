import _ from 'lodash';
import React from 'react';
import Classnames from 'classnames';

import { Nav } from './Nav';
import { Page } from './Page';
import { Flightplan } from './Flightplan';
import { ImageGallery } from './ImageGallery';

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
						<ImageGallery
							onLightboxClose={this.handleLightboxClose}
							onLightboxOpen={this.handleLightboxOpen}
							previewImageProps={[
								{
									src: '/img/pdp-(beer-carrier).jpg',
									title: 'Zazzle product page: beer carrier'
								},
								{
									src: '/img/pdp-(mug).jpg',
									title: 'Zazzle product page: mug'
								},
								{
									src: '/img/pdp-(shirt-design-tool-2).jpg',
									title: 'Zazzle product page: shirt design tool'
								}
							]}
						/>
						<p>
							Since my arrival at Zazzle, I've been a part of three product page releases. In that time, I've released countless AB tests, added many dozens of features, and evolved our UI stack (see below for more). The product page aligns with many of my interests.
						</p>

						<h2>React+TypeScript</h2>
						<ImageGallery
							onLightboxClose={this.handleLightboxClose}
							onLightboxOpen={this.handleLightboxOpen}
							previewImageProps={[
								{
									src: '/img/react-(code).jpg',
									title: 'React code'
								},
								{
									src: '/img/react-(react-tools).jpg',
									title: 'React dev tools'
								},
								{
									src: '/img/react-(redux-tools).jpg',
									title: 'Redux dev tools'
								}
							]}
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

						<h2>Who is Zazzle?</h2>
						<p>
							Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass
							motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass,
							'cause I'll kill the motherfucker, know what I'm sayin'?
						</p>

						<h2>React+Typescript</h2>
						<p>
							<img data-pull-left src="https://placeholdit.imgix.net/~text?w=200&h=150" />
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>
						<p>
							<img data-pull-right src="https://placeholdit.imgix.net/~text?w=200&h=150" />
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>
						<p data-clear>
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>

						<h2>PBJ</h2>
						<p>
							<img data-pull-right src="https://placeholdit.imgix.net/~text?w=200&h=150" />
							Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American
							crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun
							in American crime. Like they're actually proud of that shit.
						</p>
						<p>
							<img data-pull-left src="https://placeholdit.imgix.net/~text?w=200&h=150" />
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

						<h2>Who is Zazzle?</h2>
						<p>
							Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass
							motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass,
							'cause I'll kill the motherfucker, know what I'm sayin'?
						</p>

						<h2>React+Typescript</h2>
						<p>
							<img data-pull-left src="https://placeholdit.imgix.net/~text?w=200&h=150" />
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>
						<p>
							<img data-pull-right src="https://placeholdit.imgix.net/~text?w=200&h=150" />
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>
						<p data-clear>
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>

						<h2>PBJ</h2>
						<p>
							<img data-pull-right src="https://placeholdit.imgix.net/~text?w=200&h=150" />
							Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American
							crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun
							in American crime. Like they're actually proud of that shit.
						</p>
						<p>
							<img data-pull-left src="https://placeholdit.imgix.net/~text?w=200&h=150" />
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>
					</Page>

					<Page
						isLastPage
						isTransitioning={isTransitioningToPage}
						onNavigatePrev={this.handleNavigatePrev}
						pageKey={PageKey.Contact}
					>
						<h1>Contact me</h1>

						<ul className="App-contactLinks">
							<li>
								<a href="https://twitter.com/parkerbossier" target="_blank">
									<img alt="twitter" src="/img/twitter.png" />
									{' '}
									@parkerbossier
								</a>
							</li>
							<li>
								<a href="https://github.com/parkerbossier" target="_blank">
									<img alt="GitHub" src="/img/github.png" />
									{' '}
									parkerbossier
								</a>
							</li>
							<li>
								<a href="mailto:me@parkerbossier.com" target="_blank">
									{/* https://www.iconfinder.com/icons/1814108/email_envenlope_letter_mail_icon#size=128 */}
									<svg viewBox="0 0 64 64"><g><g transform="translate(78.000000, 232.000000)"><path className="st0" d="M-22.5-213.2l-1.9-1.9l-17.6,17.6c-2.2,2.2-5.9,2.2-8.1,0L-67.7-215l-1.9,1.9l13.1,13.1     l-13.1,13.1l1.9,1.9l13.1-13.1l2.6,2.6c1.6,1.6,3.7,2.5,5.9,2.5s4.3-0.9,5.9-2.5l2.6-2.6l13.1,13.1l1.9-1.9l-13.1-13.1     L-22.5-213.2" id="Fill-3" /><path className="st0" d="M-26.2-181.6h-39.5c-2.3,0-4.2-1.9-4.2-4.2v-28.2c0-2.3,1.9-4.2,4.2-4.2h39.5     c2.3,0,4.2,1.9,4.2,4.2v28.2C-22-183.5-23.9-181.6-26.2-181.6L-26.2-181.6z M-65.8-215.5c-0.8,0-1.4,0.6-1.4,1.4v28.2     c0,0.8,0.6,1.4,1.4,1.4h39.5c0.8,0,1.4-0.6,1.4-1.4v-28.2c0-0.8-0.6-1.4-1.4-1.4H-65.8L-65.8-215.5z" id="Fill-4" /></g></g></svg>
									{' '}
									parkerbossier@gmail.com
								</a>
							</li>
						</ul>
					</Page>
				</div>

				<div className="App-photoCredit">Photo credit: NASA</div>
			</div>
		)
	}
}
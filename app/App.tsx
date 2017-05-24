import React from 'react';

import { Nav } from './Nav';
import { Page } from './Page';
import { Flightplan } from './Flightplan';

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
					this.handleNavigatePrev();
					break;

				// right
				case 39:
				// down
				case 40:
					this.handleNavigateNext();
					break;
			}
		})
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
			}, 1000);
		}
	}

	render() {
		const { activePage, isTransitioningToPage } = this.state;

		return (
			<div className="App">
				<Nav activePage={activePage} onNavigate={this.navigateToPage} />

				<div
					className="App-pages"
					ref={div => { this.pagesRef = div; }}
					style={{ transform: `translateY(${-activePage * 100}vh)` }}
				>
					<Page
						isFirstPage
						lockScrolling={isTransitioningToPage}
						onNavigateNext={this.handleNavigateNext}
						pageKey={PageKey.Flightplan}
					>
						<Flightplan />
					</Page>

					<Page
						lockScrolling={isTransitioningToPage}
						onNavigateNext={this.handleNavigateNext}
						onNavigatePrev={this.handleNavigatePrev}
						pageKey={PageKey.Zazzle}
					>
						<h1>Zazzle</h1>

						<h2>Who is Zazzle?</h2>
						<p>
							Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass
							motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass,
							'cause I'll kill the motherfucker, know what I'm sayin'?
						</p>

						<h2>React+Typescript</h2>
						<p>
							<img data-pull-left src="https://placeholdit.imgix.net/~text?w=150&h=150" />
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>
						<p>
							<img data-pull-right src="https://placeholdit.imgix.net/~text?w=150&h=150" />
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
							<img data-pull-right src="https://placeholdit.imgix.net/~text?w=150&h=150" />
							Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American
							crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun
							in American crime. Like they're actually proud of that shit.
						</p>
						<p>
							<img data-pull-left src="https://placeholdit.imgix.net/~text?w=150&h=150" />
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>
					</Page>

					<Page
						lockScrolling={isTransitioningToPage}
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
							<img data-pull-left src="https://placeholdit.imgix.net/~text?w=150&h=150" />
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>
						<p>
							<img data-pull-right src="https://placeholdit.imgix.net/~text?w=150&h=150" />
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
							<img data-pull-right src="https://placeholdit.imgix.net/~text?w=150&h=150" />
							Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American
							crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun
							in American crime. Like they're actually proud of that shit.
						</p>
						<p>
							<img data-pull-left src="https://placeholdit.imgix.net/~text?w=150&h=150" />
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>
					</Page>

					<Page
						lockScrolling={isTransitioningToPage}
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
							<img data-pull-left src="https://placeholdit.imgix.net/~text?w=150&h=150" />
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>
						<p>
							<img data-pull-right src="https://placeholdit.imgix.net/~text?w=150&h=150" />
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
							<img data-pull-right src="https://placeholdit.imgix.net/~text?w=150&h=150" />
							Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American
							crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun
							in American crime. Like they're actually proud of that shit.
						</p>
						<p>
							<img data-pull-left src="https://placeholdit.imgix.net/~text?w=150&h=150" />
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>
					</Page>

					<Page
						isLastPage
						lockScrolling={isTransitioningToPage}
						onNavigatePrev={this.handleNavigatePrev}
						pageKey={PageKey.Contact}
					>
						<h1>Contact</h1>

						<h2>Who is Zazzle?</h2>
						<p>
							Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass
							motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass,
							'cause I'll kill the motherfucker, know what I'm sayin'?
						</p>

						<h2>React+Typescript</h2>
						<p>
							<img data-pull-left src="https://placeholdit.imgix.net/~text?w=150&h=150" />
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>
						<p>
							<img data-pull-right src="https://placeholdit.imgix.net/~text?w=150&h=150" />
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
							<img data-pull-right src="https://placeholdit.imgix.net/~text?w=150&h=150" />
							Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American
							crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun
							in American crime. Like they're actually proud of that shit.
						</p>
						<p>
							<img data-pull-left src="https://placeholdit.imgix.net/~text?w=150&h=150" />
							Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell
							who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you
							and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.
						</p>
					</Page>
				</div>

				<div className="App-photoCredit">Photo credit: NASA</div>
			</div>
		)
	}
}
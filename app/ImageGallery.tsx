import Classnames from 'classnames';
import React from 'react';

import './ImageGallery.less';

interface ImageGalleryProps {
	onLightboxClose: () => void;
	onLightboxOpen: () => void;
	previewImageProps: React.HTMLProps<HTMLImageElement>[];
}

interface ImageGalleryState {
	activeIndex: number;
}

export class ImageGallery extends React.Component<ImageGalleryProps, ImageGalleryState> {
	state = {
		activeIndex: null
	} as ImageGalleryState;

	private lightbox: HTMLDivElement;

	componentDidUnmount() {
		window.removeEventListener('keydown', this.keyboardHandler);
	}

	private keyboardHandler = (e: KeyboardEvent) => {
		const { previewImageProps } = this.props;

		console.log(e.which)

		switch (e.which) {
			// esc
			case 27:
				this.closeLightbox();
				break;

			// left
			case 37:
			// up
			case 38:
				this.lightboxPrev();
				break;

			// right
			case 39:
			// down
			case 40:
				this.lightboxNext();
				break;
		}
	}

	private handleLightboxClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// click on background; close
		if (e.target === this.lightbox) {
			this.closeLightbox();
		}
	}

	private closeLightbox = () => {
		this.setState({ activeIndex: null });
		this.props.onLightboxClose();
		window.removeEventListener('keydown', this.keyboardHandler);
	}
	private openLightbox = (index: number) => {
		this.setState({ activeIndex: index });
		this.props.onLightboxOpen();
		window.addEventListener('keydown', this.keyboardHandler);
	}

	private lightboxNext = () => {
		const newIndex = (this.state.activeIndex + 1) % this.props.previewImageProps.length;
		this.setState({ activeIndex: newIndex });
	}
	private lightboxPrev = () => {
		const { previewImageProps } = this.props;
		const newIndex = (this.state.activeIndex + previewImageProps.length - 1) % previewImageProps.length;
		this.setState({ activeIndex: newIndex });
	}

	render() {
		const { previewImageProps } = this.props;
		const { activeIndex } = this.state;

		return (
			<div className="ImageGallery">
				<ul className="ImageGallery-previews">
					{previewImageProps.map((imageProps, i) => {
						return (
							<li key={i}>
								<a
									href="javascript://"
									onClick={this.openLightbox.bind(null, i)}
								>
									<img {...imageProps} />
								</a>
							</li>
						);
					})}
				</ul>

				{activeIndex !== null && (
					<div
						className="ImageGallery-lightbox"
						onClick={this.handleLightboxClick}
						ref={div => { this.lightbox = div }}
					>
						<div className="ImageGallery-lightboxContent">
							<img {...previewImageProps[activeIndex]} />

							<a
								className="ImageGallery-lightboxClose"
								href="javascript://"
								onClick={this.closeLightbox}
							>
								&times;
							</a>

							<a
								className="ImageGallery-lightboxPrev"
								href="javascript://"
								onClick={this.lightboxPrev}
							>
								&lsaquo;
							</a>
							<a
								className="ImageGallery-lightboxNext"
								href="javascript://"
								onClick={this.lightboxNext}
							>
								&rsaquo;
							</a>
						</div>
					</div>
				)}
			</div>
		);
	}
}
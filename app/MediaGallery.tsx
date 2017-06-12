import Classnames from 'classnames';
import React from 'react';

import './MediaGallery.less';

interface MediaGalleryProps {
	onLightboxClose: () => void;
	onLightboxOpen: () => void;
	isMobile: boolean;
	items: GalleryItem[];
}

interface MediaGalleryState {
	/** null means the lightbox is closed */
	activeIndex: number;
}

type GalleryItem = ImageItem | VideoItem;
interface ImageItem {
	type: 'image';
	alt: string;
	thumbnailSrc: string;
	src: string;
}
interface VideoItem {
	type: 'video';
	embed: string;
	thumbnailSrc: string;
}

export class MediaGallery extends React.Component<MediaGalleryProps, MediaGalleryState> {
	state = {
		activeIndex: null
	} as MediaGalleryState;

	private lightbox: HTMLDivElement;

	componentWillUnmount() {
		window.removeEventListener('keydown', this.keyboardHandler);
	}

	private keyboardHandler = (e: KeyboardEvent) => {
		switch (e.which) {
			// backspace
			case 8:
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
		document.rootElement.classList.remove('mediaGalleryNoScroll');
	}
	private openLightbox = (index: number) => {
		this.setState({ activeIndex: index });
		this.props.onLightboxOpen();
		window.addEventListener('keydown', this.keyboardHandler);
		document.rootElement.classList.add('mediaGalleryNoScroll');
	}

	private lightboxNext = () => {
		const newIndex = (this.state.activeIndex + 1) % this.props.items.length;
		this.setState({ activeIndex: newIndex });
	}
	private lightboxPrev = () => {
		const { items } = this.props;
		const newIndex = (this.state.activeIndex + items.length - 1) % items.length;
		this.setState({ activeIndex: newIndex });
	}

	render() {
		const { isMobile, items } = this.props;
		const { activeIndex } = this.state;

		const closeLink = (
			<a
				className="MediaGallery-lightboxClose"
				//href="javascript:;"
				onClick={this.closeLightbox}
			>
				<span>x</span>
			</a>
		);

		const activeItem = items[activeIndex];

		const nextButton = (
			<a
				className="MediaGallery-lightboxNext"
				href="javascript:;"
				onClick={this.lightboxNext}
			>
				<span>&gt;</span>
			</a>
		);
		const prevButton = (
			<a
				className="MediaGallery-lightboxPrev"
				href="javascript:;"
				onClick={this.lightboxPrev}
			>
				<span>&lt;</span>
			</a>
		);

		return (
			<div className="MediaGallery">
				<ul className="MediaGallery-thumbnails">
					{items.map((item, i) => {
						const classnames = Classnames(
							'MediaGallery-thumbnail',
							{ 'MediaGallery-thumbnail--video': item.type === 'video' }
						);

						return (
							<li key={i}>
								<a
									className={classnames}
									href="javascript:;"
									onClick={this.openLightbox.bind(null, i)}
									style={{ backgroundImage: `url('${item.thumbnailSrc}')` }}
								/>
							</li>
						);
					})}
				</ul>

				{activeIndex !== null && (
					<div
						className="MediaGallery-lightbox"
						onClick={this.handleLightboxClick}
						ref={div => { this.lightbox = div }}
					>
						{closeLink}

						<div className="MediaGallery-lightboxNavAndImage">
							{!isMobile && prevButton}

							{activeItem.type === 'image'
								? (
									<div
										className="MediaGallery-lightboxImage"
										style={{ backgroundImage: `url('${activeItem.src}')` }}
									/>
								)
								: (
									<div
										className="MediaGallery-lightboxVideo"
										dangerouslySetInnerHTML={{ __html: activeItem.embed }}
									/>
								)
							}

							{!isMobile && nextButton}
						</div>

						<div className="MediaGallery-lightboxMobileNavButtons">
							{isMobile && prevButton}
							{isMobile && nextButton}
						</div>

						{/* for proper padding with minimal maintenance */}
						{closeLink}
					</div>
				)}
			</div>
		);
	}
}
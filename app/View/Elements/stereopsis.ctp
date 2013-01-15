<div class="span4 card card-rounded">
    <div class="inner-card">
        <img class="card-rounded card-preview" src="/img/stereopsis-preview.png" alt="Stereopsis preview image"/>

        <div class="description-wrapper">
            <a href="/files/pdfs/CVFinal.pdf" target="_blank">
                <h2 class="about-header no-margin-bottom">Depth by Stereopsis</h2>
                <div class="pagination-centered">
                    (click to view <i class="icon-file"></i>)
                </div>
            </a>

            <p class="description">
                "This paper describes the approach and results of a Matlab program, face_zoom.m, which changes the zoom setting within a Firefox browser based on my distance from the screen. Note that this program uses an already-captured video as its input as opposed to a live stream. To accomplish this task, two Logitech webcams were affixed to the monitor about five inches apart and as coplanar as possible. A 2x2” blue paper square was attached to the user’s forehead to serve as a tracker. The per-frame change in depth of the marker (computed with stereopsis as described later) was used to scale the browser window so as to assure a relatively constant apparent text size. All Matlab code can be found in the appendix at the end of this document."
            </p>
        </div>
    </div>
</div>

<?php if ($webkit) { ?>
    <div class="card-shadow card-rounded"></div>
<?php } ?>
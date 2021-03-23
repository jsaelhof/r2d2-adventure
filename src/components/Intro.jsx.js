import React, { Component } from 'react';

class Intro extends Component {
  /**
   * Renders the intro screen.
   * Aside from the text here, the intro screen is mainly created using CSS 
   * animations and styling. The opening crawl's AnimationEnd event is used
   * to trigger when the intro is complete and should move to the next phase.
   */
  render() {
    return (
        <div className="intro">
            {/* Skip Intro button */}
            <div className="intro-skip" onClick={this.props.onIntroComplete}>Skip Intro</div>

            {/* The "A long time ago..." phase of the intro */}
            <div className="intro-galaxy">
              <img src="/images/galaxy.png" alt=""/>
            </div>

            {/* The "crawl" phase of the intro */}
            <div className="intro-crawl">
              <div className="crawl">  
                <div className="crawl-content" onAnimationEnd={this.props.onIntroComplete}>
                  <div className="crawl-title">
                    <div>Episode I</div>
                    <div>THE AMBYINT CHALLENGE</div>
                  </div>
                  <div>
                    <p>The year is 1977, Star Wars: A New Hope has just been released.</p>
                    <p>The true hero of the film, R2-D2, has acquired Death Star plans and needs to deliver them to Obi Wan Kenobi on the surface of Tatooine to help ensure victory for the rebellion.</p>
                    <p>Upon landing R2-D2 has lost all autonomy and needs your to help guide him safely to Obi Wan Kenobi through manual commands...</p>
                  </div>
                </div>  
              </div>
            </div>
        </div>
    );
  }
}

export default Intro;

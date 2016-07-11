require('normalize.css/normalize.css');
require('styles/App.scss');

var imageDatas = require('../sources/imageDatas.json');

import React from 'react';

(function genImageUrl(imageDataArr) {
	for(var imageData of imageDataArr) {
		imageData.imageUrl = require('../images/' + imageData.fileName);
	}
})(imageDatas)

class AppComponent extends React.Component {
  render() {
    return (
    	<section className="stage">
    		<section className="img-sec"></section>
    		<nav className="controller-nav"></nav>
    	</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

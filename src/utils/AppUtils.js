var imageDatas = require('../sources/imageDatas.json');

import ImgsArrangeCollectionCreator from '../actions/ImgsArrangeCollectionCreator';
	
// 添加图片url信息
(function genImageUrl(imageDataArr) {
	imageDataArr.forEach(function(imageData) {
		imageData.imageUrl = require('../images/' + imageData.fileName);
	});
})(imageDatas);

var AppUtils = {
	initializeImgArrangeArr: function() {
		ImgsArrangeCollectionCreator.setImgArrangeCollection(imageDatas);
	}
}

export default AppUtils;
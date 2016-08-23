import Dispatcher from '../dispatcher/AppDispatcher';

var ImgsArrangeCollectionCreator = {
	inverse: function(index) {
		var action = {
			type: 'img_figure_inverse',
			index: index
		};
		Dispatcher.dispatch(action);
	},
	center: function(index) {
		var action = {
			type: 'img_figure_center',
			index: index
		};
		Dispatcher.dispatch(action);
	},
	setImageConstant: function(constant) {
		var action = {
			type: 'set_img_constant',
			constant: constant
		};
		Dispatcher.dispatch(action);
	},
	setImgArrangeCollection: function(imageDatas) {
		var action = {
			type: 'set_img_arrange_collection',
			imageDatas: imageDatas
		};
		Dispatcher.dispatch(action);
	}
};

export default ImgsArrangeCollectionCreator;
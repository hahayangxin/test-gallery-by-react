import Dispatcher from '../dispatcher/AppDispatcher';
import assign from 'core-js/fn/object/assign';
import events from 'events';
import {getRangeRandom, get30degRandom} from '../utils/ImageArrangeUtils';

// 图片状态信息 { pos: {left: '0', top: '0'}, rotate: 30, isInverse: false, isCenter: false }
var imgArrangeCollection = [];
var constant = {};
var imgDatas = [];

function setImgArrangeCollection(imgDataArr) {
	imgDatas = imgDataArr;
	imgDataArr.forEach(function(value, index) {
		if(!imgArrangeCollection[index])
		imgArrangeCollection[index] = {
			pos: {
				top: '0',
				left: '0'
			},
			rotate: 0,
			isInverse: false,
			isCenter: false
		};
	});
}

/**
* 重新布局所有图片
* @param centerIndex 指定居中排列哪张图片
*/
function rearrange(centerIndex) {
	var centerPos = constant.centerPos;
	var hPosRangeLeftSecX = constant.hPosRange.leftSecX;
	var hPosRangeRightSecX = constant.hPosRange.rightSecX;
	var hPosRangeY = constant.hPosRange.y;
	var vPosRangeTopY = constant.vPosRange.topY;
	var vPosRangeX = constant.vPosRange.x;

	// 中间图片处理
	var imgCenterArr = imgArrangeCollection.splice(centerIndex, 1);
	imgCenterArr[0] = {
	  pos: centerPos,
	  rotate: 0,
	  isCenter: true
	}

	// 上层图片处理
	var imgTopCount = Math.floor(Math.random() * 2);
	var imgTopArrangeIndex = Math.floor(Math.random() * (imgArrangeCollection.length - imgTopCount));
	var imgTopArrangeArr = imgArrangeCollection.splice(imgTopArrangeIndex, imgTopCount);
	imgTopArrangeArr.forEach((value, index) => {
	  imgTopArrangeArr[index] = {
	    pos: {
	      left: getRangeRandom(vPosRangeX[0], vPosRangeX[1]),
	      top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1])
	    },
	    rotate: get30degRandom(),
	    isCenter: false
	  }
	});

	// 两侧图片排列
	for(var i = 0, j = imgArrangeCollection.length, k = j / 2; i < j; i++) {
	  var hPosRangeLOR;
	  if(i < k) {
	    // 图片放置左侧排列
	    hPosRangeLOR = hPosRangeLeftSecX;
	  } else {
	    // 图片放置右侧排列
	    hPosRangeLOR = hPosRangeRightSecX;
	  }
	  imgArrangeCollection[i] = {
	    pos: {
	      left: getRangeRandom(hPosRangeLOR[0], hPosRangeLOR[1]),
	      top: getRangeRandom(hPosRangeY[0], hPosRangeY[1])
	    },
	    rotate: get30degRandom(),
	    isCenter: false
	  };
	}

	if(imgTopArrangeArr && imgTopArrangeArr[0]) {
	  imgArrangeCollection.splice(imgTopArrangeIndex, 0, imgTopArrangeArr[0]);
	}

	imgArrangeCollection.splice(centerIndex, 0, imgCenterArr[0]);
}

/**
* 翻转图片
* @param  index 翻转的图片对应的图片信息
* @return {Function}
*/
function inverse(index) {
	imgArrangeCollection[index].isInverse = !imgArrangeCollection[index].isInverse;
}

/**
* 居中图片
* @param  index 居中的图片对应的图片信息
* @return {Function}
*/
function center(index) {
	rearrange(index);
}

// 设置图片区间位置
function setImageConstant(imageConstant) {
	constant = imageConstant;
	rearrange(0);
}

function emitChange() {
	ImgArrangeCollectionStore.emit('change');
}

var ImgArrangeCollectionStore = assign({}, events.EventEmitter.prototype, {
	addChangeListener: function(cb) {
		this.on('change', cb);
	},
	removeChangeListener: function(cb) {
		this.removeListener('change', cb);
	},
	getImgArrangeCollection: function() {
		return imgArrangeCollection;
	},
	getImgDatas: function() {
		return imgDatas;
	}
});

function handleAction(action) {
	switch(action.type) {
		case 'img_figure_inverse':
			inverse(action.index);
			emitChange();
			break;
		case 'img_figure_center':
			center(action.index);
			emitChange();
			break;
		case 'set_img_constant':
			setImageConstant(action.constant);
			emitChange();
			break;
		case 'set_img_arrange_collection':
			setImgArrangeCollection(action.imageDatas);
			emitChange();
			break;
		default:
			break;
	}
}

ImgArrangeCollectionStore.dispatchToken = Dispatcher.register(handleAction);

export default ImgArrangeCollectionStore;
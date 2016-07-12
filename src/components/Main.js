require('normalize.css/normalize.css');
require('styles/App.scss');

var imageDatas = require('../sources/imageDatas.json');

import React from 'react';
import ReactDOM from 'react-dom';

(function genImageUrl(imageDataArr) {
	for(var imageData of imageDataArr) {
		imageData.imageUrl = require('../images/' + imageData.fileName);
	}
})(imageDatas);

function getRangeRandom(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

class ImgFigure extends React.Component {
  render() {
    var styleObj = {};
    if(this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    return (
      <figure className="img-figure" style={styleObj}>
        <img src={this.props.data.imageUrl} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
}

class AppComponent extends React.Component {
  constructor() {
    super();
    //用来保存图片状态信息
    this.state = {
      imgsArrangeArr: [
        /*{
          pos: {
            left: '0';
            top: '0'
          }
        }*/
      ]
    };
    this.constant = {
      centerPos: {
        left: 0,
        top: 0
      },
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    };
  }

  /**
   * 重新布局所有图片
   * @param centerIndex 指定居中排列哪张图片
   */
  rearrange(centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr;
    var centerPos = this.constant.centerPos;
    var hPosRangeLeftSecX = this.constant.hPosRange.leftSecX;
    var hPosRangeRightSecX = this.constant.hPosRange.rightSecX;
    var hPosRangeY = this.constant.hPosRange.y;
    var vPosRangeTopY = this.constant.vPosRange.topY;
    var vPosRangeX = this.constant.vPosRange.x;

    // 中间图片处理
    var imgCenterArr = imgsArrangeArr.splice(centerIndex, 1);
    imgCenterArr[0].pos.left = centerPos.left;
    imgCenterArr[0].pos.top = centerPos.top;

    // 上层图片处理
    var imgTopCount = Math.floor(Math.random() * 2);
    var imgTopArrangeIndex = Math.floor(Math.random() * (imgsArrangeArr.length - imgTopCount));
    var imgTopArrangeArr = imgsArrangeArr.splice(imgTopArrangeIndex, imgTopCount);
    imgTopArrangeArr.forEach((value, index) => {
      imgTopArrangeArr[index].pos = {
        left: getRangeRandom(vPosRangeX[0], vPosRangeX[1]),
        top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1])
      }
    });

    // 两侧图片排列
    for(var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      var hPosRangeLOR;
      if(i < k) {
        // 图片放置左侧排列
        var hPosRangeLOR = hPosRangeLeftSecX;
        imgsArrangeArr[i].pos = {
          left: getRangeRandom(hPosRangeLOR[0], hPosRangeLOR[1]),
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1])
        };
      } else {
        // 图片放置右侧排列
        var hPosRangeLOR = hPosRangeRightSecX;
        imgsArrangeArr[i].pos = {
          left: getRangeRandom(hPosRangeLOR[0], hPosRangeLOR[1]),
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1])
        };
      }
    }
    imgsArrangeArr.splice(centerIndex, 0, imgCenterArr[0]);
    if(imgTopArrangeArr && imgTopArrangeArr[0]) {
      imgsArrangeArr.splice(imgTopArrangeIndex, 0, imgTopArrangeArr[0]);
    }
    this.setState({
      imgArrangeArr: imgsArrangeArr
    });
  }

  componentDidMount() {
    var stage = ReactDOM.findDOMNode(this.refs.stage);
    var stageW = stage.scrollWidth;
    var stageH = stage.scrollHeight;
    var halfStageW = Math.ceil(stageW / 2);
    var halfStageH = Math.ceil(stageH / 2);

    var imgFigure = ReactDOM.findDOMNode(this.refs.imgFigure0);
    var imgFigureW = imgFigure.scrollWidth;
    var imgFigureH = imgFigure.scrollHeight;
    var halfImgFigureW = Math.ceil(imgFigureW / 2);
    var halfImgFigureH = Math.ceil(imgFigureH / 2);

    this.constant.centerPos.left = halfStageW - halfImgFigureW;
    this.constant.centerPos.top = halfStageH - halfImgFigureH;

    this.constant.hPosRange.leftSecX[0] = -halfImgFigureW;
    this.constant.hPosRange.leftSecX[1] = halfStageW - halfImgFigureW * 3;
    this.constant.hPosRange.rightSecX[0] = halfImgFigureW + halfStageW;
    this.constant.hPosRange.rightSecX[1] = stageW - halfImgFigureW;
    this.constant.hPosRange.y[0] = -halfImgFigureH;
    this.constant.hPosRange.y[1] = stageH - halfImgFigureH;

    this.constant.vPosRange.x[0] = halfStageW - imgFigureW;
    this.constant.vPosRange.x[1] = halfStageW;
    this.constant.vPosRange.topY[0] = -halfImgFigureH;
    this.constant.vPosRange.topY[1] = halfStageH - halfImgFigureH * 3;

    this.rearrange(0);
  }

  render() {
    var imgFigures = [],
        controllersUnit = [];

    imageDatas.forEach((value, index) => {
      if(!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            top: '0',
            left: '0'
          }
        };
      }
      imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]}/>);
    });

    return (
    	<section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllersUnit}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

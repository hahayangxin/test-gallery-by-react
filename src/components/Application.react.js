require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import ControllerUnit from './ControllerUnit.react';
import ImgFigure from './ImgFigure.react';
import ImgsArrangeCollectionStore from '../stores/ImgsArrangeCollectionStore';
import ImgsArrangeCollectionCreator from '../actions/ImgsArrangeCollectionCreator';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = { imgsArrangeArr: ImgsArrangeCollectionStore.getImgArrangeCollection() };
  }

  componentDidMount() {
    // 订阅 emitChange事件
    ImgsArrangeCollectionStore.addChangeListener(this.onCollectionChange.bind(this));

    // 获取DOM节点并计算舞台的宽高
    var stage = ReactDOM.findDOMNode(this.refs.stage);
    var stageW = stage.scrollWidth;
    var stageH = stage.scrollHeight;
    var halfStageW = Math.ceil(stageW / 2);
    var halfStageH = Math.ceil(stageH / 2);

    // 获取Image节点并计算宽高
    var imgFigure = ReactDOM.findDOMNode(this.refs.imgFigure0);
    var imgFigureW = imgFigure.scrollWidth;
    var imgFigureH = imgFigure.scrollHeight;
    var halfImgFigureW = Math.ceil(imgFigureW / 2);
    var halfImgFigureH = Math.ceil(imgFigureH / 2);
    var constant = {
      centerPos: {left: 0, top: 0},
      hPosRange: {leftSecX: [0, 0], rightSecX: [0, 0], y: [0, 0]},
      vPosRange: {x: [0, 0], topY: [0, 0]}
    };
    // 中心图片对应的x y坐标
    constant.centerPos.left = halfStageW - halfImgFigureW;
    constant.centerPos.top = halfStageH - halfImgFigureH;

    // 两侧图片对应的x、y轴区间
    constant.hPosRange.leftSecX[0] = -halfImgFigureW;
    constant.hPosRange.leftSecX[1] = halfStageW - halfImgFigureW * 3;
    constant.hPosRange.rightSecX[0] = halfImgFigureW + halfStageW;
    constant.hPosRange.rightSecX[1] = stageW - halfImgFigureW;
    constant.hPosRange.y[0] = -halfImgFigureH;
    constant.hPosRange.y[1] = stageH - halfImgFigureH;

    // 上侧图片对应的x、y轴区间
    constant.vPosRange.x[0] = halfStageW - imgFigureW;
    constant.vPosRange.x[1] = halfStageW;
    constant.vPosRange.topY[0] = -halfImgFigureH;
    constant.vPosRange.topY[1] = halfStageH - halfImgFigureH * 3;

    ImgsArrangeCollectionCreator.setImageConstant(constant);
  }

  componentWillUnmount() {
    ImgsArrangeCollectionStore.removeChangeListener(this.onCollectionChange.bind(this));
  }

  onCollectionChange() {
    this.setState({
      imgsArrangeArr: ImgsArrangeCollectionStore.getImgArrangeCollection()
    });
  }

  onInverse(index) {
    return function() {
      ImgsArrangeCollectionCreator.inverse(index);
    };
  }

  onCenter(index) {
    return function() {
      ImgsArrangeCollectionCreator.center(index);
    };
  }

  getImgFigureElement(imageData, index) {
    return (
      <ImgFigure key={index} data={imageData} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.onInverse(index)} center={this.onCenter(index)} />
    );
  }

  getControllerUnitElement(imageData, index) {
    return (
      <ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.onInverse(index)} center={this.onCenter(index)} />
    );
  }

  render() {
    var imageDatas = ImgsArrangeCollectionStore.getImgDatas();
    var imgFigureElements = imageDatas.map(this.getImgFigureElement.bind(this));
    var controllerUnitElements = imageDatas.map(this.getControllerUnitElement.bind(this));

    return (
    	<section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigureElements}
        </section>
        <nav className="controller-nav">
          {controllerUnitElements}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
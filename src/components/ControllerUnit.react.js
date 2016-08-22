require('styles/ControllerUnit.scss');

import React from 'react';

class ControllerUnit extends React.Component {
  handleClick(e) {
  	e.stopPropagation();

    //如果图片是居中态，翻转；否则居中
    if(this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }

  }

  render() {
    var controllerUtilClassName = 'controller-unit';

    // 图片是否居中
    if(this.props.arrange.isCenter) {
      controllerUtilClassName += ' is-center';
      // 图片是否翻转
      if(this.props.arrange.isInverse) {
        controllerUtilClassName += ' is-inverse';
      }
    }

    return (
      <span className={controllerUtilClassName} onClick={this.handleClick.bind(this)}></span>
    );
  }
}

export default ControllerUnit;
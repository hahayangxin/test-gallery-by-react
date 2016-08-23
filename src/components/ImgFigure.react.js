require('styles/ImgFigure.scss');

import React from 'react';

class ImgFigure extends React.Component {
	// 处理图片点击事件
  handleClick(e) {
    e.stopPropagation();
    
    if(this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }
  }

  render() {
    var styleObj = {};
    
    // 是否存在图片定位信息
    if(this.props.arrange.pos) {
      Object.assign(styleObj, this.props.arrange.pos);
    }

    // 是否存在图片旋转信息
    if(this.props.arrange.rotate) {
      ['MozTransform', 'WebkitTransform', 'msTransform', 'transform'].forEach((value) => {
        styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      })
    }

    // 判断图片是否居中
    if(this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }

    var imgFigureClassName = 'img-figure';
    imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
        <img src={this.props.data.imageUrl} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick.bind(this)}>
            <p>{this.props.data.desc}</p>
          </div>
        </figcaption>
      </figure>
    )
  }
}

export default ImgFigure;


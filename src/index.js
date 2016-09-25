import React, { Component, PropTypes } from 'react';

import TileLogic from 'tilelogic';

class Tilemap extends Component {
  static propTypes = {
    tileSizeWidth: PropTypes.number,
    tileSizeHeight: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    tiles: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    onRenderTile: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
  }

  static defaultProps = {
    tileSizeWidth: 80,
    tileSizeHeight: 80,
    width: 10,
    height: 10,
    className: '',
    style: {},
  }

  constructor(props) {
    super(props);

    this.tileLogic = new TileLogic(props.width, props.height, props.tiles);
  }

  componentWillReceiveProps(nextProps) {
    this.tileLogic = new TileLogic(nextProps.width, nextProps.height, nextProps.tiles);
  }

  render() {
    const tiles = this.tileLogic.map((x, y, type) => {
      const tileStyle = {
        width: this.props.tileSizeWidth,
        height: this.props.tileSizeHeight,
      };

      const tile = this.props.onRenderTile ? this.props.onRenderTile(x, y, type) : null;

      return (
        <div className="tile" style={tileStyle}>{tile}</div>
      );
    });

    const className = this.props.className;

    return (
      <div className={className} style={this.props.style}>{tiles}</div>
    );
  }
}

export default Tilemap;

/*
 * Copyright 2018 WICKLETS LLC
 *
 * This file is part of Wick Editor.
 *
 * Wick Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Wick Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Wick Editor.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react';

import './_canvas.scss';

class Canvas extends Component {
  constructor (props) {
    super(props);
    this.wickCanvas = null;
  }

  componentDidMount() {
    this.wickCanvas = new window.WickCanvas();
    window.WickCanvas.setup(this.refs.container);
    window.WickCanvas.resize();
    this.wickCanvas.render(this.props.project);

    let self = this;
    window.paper.drawingTools.cursor.onSelectionChanged(e => {

    });
    window.paper.drawingTools.onCanvasModified(e => {
      self.wickCanvas.applyChanges(self.props.project, e.layers);
    });
    window.paper.drawingTools[this.props.activeTool].activate();
  }

  componentDidUpdate () {
    this.wickCanvas.render(this.props.project);

    let tool = window.paper.drawingTools[this.props.activeTool]
    tool.activate();
    Object.keys(this.props.toolSettings).forEach(key => {
      tool[key] = this.props.toolSettings[key];
    });
  }

  render() {
    return (
      <div id="wick-canvas-container" ref="container"></div>
    );
  }
}

export default Canvas

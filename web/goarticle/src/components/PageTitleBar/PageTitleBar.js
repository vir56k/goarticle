import React, { Component } from 'react';
import './PageTitleBar.css';


class PageTitleBar extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="page_title_bar">
        <span className="page_title">{this.props.t_title}</span>
      </div>
    );
  }
}

export default PageTitleBar;

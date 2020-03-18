import React, { Component } from 'react';
import './Dashboard.css';
import service from './Service.js'
import ShortcutView from '../shortcut/ShortcutView'


class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div className="welcome1" >Welcome You.</div>
        <ShortcutView></ShortcutView>

      </div>
    );
  }
}

export default Dashboard;

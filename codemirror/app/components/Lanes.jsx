import React from 'react';
import Lane from './Lane.jsx';

export default class Lanes extends React.Component {
  constructor(props) {
    super(props);

    this.renderLane = this.renderLane.bind(this);
  }
  render() {
    const {lanes} = this.props;

    return <div className='lanes'>{lanes.map(this.renderLane)}</div>;
  }
  renderLane(lane) {
    const {notes, laneActions, noteActions} = this.props;

    return <Lane className='lane' key={`lane${lane.id}`}
      allNotes={notes} laneActions={laneActions} noteActions={noteActions}
      {...lane} />;
  }
}

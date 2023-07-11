import React, { Component } from 'react'
import { ClockSliceState, updateTime } from '../../store/clocksSlice';
import { connect } from 'react-redux'
import './Header.css'

interface Props extends ClockSliceState {
    updateTime: () => void
}

class Clock extends Component<Props> {
    intervalId: NodeJS.Timer | undefined;

    componentDidMount(): void {
        this.intervalId = setInterval(() => {
            this.props.updateTime()
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {
        return (
            <div className='clock-wrapper'>
                <p className='clock-time'>{this.props.timeNow}</p>
            </div>
        )
    }
}

const mapStateToProps = (state: {clock: ClockSliceState}) => (
    { timeNow: state.clock.timeNow }
)

export default connect(mapStateToProps, { updateTime })(Clock)
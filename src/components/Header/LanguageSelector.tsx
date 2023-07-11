import React, { Component } from 'react'
import { LanguageSlice, LanguageTypes, updateLangugae } from '../../store/langugaeSlice'
import { connect } from 'react-redux'
import './Header.css'

interface Props extends LanguageSlice {
    updateLangugae: (newLang: LanguageTypes) => void,
}

interface State {
    active: boolean,
    allLngs: Array<LanguageTypes>
}

class LanguageSelector extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            active: false,
            allLngs: ['en', 'ru']
        }
    }

    toggleList = () => {
        this.setState(prevState => ({
            active: !prevState.active
        }))
    }

    selectItem = (newLang: LanguageTypes) => {
        this.props.updateLangugae(newLang)
        this.setState(() => ({ active: false }))
    }

    render() {
        const { active } = this.state

        return (
            <div className='lng-selector'>
                <button type="button" className="lng-title" onClick={this.toggleList}>
                    {this.props.language.toUpperCase()}
                </button>

                {active && (
                    <div className='lng-list'>
                        {this.state.allLngs.map((lngItem, index) => (
                            <button
                                onClick={() => this.selectItem(lngItem)}
                                className='lng-list-item'
                                type="button"
                                key={index}
                            >
                                {lngItem}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state: {language: LanguageSlice}) => {
    return {
        language: state.language.language,
    }
}

export default connect(mapStateToProps, { updateLangugae })(LanguageSelector)
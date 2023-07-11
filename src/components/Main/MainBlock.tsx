import React, { Component } from 'react'
import { LanguageSlice, LanguageTypes } from '../../store/langugaeSlice'
import { connect } from 'react-redux'
import reviewData from '../../assets/data.json'
import Pagination from './Pagination'
import "./Main.css"

interface SortedReviews { [key: string]: ReviewType }
interface Props { language: LanguageTypes }
type FormatNameType = { name: string, surname: string } | string

type ReviewType = {
    name: string,
    review: string,
    date: string
}
interface ClusterReturnType {
    maxPage: number,
    dataArray: SortedReviews[]
}

class MainBlock extends Component<Props, any> {
    constructor(props: Props) {
        super(props)
        this.state = {
            sortedReviews: [],
            currentPage: 1,
            maxPage: -1
        }
    }

    componentDidMount(): void {
        const { maxPage, dataArray } = this.makeClusters()
        this.setState(() => ({
            sortedReviews: [...dataArray],
            maxPage: maxPage
        }))
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>, snapshot?: any): void {
        if ((this.state.maxPage <= 0 || this.state.sortedReviews.length > 0) && this.props.language === prevProps.language) {
            return
        }
        else {
            const { maxPage, dataArray } = this.makeClusters()
            this.setState(() => ({
                sortedReviews: [...dataArray],
                maxPage: maxPage,
            }))
        }
    }

    handleChangePage = (newPage: number) => {
        this.setState(() => ({ currentPage: newPage }))
    }

    makeClusters(): ClusterReturnType {
        const activeReviews = reviewData[this.props.language]
        const values = Object.values(activeReviews)
        const final: SortedReviews[] = []

        const dataLength = Object.keys(reviewData[this.props.language]).length
        const maxPage = Math.ceil(dataLength / 10)

        let counter = 0
        var portion: any = {}

        for (let key in activeReviews) {
            if (counter !== 0 && counter % 10 === 0) {
                final.push(portion);
                portion = {};
            }
            portion[key] = values[counter];
            counter++
        }
        final.push(portion)
    
        return {
            maxPage: maxPage,
            dataArray: final
        }
    }

    render() {
        const dataByLng = reviewData[this.props.language]
        const formatName = (fullName: string): FormatNameType => {
            if (!fullName.includes(" ")) return fullName

            const name = fullName.split(" ")[1].slice(0, 1) + "."
            const surname = fullName.split(" ")[0]
            return { name, surname }
        }

        return (
            <main className='review'>
                <h1 className='review-title'>Отзывы</h1>
                
                <section>
                    {this.state.sortedReviews.length > 0 && Object.keys(this.state.sortedReviews[this.state.currentPage - 1]).map((reviewKey) => {
                        type DataKeyType = keyof typeof dataByLng
                        const reviewItem: ReviewType = this.state.sortedReviews[this.state.currentPage - 1][reviewKey as DataKeyType]
                        const formattedName = formatName(reviewItem.name)

                        return (
                            <div className='review-item'>
                                {/* <p className='review-item-name'>{name + " " + surname}</p> */}
                                <p className='review-item-name'>
                                    {typeof formattedName === 'string' ? formattedName : formattedName.surname + " " + formattedName.name}
                                </p>
                                <p className='review-item-text'>{reviewItem.review}</p>
                                <p className='review-item-date'>{reviewItem.date}</p>
                            </div>
                        )
                    })}
                </section>

                {this.state.maxPage > 0 ? (
                    <Pagination
                        handleChangePage={this.handleChangePage}
                        currentPage={this.state.currentPage}
                        language={this.props.language}
                        maxPage={this.state.maxPage}
                    />
                ): null}
            </main>
        )
    }
}

const mapStateToProps = (state: {language: LanguageSlice}) => {
    return {
        language: state.language.language,
    }
}

export default connect(mapStateToProps)(MainBlock)
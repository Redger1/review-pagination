import React, { Component } from 'react'
import { LanguageTypes } from '../../store/langugaeSlice';
import './Main.css'

interface Props {
    maxPage: number,
    currentPage: number,
    handleChangePage: (newPage: number) => void,
    language: LanguageTypes
}

const DOTS = '...';

export default class Pagination extends Component<Props, {paginationArray: any[]}> {
    constructor(props: Props) {
        super(props)
        this.state = {
            paginationArray: []
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.language !== this.props.language) {
            this.props.handleChangePage(1)
        }

        if (this.state.paginationArray.length === 0 || prevProps.currentPage !== this.props.currentPage || prevProps.maxPage !== this.props.maxPage) {
            const newPagArr = this.formPagination()

            if (newPagArr) {
                this.setState(() => ({
                    paginationArray: [...newPagArr]
                }))
            }
        }
    }

    range = (start: number, end: number) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
    }

    formPagination() {
        // visiblePagItemsCount = первая + текущая + последняя + 2 точки
        const visiblePagItemsCount = 5
        const { maxPage, currentPage } = this.props

        if (visiblePagItemsCount >= this.props.maxPage) {
            return this.range(1, this.props.maxPage);
        }

        const shouldShowLeftDots = currentPage > 2;
        const shouldShowRightDots = currentPage < maxPage - 2;

        const firstPageIndex = 1;
        const lastPageIndex = maxPage;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3
            let leftRange = this.range(1, leftItemCount)

            return [...leftRange, DOTS, maxPage];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3
            let rightRange = this.range(
                maxPage - rightItemCount + 1,
                maxPage
            )
            return [firstPageIndex, DOTS, ...rightRange]
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            return [firstPageIndex, DOTS, currentPage, DOTS, lastPageIndex];
        }
        
        return null
    }

    render() {
        const { handleChangePage } = this.props
        const { paginationArray } = this.state

        const prevPage = () => {
            const { currentPage } = this.props
            if (currentPage > 1) {
                this.props.handleChangePage(currentPage - 1)
            }
        }

        const nextPage = () => {
            const { currentPage, maxPage } = this.props
            if (currentPage < maxPage) {
                handleChangePage(currentPage + 1)
            }
        }

        return (
            <ul className='pag-container'>
                <li onClick={prevPage} className='pagination-item'>
                    <div className='arrow left'/>
                </li>
                {paginationArray.length > 0 &&
                    paginationArray.map((pageNumber, index) => {
                        if (pageNumber === DOTS) {
                            return <li key={index} className="pagination-item dots">&#8230;</li>;
                        }
                
                        return (
                            <li
                                key={index}
                                className={`pagination-item ${this.props.currentPage === pageNumber ? "pagination-active" : null}`}
                                onClick={() => handleChangePage(pageNumber)}
                            >
                                {pageNumber}
                            </li>
                        );
                    })
                }
                <li onClick={nextPage} className='pagination-item'>
                    <div className='arrow right'/>
                </li>
            </ul>
        )
    }
}

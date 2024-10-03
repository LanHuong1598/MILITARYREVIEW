import React from 'react'
import 'assets/css/news.css';
// ** International
import { FormattedMessage } from 'react-intl'

export default function ContentLabel({ tittle }) {
    return (
        <h4 className="tittleContentLabel">
            <span className="contentLabel">{<FormattedMessage id={tittle} />}</span>
        </h4>
    )
}

import React from 'react';
import { Container } from 'reactstrap';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import '../../assets/css/custom.css'
import { useHistory } from 'react-router-dom';
import { noAuto } from '@fortawesome/fontawesome-svg-core';
import { useState } from 'react';
export default function MegaSearch() {
    const history = useHistory();
    // React.useEffect(() => {
    //     document.querySelector(".sc-bxivhb.frjscc>input").placeholder = "Search...";
    // });
    const [search, setSearch] = useState()
    const items = [
        {
            id: 0,
            name: 'Cobol'
        },
        {
            id: 1,
            name: 'JavaScript'
        },
        {
            id: 2,
            name: 'Basic'
        },
        {
            id: 3,
            name: 'PHP'
        },
        {
            id: 4,
            name: 'Java'
        }
    ]
    const handleOnSearch = (e) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        // history.push({ pathname:`/news/all/${string}`})
        console.log(e.key)
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
        // History.push('/news/others')
    }

    const handleOnFocus = () => {
        console.log('Focuseddd')


    }
    //set click outside
    // const concernedElement = document.querySelector(".search-menu");

    // document.addEventListener("mousedown", (event) => {
    //     if (concernedElement.contains(event.target)) {
    //         console.log("Clicked Inside");
    //     } else {
    //         console.log("Clicked Outside / Elsewhere");
    //     }
    // });
    return (
        <div className="d-block">
            <div className="search-menu">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottomStyle: 'solid', borderBottomWidth: '1px' }}>
                    <div onClick={() => history.push({ pathname: `/news/all/${search}` })}>
                        <svg class="sc-bdVaJa eOPJCx search-icon" width="20" height="20" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                    </div>
                    <input placeholder="Search..." onKeyDown={(e, value) => {
                        if (e.key === 'Enter') history.push({ pathname: `/news/all/${search}` });
                    }}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: '100%', minHeight: '44px', border: 'none' }} className='search-input' />

                </div>
            </div>
        </div>
    )
}

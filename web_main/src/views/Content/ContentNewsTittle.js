import React, { useState } from 'react';
import '../../assets/css/news.css';
export default function ContentNewsTittle() {
    // const tittle = ['All', 'Achievements', 'Alumni', 'Announcements', 'Education', 'Giving', 'Partnerships', 'Research'];
    // const [news, setNews] = useState(false);
    // const toggleNews = () => setNews(!news);
    const tittle = [
        {
            name: "1",
            value: "All"
        },
        {
            name: "2",
            value: "Achievements"
        },
        {
            name: "3",
            value: "Alumni"
        },
        {
            name: "4",
            value: "Announcements"
        },
        {
            name: "5",
            value: "Education"
        },
        {
            name: "6",
            value: "Giving"
        },
        {
            name: "7",
            value: "Partnerships"
        },
        {
            name: "8",
            value: "Research"
        }
    ];
    const [activeButton, setActiveButton] = useState(tittle[0].name);
    const handleClick = e => {
        const name = e.target.name;
        setActiveButton(name);
    };
    return (
        <div className="news-feed__filters">
            <ul>
                {tittle.map((item) => {
                    const className = activeButton === item.name ? "activeTittle" : "";
                    return (
                        <li key={item.value}>
                            <a className={`btn btn--pill btn--stroke ${className}`}
                                name={item.name}
                                value={item.value}
                                onClick={handleClick}>{item.value}</a>
                        </li>
                    );
                })}

            </ul>
        </div>
    )
}

import React from "react";

const News = ({data, country}) => {

    return (
        <div className="news">
            <div className="news-title">Top news for {country}</div>
            {
                data.length != 0
                ?
                data.map((article, id) => (
                    <a href={article.url} key={id}>
                        <div className="article">
                            <div className="content">
                                <div className="author">{article.source.name}</div>
                                <div className="title">{article.title}</div>
                                <div className="date">{article.publishedAt}</div>
                            </div>
                            <img src={article.urlToImage} alt=""/>
                        </div>
                    </a>
                ))
                :
                <div className="no-news">No news found....</div>
            }
        </div>
    )
}

export default News;
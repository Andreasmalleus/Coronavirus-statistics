import React from "react";

const News = ({data, country}) => {
    return (
        <div className="news">
            <div className="news-title">Top news for {country}</div>
            {
                data != null ?
                data.map((article, id) => (
                    <a href={article.url} key={id}>
                        <div className="article">
                            <div className="content">
                                <div className="author">author</div>
                                <div className="title">{article.title}</div>
                                <div className="date">{article.publishedAt}</div>
                            </div>
                            <img src={article.urlToImage} alt=""/>
                        </div>
                    </a>
                ))
                :
                <div>No news found</div>
            }
        </div>
    )
}

export default News;
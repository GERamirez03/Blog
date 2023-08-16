import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { getTitlesFromAPI, sendVoteToAPI } from "./actionCreators";

function TitleList() {

    const titles = useSelector(store => store.titles);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTitlesFromAPI())
    }, [dispatch]);

    const upVote = id => dispatch(sendVoteToAPI(id, "up"));
    const downVote = id => dispatch(sendVoteToAPI(id, "down"));

    function compareVotes(a, b) {
        if (a.votes < b.votes) return +1;
        if (a.votes > b.votes) return -1;
        return 0;
    }

    let sortedTitles = titles.toSorted(compareVotes);

    return (
        <section>
            <big>Blog Posts</big>
            {sortedTitles.map(post => {
                const { id, title, description, votes } = post;
                return (
                    <div key={id}>
                        <Link to={`/${id}`}>{ title }</Link>
                        <p><i>{ description }</i></p>
                        <small>{ votes } votes</small><button onClick={() => upVote(id)}> + </button><button onClick={() => downVote(id)}> - </button>
                    </div>
                );
            })}
        </section>
    );
}

export default TitleList;
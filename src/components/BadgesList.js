import React from 'react';
import { Link } from 'react-router-dom';

import twitter_logo from "../images/twitter-logo.png";
import Gravatar from './Gravatar';

import"../components/styles/BadgesList.css";

class BadgesListItem extends React.Component {
    render() {
      return (
            <div className="BadgesListItem">
                <Gravatar className="Badge__avatar-list" email={this.props.badge.email} />
                <div>
                    {this.props.badge.firstName} {this.props.badge.lastName}
                    <br />
                    {this.props.badge.jobTitle}
                    <br />
                    <img src={twitter_logo} className='twitter_logo' alt="Twitter Logo"/>
                    <span className='twitter__blue_font'>{this.props.badge.twitter}</span>
                </div>
            </div>
        );
    }
}

function useSearchBadges(badges){
    const [ query, setQuery ] = React.useState('');
    const [ filteredBadges, setFilteredBadges ] = React.useState(badges);
    React.useMemo(
        ()=>{
            const result = badges.filter( (badge) => {
                return `${badge.firstName} ${badge.lastName}`.toLowerCase().includes(query.toLowerCase());
            });
            setFilteredBadges(result)
        }, [badges, query]
    );
    return { query, setQuery, filteredBadges };
}

function BadgesList(props){
    const badges = props.badges;
    const { query, setQuery, filteredBadges } = useSearchBadges(badges);
    

    if(filteredBadges.length===0){
        return (
            <div>
                <div className="form-group">
                    <label>Filter Badges</label>
                    <input type="text" className="form-control" value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder="filter by name and/or last name"/>
                </div>
                <h3>No badges were found</h3>
                <Link className="btn btn-primary" to="/badges/new" >
                    Create new badge
                </Link>
            </div>
        );
    }
    return(
        <div className="BadgesList">
            <div className="form-group">
                <label>Filter Badges</label>
                <input type="text" className="form-control" value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder="filter by name and/or last name"/>
            </div>
            <ul className="list-unstyled">
                {filteredBadges.map((badge)=>{
                    return(
                        <li key={badge.id} className='Badge__section-name-list'>
                            <Link className="text-reset text-decoration-none" to={`/badges/${badge.id}`}>
                                <BadgesListItem badge={badge}/>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default BadgesList;

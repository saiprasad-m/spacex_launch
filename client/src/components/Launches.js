import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const PLAUNCHES_QUERY = gql`
    query LaunchesQuery($limit: Int!, $offset: Int!) {
        partLaunches(limit: $limit, offset: $offset) {
            flight_number
            mission_name
            launch_date_local
            launch_success
            upcoming
            tbd
        }
    }
`

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
            upcoming
            tbd
        }
    }
`

export const LINKS_PER_PAGE = 4


export class Launches extends Component {
  
  _getQueryVariables = () => {
    const isNewPage = this.props.location.pathname.includes('launches')
    const page = parseInt(this.props.match.params.page, 10)
  
    const offset = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
    const limit = isNewPage ? LINKS_PER_PAGE : 100

    return { limit, offset }
  }
  
  _getLinksToRender = data => {
    const isNewPage = this.props.location.pathname.includes('launches')
    this._getQueryVariables()
    if (isNewPage) {
      return data.partLaunches
    }
  }

  _nextPage = (data, totalCount) => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page < totalCount / LINKS_PER_PAGE) {
      const nextPage = page + 1
      this.props.history.push(`/launches/${nextPage}`)
    }
  }
  
  _previousPage = () => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page > 1) {
      const previousPage = page - 1
      this.props.history.push(`/launches/${previousPage}`)
    }
  }

  render() {
    
      let totalCount = 0;
      let pages = 0;
      
    return (

      <Fragment>
        <h4 className="display-6 my-1">Launches</h4>
        <MissionKey/>
        <Query query={LAUNCHES_QUERY} >
        {
          ({ loading, error, data, subscribeToMore }) => {
            if(loading) return <h5>Loading ...</h5>
            if(error) { console.log(error); return <h5>Not connection, try later</h5>; }
            totalCount = data.launches.length;
            return null;
          }
        }
        </Query>
        <Query query={PLAUNCHES_QUERY}  variables={this._getQueryVariables()}>
        {
          ({ loading, error, data, subscribeToMore }) => {
            if(loading) return <h5>Loading ...</h5>
            if(error) { console.log(error); return <h5>Not connection, try later</h5>; }
            const linksToRender = this._getLinksToRender(data)
            const isNewPage = this.props.location.pathname.includes('launches');
            let pages = totalCount / LINKS_PER_PAGE;
            if (pages ===0) pages =1 ;
            let link=`/launches/${pages}`;
            let linkList = []
 
            for(var i=1; i<pages; i++) {
              link = `/launches/${i}`
              linkList.push( 
                <Link style={linkStyle} to={link}>{' '} {i} {' '} </Link>
                )
            }   
            
            return <Fragment>
              {
                linksToRender.map(launch => (
                  <LaunchItem key={launch.flight_number} launch={launch} />
                ))
              }
              { isNewPage && (
              <div className="flex ml2 mv1 gray">
                <div className="pointer mr2" onClick={this._previousPage}>
                  Previous
                </div>
                <div className="pointer" onClick={() => this._nextPage(data, totalCount)}>
                  Next
                </div> 
              </div>
            )}
            {
             linkList.map( (link) => {
              return link;
            })
            }
            </Fragment> 
          }
        }
        </Query>
      </Fragment>
    )
  }
}

const linkStyle = {
  color: '#fff',
  textDecoration : 'none',
  padding: '5px'
}

export default Launches

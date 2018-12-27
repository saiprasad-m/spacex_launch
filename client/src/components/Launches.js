import React, { Component, Fragment } from 'react'
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
    if (page <= totalCount / LINKS_PER_PAGE) {
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
      
    return (

      <Fragment>
        <h4 className="display-6 my-1">Launches</h4>
        <MissionKey/>
        <Query query={LAUNCHES_QUERY} >
        {
          ({ loading, error, data, subscribeToMore }) => {
            if(loading) return <h5>Loading ...</h5>
            if(error) console.log(error)
            console.log('LAUNCHES', data)
            totalCount = data.launches.length;
            return null;
          }
        }
        </Query>
        <Query query={PLAUNCHES_QUERY}  variables={this._getQueryVariables()}>
        {
          ({ loading, error, data, subscribeToMore }) => {
            if(loading) return <h5>Loading ...</h5>
            if(error) console.log(error)
            const linksToRender = this._getLinksToRender(data)
            const isNewPage = this.props.location.pathname.includes('launches')
            const pageIndex = this.props.match.params.page
              ? (this.props.match.params.page - 1) * LINKS_PER_PAGE
              : 0

            return <Fragment>
              {
                linksToRender.map(launch => (
                  <LaunchItem key={launch.flight_number} launch={launch} />
                ))
              }
              {isNewPage && (
              <div className="flex ml4 mv3 gray">
                <div className="pointer mr2" onClick={this._previousPage}>
                  Previous
                </div>
                <div className="pointer" onClick={() => this._nextPage(data, totalCount)}>
                  Next
                </div>
              </div>
            )}
            </Fragment> 
          }
        }
        </Query>
      </Fragment>
    )
  }
}

export default Launches

import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from 'material-ui-search-bar';

import HomeIcon from 'material-ui/svg-icons/action/home';
import List  from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import FuzzySearchWorker from './fuzzySearch.worker';

import PersonRow from 'components/persons/PersonRow';
import RecordRow from 'components/records/RecordRow';

import Shell from 'components/shared/Shell';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personResults: [],
      recordResults: [],
    };

    this.onSearch = this.onSearch.bind(this);
    this.onSearchResults = this.onSearchResults.bind(this);

    this.fuzzySearchWorker = new FuzzySearchWorker();
    this.fuzzySearchWorker.addEventListener('message', this.onSearchResults);
  }

  onSearchResults(event) {
    const {
      personResults,
      recordResults,
    } = event.data;

    this.setState({
      personResults,
      recordResults,
    });
  }

  onSearch(query) {
    if (!query) {
      this.setState({
        personResults: [],
        recordResults: [],
      });

      return;
    }

    const persons = this.props.persons;
    const records = persons.reduce((acc, person) => {
      return [
        ...acc,
        ...person.records
      ];
    }, []);

    this.fuzzySearchWorker.postMessage({
      persons: this.props.persons,
      records,
      query
    });
  }

  render() {
    const {
      history
    } = this.props;

    const {
      personResults,
      recordResults,
    } = this.state;

    return (
      <Shell
        title="Search"
        iconElementLeft={<HomeIcon />}
        onLeftIconButtonClick={() => { history.push('/persons'); }}
      >
        <SearchBar 
          onChange={this.onSearch}
          onRequestSearch={this.onSearch}
          style={{ marginTop: 20 }}
        />
        {personResults.length > 0 &&
          <div>
            <List>
              <Subheader>People</Subheader>
              {personResults.map(person => {
                return (
                  <PersonRow
                    key={`search-result-${person._id}`}
                    person={person}
                    onClick={() => { this.props.history.push(`/persons/${person._id}`)}}
                    showMoreOptions={false}
                  />
                );
              })}
            </List>
            <Divider inset={true} />
          </div>
        }
        {recordResults.length > 0 &&
          <List>
            <Subheader>Records</Subheader>
            {recordResults.map(record => {
              return (
                <RecordRow
                  key={`search-result-${record._id}`}
                  record={record}
                  onClick={() => { this.props.history.push(`/persons/${record.personId}`)}}
                  showMoreOptions={false}
                />
              );
            })}
          </List>
        }
      </Shell>
    );
  }
}

function mapStateToProps(state) {
  return {
    persons: state.persons,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

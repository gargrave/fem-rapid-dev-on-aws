import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import { 
  CreateGrudge, 
  DeleteGrudge, 
  ListGrudges, 
  SubscribeToNewGrudge,
  UpdateGrudge,
} from './graphql'

import NewGrudge from './NewGrudge';
import Grudges from './Grudges';

import './Application.css';

const API_NAME = 'grudgesCRUD';
const API_PATH = '/grudges';

class Application extends Component {
  state = {
    grudges: [],
  };

  async componentDidMount() {
    // NOTE: uncomment for real-time updates when Grudges are added
    // API.graphql(graphqlOperation(SubscribeToNewGrudge)).subscribe({
    //   next: response => {
    //     const grudge = response.value.data.onCreateGrudge;
    //     this.setState(({ grudges }) => ({ grudges: [...grudges, grudge] }))
    //   }
    // })

    try {
      const response = await API.graphql(graphqlOperation(ListGrudges))
      const grudges = response.data.listGrudges.items
      this.setState({ grudges });
    } catch(err) {
      console.error('There was an error fetching the grudges!');
    }
  }

  addGrudge = grudge => {
    this.setState(({ grudges }) => ({ grudges: [...grudges, grudge] }), async () => {
      try {
        await API.graphql(graphqlOperation(CreateGrudge, grudge))
      } catch(err) {
        console.log('There was an error creating the new grudge!');
        this.setState(({ grudges }) => ({ 
          grudges: grudges.filter(other => other.id !== grudge.id) 
        }))
      }
    });
  };

  removeGrudge = grudge => {
    this.setState(({ grudges }) => ({
      grudges: grudges.filter(other => other.id !== grudge.id),
    }), async () => {
      try {
        await API.graphql(graphqlOperation(DeleteGrudge, grudge))
      } catch(err) {
        console.error('There was an error deleting the grudge!');
        this.setState(({ grudges }) => ({ grudges: [...grudges, grudge] }))
      }
    });
  };

  toggle = grudge => {
    const updatedGrudge = { ...grudge, avenged: !grudge.avenged };
    this.setState(({ grudges }) => {
      const othergrudges = grudges.filter(other => other.id !== grudge.id);
      return { grudges: [updatedGrudge, ...othergrudges] };
    }, async () => {
      try {
        await API.graphql(graphqlOperation(UpdateGrudge, updatedGrudge))
      } catch(err) {
        console.error('There was an error updating the grduge!');
        // return grudges to previous state on error
        this.setState(({ grudges }) => ({
            grudges: [
              ...grudges.filter(other => other.id !== grudge.id),
              grudge,
            ]
        }))
      }
    });

  };

  render() {
    const { grudges } = this.state;
    const unavengedgrudges = grudges.filter(grudge => !grudge.avenged);
    const avengedgrudges = grudges.filter(grudge => grudge.avenged);

    return (
      <div className="Application">
        <NewGrudge onSubmit={this.addGrudge} />
        <Grudges
          title="Unavenged Grudges"
          grudges={unavengedgrudges}
          onCheckOff={this.toggle}
          onRemove={this.removeGrudge}
        />
        <Grudges
          title="Avenged Grudges"
          grudges={avengedgrudges}
          onCheckOff={this.toggle}
          onRemove={this.removeGrudge}
        />
      </div>
    );
  }
}

export default withAuthenticator(Application);

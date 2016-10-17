import React, { Component } from 'react';
import Highlight from 'react-highlight';
import Markdown from 'react-remarkable';

import { Layer, LayerToggle } from 'react-layer-stack';

// import Button from './components/Button';
import FixedLayer from './components/FixedLayer';
import AbsoluteLayer from './components/AbsoluteLayer';
import Window from './components/Window';

class Demo extends Component {

  componentWillMount() {
    this.setState({counter: 1})
    setInterval(() => this.setState({counter: this.state.counter + 1}), 1000)
  }

  render() {
    return (
      <div>
        <Layer id="layer_state_infobox" showInitially>{({views, displaying}) =>
          <FixedLayer>
            <div style={{ position:'absolute',
                          bottom: '0', right: '0',
                          width: '350px', height: '100%',
                          padding: '20px',
                          background: 'rgba(0,0,0,0.8)', color: '#fff'}}>
              <Markdown>
                #### Layers displaying:
                <Highlight className="js">
                { JSON.stringify(displaying, null, '  ') }
                </Highlight>
                #### Layers registered:
                <Highlight className="js">
                { JSON.stringify(views, null, '  ') }
                </Highlight>
              </Markdown>

            </div>
          </FixedLayer>}
        </Layer>
        { this.renderMovableWindow() }
        { this.renderSimpleWindow() }

        <LayerToggle id="layer_state_infobox">{({ showMe, hideMe, isActive }) => (
          <button onClick={ () => console.log('TEST') || isActive ? hideMe() : showMe() }>{ isActive ? 'HIDE LAYER STATE' : 'SHOW LAYER STATE' }</button> )}
        </LayerToggle>
        <LayerToggle id="simple_window">{({ showMe }) => (
          <button onClick={ () => showMe() }>OPEN SIMPLE MODAL</button> )}
        </LayerToggle>
        <LayerToggle id="movable_window">{({ showMe }) => (
          <button onClick={ () => showMe() }>OPEN MOVABLE WINDOW</button> )}
        </LayerToggle>
      </div>
    );
  }

  renderSimpleWindow() {
    return (
      <Layer
        id="simple_window">{({index, hideMe, showMe}) => (
        <FixedLayer
          style={ { background: 'rgba(0,0,0,0.3)' } }
          onClick={ hideMe }
          zIndex={ index * 100 }>
          <Window style={{margin: 'auto'}}>
            <div style={styles.header}>
              SIPMLE MODAL
            </div>
            <div style={styles.body}>
            </div>
          </Window>
        </FixedLayer> )}
      </Layer>
    )
  }

  renderMovableWindow() {
    return (
      <Layer
        use={[this.state.counter]}  // data from the context
        id="movable_window">{({index, hideMe, showMe}, {...rest, pinned = false, mouseDown = false, mouseX = 0, mouseY = 0, windowLeft = 400, windowTop = 100} = {}) => (
        <FixedLayer
          onMouseDown={() => showMe({...rest, mouseDown: true})}
          onMouseUp={() => showMe({...rest, mouseDown: false})}
          onMouseMove={({ screenX, screenY}) => {
                const newArgs = {
                  mouseX: screenX, mouseY: screenY
                };
                if (pinned && mouseDown) {
                  newArgs.windowLeft =  windowLeft + (screenX - mouseX);
                  newArgs.windowTop =  windowTop + (screenY - mouseY);
                }
                showMe({...rest, ...newArgs})
              }}
          onClick={ hideMe }
          zIndex={ index * 100 }>
          <Window style={{ top: windowTop, left: windowLeft }}>
            <div
              style={styles.header}
              onMouseEnter={() => mouseDown || showMe({...rest, pinned: true})}
              onMouseLeave={() => mouseDown || showMe({...rest, pinned: false})}>
              PIN TO MOVE
            </div>
            <div style={styles.body}>
              <Markdown>

                ##### Arguments:

                  { JSON.stringify(rest, null, '\t') }

                ##### Data from outer component (closure/context):

                  { JSON.stringify(this.state, null, '\t') }

              </Markdown>
            </div>
          </Window>
        </FixedLayer> )}
      </Layer>
    )
  }
}

const styles = {
  header: {
    height: '50px',
    background: '#F6F6F6',
    borderRadius: '5px 5px 0 0',
    borderWidth: '1px',
    padding: '20px 20px 0 20px'
  },
  body: {
    height: 'auto',
    minHeight: '450px',
    background: '#FFFFFF',
    borderRadius: '0 0 5px 5px',
    padding: '20px'
  },
  footer: {
    height: '50px',
    background: '#F6F6F6',
    borderRadius: '0 0 5px 5px',
    padding: '20px 0 20px 0'
  }
};

export default Demo;

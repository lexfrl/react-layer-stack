import React, { Component } from 'react';
import { Layer, LayerToggle } from 'react-layer-stack'

// import Button from './components/Button'
import FixedLayer from './components/FixedLayer'
import Window from './components/Window'

class Demo extends Component {
  render() {
    return (
      <div>
        { this.renderMovableWindow() }
        { this.renderSimpleWindow() }

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
        id="movable_window">{({index, hideMe, showMe}, {...rest, pinned = false, mouseDown = false, mouseX = 0, mouseY = 0, windowLeft = 100, windowTop = 50} = {}) => (
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
              { JSON.stringify(rest, null, '\t') }
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
    borderBottom: '1px solid',
  },
  body: {
    height: '300px',
    background: '#FFFFFF',
    borderRadius: '0 0 5px 5px',
  },
  footer: {
    height: '50px',
    background: '#F6F6F6',
    borderRadius: '0 0 5px 5px',
    borderTop: '1px solid',
  }
};

export default Demo;

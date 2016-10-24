import React, { Component } from 'react';
import Highlight from 'react-highlight';
import Markdown from 'react-remarkable';

import { Layer, LayerContext } from 'react-layer-stack';

import FixedLayer from './components/FixedLayer';
import Window from './components/Window';

const styles = {
  header: {
    height: '36px',
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
    height: '34px',
    background: '#F6F6F6',
    borderRadius: '0 0 5px 5px',
    padding: '20px 0 20px 0'
  }
};

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
        { this.renderZoom() }
        <Markdown>
          #### DEMO component data
              { JSON.stringify(this.state, null, '\t') }
          #### LAYER STATE TOGGLE
          <LayerContext id="layer_state_infobox">{({ showMe, hideMe, isActive }) => (
            <button onClick={ () => isActive ? hideMe() : showMe() }>{ isActive ? 'HIDE LAYER STATE' : 'SHOW LAYER STATE' }</button> )}
          </LayerContext>
          #### SIMPLE MODALS
          <LayerContext id="simple_window">{({ showMe }) => (
            <button onClick={ () => showMe() }>OPEN SIMPLE MODAL</button> )}
          </LayerContext>
          #### MOVABLE WINDOWS
          <LayerContext id="movable_window">{({ showMe }) => (
            <button onClick={ () => showMe() }>OPEN MOVABLE WINDOW</button> )}
          </LayerContext>

          #### LIGHTBOX
          <LayerContext id="lightbox">{({ showMe, hideMe }) => (
            <button onMouseLeave={ hideMe } onMouseEnter={ (e) => showMe({ content: `
            “Bill Clinton’s 1992 campaign was a classic example of sticky ideas at work in a difficult environment. Not only did the campaign have the normal set of complexities, Clinton himself added a few new wrinkles.”
            `, rect: e.nativeEvent.relatedTarget.getClientRects()[0] }) }>MOVE IT TO MEE</button> )}
          </LayerContext>
        </Markdown>
      </div>
    );
  }

  renderZoom() {
    return (
      <Layer id="lightbox">{ ({ index, hideMe }, { content, rect: { top, left, width, height } }) =>
        <FixedLayer style={ { marginRight: '15px', marginBottom: '15px' } }>
          <div style={{
            top, left: left + width + 10, position: "absolute",
            padding: '10px',
            background: 'rgba(0,0,0,0.7)', color: '#fff', borderRadius: '5px'}}>{ content }
          </div>
        </FixedLayer>
      }</Layer>
    )
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
        id="movable_window">{({index, hideMe, showMe}, {
          ...rest,
          pinned = false,
          mouseDown = false,
          mouseLastPositionX = 0,
          mouseLastPositionY = 0,
          windowLeft = 400,
          windowTop = 100} = {}) => (
        <FixedLayer
          onMouseDown={() => showMe({...rest, mouseDown: true})}
          onMouseUp={() => showMe({...rest, mouseDown: false})}
          onMouseMove={({ screenX, screenY}) => {
            const newArgs = {
              mouseLastPositionX: screenX, mouseLastPositionY: screenY
            };
            if (pinned && mouseDown) {
              newArgs.windowLeft =  windowLeft + (screenX - mouseLastPositionX);
              newArgs.windowTop =  windowTop + (screenY - mouseLastPositionY);
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
                <div
                  onClick={hideMe}
                  style={{
                    cursor:'pointer',
                    float: 'right',
                    width: '16px',
                    height: '16px',
                    borderRadius:'8px',
                    background: 'gray'}} />
              </div>
              <div style={styles.body}>
                <Markdown>
                  ##### Arguments:
                  <Highlight className="js">
                    { JSON.stringify(rest, null, '\t') }
                  </Highlight>
                  ##### Data from outer component (closure/context):
                  <Highlight className="js">
                    { JSON.stringify(this.state, null, '\t') }
                  </Highlight>
                </Markdown>
              </div>
            </Window>
        </FixedLayer> )}
      </Layer>
    )
  }
}

export default Demo;

import React, { Component } from 'react';
import CircularJSON from 'circular-json';
import Highlight from 'react-highlight';
import Markdown from 'react-remarkable';

import { Layer, LayerToggle } from 'react-layer-stack';

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
        { this.renderDebugLayer() }
        { this.renderMovableWindow() }
        { this.renderSimpleModal() }
        { this.renderLightbox() }
        <Markdown>

          #### DEMO top component data
              { JSON.stringify(this.state, null, '\t') }

          #### LAYER STATE TOGGLE
          <LayerToggle for="layer_state_infobox">{({ show, hide, isActive }) => (
            <button onClick={ () => isActive ? hide() : show() }>{ isActive ? 'HIDE LAYER STATE' : 'SHOW LAYER STATE' }</button> )}
          </LayerToggle>


          #### LIGHTBOX target-oriented
          <LayerToggle for="lightbox">{({ show, hide }) => (
            <button onMouseLeave={ hide } onMouseEnter={ ({ nativeEvent: { relatedTarget } }) => {
              const { left, top, width } = relatedTarget.getClientRects()[0];
              show(
                <div style={{
                      left: left + width + 20, top, position: "absolute",
                      padding: '10px',
                      background: 'rgba(0,0,0,0.7)', color: '#fff', borderRadius: '5px',
                      boxShadow: '0px 0px 50px 0px rgba(0,0,0,0.60)'}}>
                   “There has to be message triage. If you say three things, you don’t say anything.”
                </div>
              )
            }}>A button. Move your pointer to it.</button> )}
          </LayerToggle>



          #### LIGHTBOX pointer-oriented v2
          <LayerToggle for="lightbox">{({ show, hide }) => (
            <button onMouseLeave={ hide } onMouseMove={ ({ clientX, clientY }) => {
              show(
                <div style={{
                      left: clientX + 20, top: clientY, position: "absolute",
                      padding: '10px',
                      background: 'rgba(0,0,0,0.7)', color: '#fff', borderRadius: '5px',
                      boxShadow: '0px 0px 50px 0px rgba(0,0,0,0.60)'}}>
                   “There has to be message triage. If you say three things, you don’t say anything.”
                </div>)
            }}>Yet another button. Move your pointer to it.</button> )}
          </LayerToggle>

          #### MOVABLE WINDOWS
          <LayerToggle for="movable_window">{({ show }) => (
            <button onClick={ () => show() }>OPEN MOVABLE WINDOW</button> )}
          </LayerToggle>

          #### SIMPLE MODALS
          <LayerToggle for="simple_modal">{({ show }) => (
            <button onClick={ () => show() }>OPEN SIMPLE MODAL</button> )}
          </LayerToggle>

        </Markdown>
      </div>
    );
  }

  renderLightbox() {
    return (
      <Layer id="lightbox" to="screen">{ (_, content) =>
        <FixedLayer style={ { marginRight: '15px', marginBottom: '15px' } }>
          { content }
        </FixedLayer>
      }</Layer>
    )
  }

  renderSimpleModal() {
    return (
      <Layer id="simple_modal" to="screen">{({index, hide, show}) => (
        <FixedLayer
          style={ { background: 'rgba(0,0,0,0.3)' } }
          onEsc={ hide }
          onClick={ hide }
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
      <Layer use={[this.state.counter]}  // data from the context
        id="movable_window" to="screen">{({index, hide, update}, {
          ...rest,
          pinned = false,
          mouseDown = false,
          mouseLastPositionX = 0,
          mouseLastPositionY = 0,
          windowLeft = 670,
          windowTop = 100} = {}) => (
        <FixedLayer
          onMouseDown={() => update({...rest, mouseDown: true})}
          onMouseUp={() => update({...rest, mouseDown: false})}
          onMouseMove={({ screenX, screenY}) => {
            const newArgs = {
              mouseLastPositionX: screenX, mouseLastPositionY: screenY
            };
            if (pinned && mouseDown) {
              newArgs.windowLeft =  windowLeft + (screenX - mouseLastPositionX);
              newArgs.windowTop =  windowTop + (screenY - mouseLastPositionY);
            }
            update({...rest, ...newArgs})
          }}
          onClick={ hide }
          zIndex={ index * 100 }>
            <Window style={{ top: windowTop, left: windowLeft }}>
              <div
                style={styles.header}
                onMouseEnter={() => mouseDown || update({...rest, pinned: true})}
                onMouseLeave={() => mouseDown || update({...rest, pinned: false})}>
                PIN TO MOVE
                <div
                  onClick={hide}
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
                  ##### Layer inside Layer (inside Layer inside Layer inside Layer inside Layer inside Layer inside Layer ...  inside Layer)

                  <LayerToggle for="lightbox">{({ show, hide }) => (
                    <button onMouseLeave={ hide } onMouseMove={ ({ clientX, clientY }) => {
                    show(<div style={{
                      left: clientX + 20, top: clientY, position: "absolute",
                      padding: '10px',
                      background: 'rgba(0,0,0,0.7)', color: '#fff', borderRadius: '5px',
                      boxShadow: '0px 0px 50px 0px rgba(0,0,0,0.60)'}}>
                   “In fact, psychologists have found that people can be driven to irrational decisions by too much complexity and uncertainty.”
                </div>)
                  }}>Yet another button. Move your pointer to it.</button> )}
                  </LayerToggle>
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

  renderDebugLayer() {
    return <Layer id="layer_state_infobox" to="screen" showInitially>{({stack}) =>
      <FixedLayer>
        <div style={{ position:'absolute',
                          bottom: '0', right: '0',
                          width: '350px', height: '100%',
                          padding: '20px',
                          background: 'rgba(0,0,0,0.8)', color: '#fff'}}>
          <Markdown>
            #### Layers displaying:
            <Highlight className="js">
              { CircularJSON.stringify(stack, null, '  ') }
            </Highlight>
          </Markdown>
        </div>
      </FixedLayer>}
    </Layer>
  }
}

export default Demo;

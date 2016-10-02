import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ACTIONS } from './reducer'

export const LayerStackMountPoint = (namespace = 'layer_stack') => connect(
  (store) => store[namespace],
  dispatch => bindActionCreators(ACTIONS, dispatch)
)(({ renderFn, views, displaying, show, hide, hideAll}) => { // from store
  return (
    <div> { renderFn ? renderFn({views, displaying, show, hide, hideAll})
      : (displaying.length ? displaying.map (
      (id, index) => <div key={id}>{ views[id].renderFn({
        index, id, show, hide, hideAll, displaying, views,
        showOnlyMe: (...args) => hideAll() || show(id, ...args), // TODO: improve
        hideMe: () => hide(id),
        showMe: (...args) => show(id, ...args) // sometimes you may want to change args of the current layer
      }, ...views[id].args) }</div>
    )
      : <noscript />) }
    </div>
  )
});

export const Layer = (namespace = 'layer_stack') => connect(
  (store) => store[namespace],
  dispatch => bindActionCreators(ACTIONS, dispatch)
)((React.createClass({
  componentWillMount() {
    this.props.register(this.props.id, this.props.children);
  },
  shouldComponentUpdate(newProps) {
    const { use, children, register, id } = this.props;
    let needUpdate = false;
    if (id !== newProps.id) {
      needUpdate = true;
    }
    else if (children.toString() !== newProps.children.toString()) {
      needUpdate = true;
    }
    else if (use) {
      if (use.length !== newProps.use.length) {
        needUpdate = true;
      } else {
        let i = use.length;
        while (i--) {
          if (JSON.stringify(use[i]) !== JSON.stringify(newProps.use[i])) {
            needUpdate = true;
          }
        }
      }
    }

    if (needUpdate) {
      register(newProps.id, newProps.children);
      return true;
    }
    return false;
  },

  componentWillUnmount() {
    // TODO: garbage collection
    // this.props.unregister(this.props.id)
  },

  render() {
    return <noscript />
  }
})));

export const LayerToggle = (namespace = 'layer_stack') => connect(
  (store) => store[namespace],
  dispatch => bindActionCreators(ACTIONS, dispatch)
)(({ children, id, // from props
  displaying, show, hide, hideAll, views // from store
}) => {
  return children({
    show, hide, hideAll, displaying, views,
    showMe: (...args) => show(id, ...args),
    showOnlyMe: (...args) => hideAll() || show(id, ...args),
    hideMe: () => hide(id),
  });
});
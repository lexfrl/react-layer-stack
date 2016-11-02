import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ACTIONS } from './reducer'

export const LayerStackMountPoint = (namespace = 'layer_stack') => connect(
  (store) => store[namespace],
  dispatch => bindActionCreators(ACTIONS, dispatch)
)(({ renderFn, args: mountPointArgs, views, displaying, show, hide, hideAll}) => { // from store
  return (
    <div> { renderFn ? renderFn({views, displaying, show, hide, hideAll}) // it's possible to provide alternative renderFn for the MountPoint
      : (displaying.length ? displaying.map ((id, index) => // if no alternative renderFn provided we'll use the default one
          <div key={id}>
            {(() => {
              if (views[id] && views[id].renderFn) {
                return views[id].renderFn({ // TODO: check that renderFn is a function
                  index, id, show, hide, hideAll, displaying, views, mountPointArgs,
                  showOnlyMe: (...args) => hideAll() || show(id, ...args), // TODO: improve
                  hideMe: () => hide(id),
                  showMe: (...args) => show(id, ...args) // sometimes you may want to change args of the current layer
                }, ...views[id].args)
              }
              if (typeof views[id] === 'undefined' || typeof views[id].renderFn === 'undefined') {
                throw new Error(`
It seems like you're using LayerContext with id="${ id }" but corresponding Layer isn't declared in the current Components tree.
Make sure that Layer with id="${ id }" is rendered into the current tree.
`)
              }})()}
          </div>) : <noscript />)}
    </div>
  )
});

export const Layer = (namespace = 'layer_stack') => connect(
  (store) => store[namespace],
  dispatch => bindActionCreators(ACTIONS, dispatch)
)((React.createClass({
  componentWillMount() {
    this.props.register(this.props.id, this.props.children);
    if (this.props.showInitially) {
      this.props.show(this.props.id, this.props.defaultArgs || [])
    }
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

export const LayerContext = (namespace = 'layer_stack') => connect(
  (store) => store[namespace],
  dispatch => bindActionCreators(ACTIONS, dispatch)
)(({ children, id, // from props
  displaying, show, hide, hideAll, views // from store
}) => {
  return children({
    show, hide, hideAll, displaying, views,
    isActive: displaying.indexOf(id) !== -1,
    showMe: (...args) => show(id, ...args),
    showOnlyMe: (...args) => hideAll() || show(id, ...args),
    hideMe: () => hide(id),
  });
});
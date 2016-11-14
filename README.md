[Live demo](https://fckt.github.io/react-layer-stack/)

### Related Stackoverflow q&a
- http://stackoverflow.com/a/40461655/524034
- http://stackoverflow.com/questions/40443160/bootstrap-modal-like-behavior-in-react
- http://stackoverflow.com/questions/40444788/rendering-a-modal-in-react
- http://stackoverflow.com/questions/39805544/showing-list-of-buttons-displaying-modals-in-reactjs
- http://stackoverflow.com/questions/39913593/dynamically-displaying-data-from-a-clickable-table-row-into-a-modal

### Rationale
`react`/`react-dom` comes comes with 2 basic assumptions/ideas:
- every UI is hierarchical naturally. This why we have the idea of "`components` wrap each other"
- `react-dom` mounts (physically) child component to its parent DOM node by default

The problem is that sometimes the second property isn't what you want in your case. Sometimes you want to mount your component into different physical DOM node and hold logical connection between parent and child at the same time.

Canonical example is Tooltip-like component: at some point of development process you could find that you need to add some description for your `UI element`: it'll render in fixed layer and should know its coordinates (which are that `UI element` coord or mouse coords) and at the same time it needs information whether it needs to be shown right now or not, its content and some context from parent components. This example shows that sometimes logical hierarchy isn't match with the physical DOM hierarchy.

```javascript
import React, { Component } from 'react';
import { Layer, LayerContext } from 'react-layer-stack';

class Demo extends Component {
  render() {
    return (
      <div>
        <Layer id="lightbox2">{ (_, content) =>
          <FixedLayer style={ { marginRight: '15px', marginBottom: '15px' } }>
            { content }
          </FixedLayer>
        }</Layer>

        <LayerContext id="lightbox2">{({ showMe, hideMe }) => (
            <button onMouseLeave={ hideMe } onMouseMove={ ({ pageX, pageY }) => {
              showMe(
                <div style={{
                      left: pageX, top: pageY + 20, position: "absolute",
                      padding: '10px',
                      background: 'rgba(0,0,0,0.7)', color: '#fff', borderRadius: '5px',
                      boxShadow: '0px 0px 50px 0px rgba(0,0,0,0.60)'}}>
                   “There has to be message triage. If you say three things, you don’t say anything.”
                </div>)
            }}>Yet another button. Move your pointer to it.</button> )}
          </LayerContext>
    </div>
    )
  }
}
```

Another option could be use one of dozens complete implementations with different properties:
https://js.coach/?search=popover

### More examples
https://github.com/fckt/react-layer-stack/blob/master/demo/src/Demo.js

### Live demo
https://fckt.github.io/react-layer-stack/

### Installation
```
npm install --save react-layer-stack
```

### API

3 components with a few properties.

#### `<LayerStackMountPoint />`

This is mount point for `Layers`. 

`id: string` - you can have multiple `LayerStackMountPoint` which could have different ID's.

`children: callback({ views, displaying, show: callback(id, args), hide, hideAll, mountPointId, mountPointArgs }): ReactElement` - you can choose different strategies how to render `Layers` in `LayerStackMountPoint` instead of the default one.

#### `<Layer />`

`id: string` - a Layer identificator

`initialArgs` - initial arguments for a Layer

`use: array` - array with context variables. Useful if you want to re-render the Layer if parent variables (closure) are changed

`children: callback({ isActive, showMe: callback(args), showOnlyMe, hideMe, hideAll }, ...args): ReactElement` - will be rendered into 

#### `<LayerContext />`

`id: string` - a Layer identificator which LayerContext corresponds to

`children: callback({ isActive, showMe: callback(args), showOnlyMe, hideMe, hideAll }): ReactElement` - will be mounted (rendered) directly to its parent

### Store layers in your redux store

`react-layer-stack` provides `reducer` (`import { reducer } from 'react-layer-stack'`) which you can combine into your Redux store instead of using preconfigured `LayerStackProvider`. This is useful if you want to store everything in one store (which is good practice).

### Real-world usage example

Public API consist 2 key components: `Layer`, `LayerStackMountPoint` and 1 additional: `LayerContext` (sometimes toggle needs to know which popover is open now).
Set the `LayerStackMountPoint` somewhere on the top of the tree:

```javascript
import { LayerStackProvider, LayerStackMountPoint } from 'react-layer-stack'
// ...
//  render() {
        return (
            <LayerStackProvider>
              <Container>
                <LayerStackMountPoint />
                <AppBar />
                <Container className={styles.container}>
                  {children}
                </Container>
              </Container>
            </LayerStackProvider>
        )
//  }
```

Define your `Layer`. This example shows how to propagate variables from lexical context (https://developer.mozilla.org/en/docs/Web/JavaScript/Closures) to the `Layer`, which will be displayed in the `LayerStackMountPoint`. Each layer should have an `id` and `use` properties. `use` property is needed to determine if we should update the lexical context of the anonymous function which renders `Modal` into `Layer` if `Cell` is re-rendered.

```javascript
import { Layer, LayerContext } from 'react-layer-stack'
// ... for each `object` in array of `objects`
const modalId = 'DeleteObjectConfirmation' + objects[rowIndex].id
return (
    <Cell {...props}>
        // the layer definition. The content will show up in the LayerStackMountPoint when `show(modalId)` be fired in LayerContext
        <Layer use={[objects[rowIndex], rowIndex]} id={modalId}> {({
            hideMe, // alias for `hide(modalId)`
            index } // useful to know to set zIndex, for example
            , e) => // access to the arguments (click event data in this example)
          <Modal onClick={ hideMe } zIndex={(index + 1) * 1000}>
            <ConfirmationDialog
              title={ 'Delete' }
              message={ "You're about to delete to " + '"' + objects[rowIndex].name + '"' }
              confirmButton={ <Button type="primary">DELETE</Button> }
              onConfirm={ this.handleDeleteObject.bind(this, objects[rowIndex].name, hideMe) } // hide after confirmation
              close={ hideMe } />
          </Modal> }
        </Layer>
        
        // this is the toggle for Layer with `id === modalId` can be defined everywhere in the components tree
        <LayerContext id={ modalId }> {({showMe}) => // showMe is alias for `show(modalId)`
          <div style={styles.iconOverlay} onClick={ (e) => showMe(e) }> // additional arguments can be passed (like event)
            <Icon type="trash" />
          </div> }
        </LayerContext>
    </Cell>)
// ...
```

### Alternatives
The is a lot of alternative ways to archive the desirable **bottom-to-up** link b/w components.

The most obvious (and naiive as well) way is to use redux (or another flux/data lib) as a transport to send data from one DOM branch to another. It's good and robust solution (moreover react-layer-stack use redux as a store [currently](https://github.com/fckt/react-layer-stack/blob/master/README.md#one-important-thing-to-know)), but the problem is that it's  overkill. It's not universal also, consumes time to implement and grasp, not because of complications, but because you have to reinvent the same pattern again and again (slightly different in each case).

Another solution is to use on of ready-to-use components. But lot of times are you need slightly different behavior/look and more productive to implement home-grown ad-hock solution.

And the last option is to find library like https://github.com/tajo/react-portal or https://react-bootstrap.github.io/react-overlays/, designed to address the needs of **bottom-to-up** communication. These libs are often quite opinionated to their cases and doesn't solve the problem in its roots. **react-layer-stack** aims to give an answer how to organize **bottom-to-up** communication in the most natural, reasonable and flexible way.

### The future
Obviously there is a lot of applications for the Layer API (https://github.com/fckt/react-layer-stack/blob/master/README.md#layer-). The cautious question is: could be it become a foundation or standard API to declare some kind of "universal" React "modules"? If so, could be the entire application become a "module"?

### Images to understand the whole thing
#### View layers stack
![Symlink](http://cfs6.tistory.com/upload_control/download.blog?fhandle=YmxvZzE1NzczMkBmczYudGlzdG9yeS5jb206L2F0dGFjaC8wLzEzMDAwMDAwMDAyMi5qcGc%3D)

#### Layer id and "use" property (sym/soft link)
![Symlink](http://1.bp.blogspot.com/-gZMz1nF3GC0/UiyehOS_bWI/AAAAAAAABQI/BpYyEtadcEg/s640/profiles1.png)

### TODO:
* examples
* tests

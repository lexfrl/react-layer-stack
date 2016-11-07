[Live demo](https://fckt.github.io/react-layer-stack/)

### Rationale
`react`/`react-dom` comes comes with 2 basic assumptions/ideas:
- every UI is hierarchical naturally. This why we have the idea of `components` which wrap each other
- `react-dom` mounts (phisically) child component to its parent DOM node by default

The problem is that sometimes the second property isn't what you want in your case. Sometimes you want to mount your component into different physical DOM node and hold logical connection beetween parent and child at the same time.

Canonical example is Tooltip-like component: at some point of development process you could find that you need to add some description for your `UI element`: it'll render in fixed layer and should know its coordinates (which are that `UI element` coord or mouse coords) and at the same time it needs information whether it needs to be shown right now or not, its content and some context from parent components. This example shows that sometimes logical hierarhy isn't match with the physical DOM hierarhy.

```javascript
import React, { Component } from 'react';
import { Layer, LayerContext } from 'react-layer-stack';

class Demo extends Component {
  render() {
    return (
      <div>
        <LayerContext id="lightbox">{({ showMe, hideMe }) => (
          <button onMouseLeave={ hideMe } onMouseMove={ ({ pageX, pageY }) => {
            showMe({
              left: pageX + 20, top: pageY,
              content: `“More Content! More!”,`,
            })
          }}>Move your pointer to it.</button> )}
        </LayerContext>

        <Layer id="lightbox">{(_, { content, top, left }) => // will be redered into <LayerStackMountPoint />
          <div style={{ position: "fixed" }}>
            <div style={{
              top, left, position: "absolute",
              padding: '10px',
              background: 'rgba(0,0,0,0.7)', color: '#fff', borderRadius: '5px',
              boxShadow: '0px 0px 50px 0px rgba(0,0,0,0.60)'}}>
                { content }
            </div>
          </div>
        }</Layer>
    </div>
)
```

Another option could be use one of dozens complete impementations with different properties:
https://js.coach/?search=popover

### Installation
```
npm install --save react-layer-stack
```

### API

#### `<LayerStackMountPoint />`

This is mount point for `Layers`. 

`id: string` - you can have multiple `LayerStackMountPoint` which could have different ID's.

`children: callback({ views, displaying, show: callback(id, args), hide, hideAll, mountPointId, mountPointArgs }): ReactElement` - you can choose different stratigies how to render `Layers` in `LayerStackMountPoint` instead of the default one.

#### `<Layer />`

`id: string` - a Layer indentificator

`initialArgs` - initial arguments for a Layer

`use: array` - array with context variables. Useful if you want to re-render the Layer if parent variables (closure) are changed

`children: callback({ isActive, showMe: callback(args), showOnlyMe, hideMe, hideAll }, ...args): ReactElement` - will be rendered into 

#### `<LayerContext />`

`id: string` - a Layer indentificator which LayerContext corresponds to

`children: callback({ isActive, showMe: callback(args), showOnlyMe, hideMe, hideAll }): ReactElement` - will be mouted (rendered) directly to its parrent

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

Another solution is to use on of ready-to-use components. But lot of times are you need slightly different bahavior/look and more productive to implememnt home-grown ad-hock solution.

And the last option is to find library like https://github.com/tajo/react-portal or https://react-bootstrap.github.io/react-overlays/, designed ot address the needs of **bottom-to-up** communication. These libs are often quite opinionated to their cases and doesn't solve the problem in its roots. **react-layer-stack** aims to give an answer how to organise **bottom-to-up** communication in the most natural, reasonable and flexible way.

### The future
Obviously there is a lot of applicaitons for the Layer API (https://github.com/fckt/react-layer-stack/blob/master/README.md#layer-). The cautious question is: could be it become a foundation or standart API to declare some kind of "universal" React "modules"? And could be the entire application become that "module"?

### Images to understand the whole thing
#### View layers stack
![Symlink](http://cfs6.tistory.com/upload_control/download.blog?fhandle=YmxvZzE1NzczMkBmczYudGlzdG9yeS5jb206L2F0dGFjaC8wLzEzMDAwMDAwMDAyMi5qcGc%3D)

#### Layer id and "use" property (sym/soft link)
![Symlink](http://1.bp.blogspot.com/-gZMz1nF3GC0/UiyehOS_bWI/AAAAAAAABQI/BpYyEtadcEg/s640/profiles1.png)

### TODO:
* examples
* tests

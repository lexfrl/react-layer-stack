[Live demo](https://fckt.github.io/react-layer-stack/)

### Rationale
`react`/`react-dom` comes comes with 2 basic assumptions/ideas:
- every UI is hierarchical naturally. This why we have the idea of `components` which wrap each other
- `react-dom` mounts child component to its parent DOM node by default

The problem is that sometimes the second property isn't what you want in your case. Sometimes you want to mount your component into different physical DOM node and hold logical connection beetween parent and child at the same time.

Canonical example is Tooltip-like component: at some point of development process you could find that you need to add some description for your `UI element`: it'll render in fixed layer and should know its coordinates (which are that `UI element` coord or mouse coords) and at the same time it needs information whether it needs to be shown right now or not, its content and some context from parent components. This example shows that sometimes logical hierarhy isn't match with the physical DOM hierarhy.

### Installation
```
npm install --save react-layer-stack
```

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

And the last option is to find library like https://github.com/tajo/react-portal, designed ot address the needs of **bottom-to-up** communication. These libs are often quite opinionated to their cases and doesn't solve the problem in its roots. **react-layer-stack** aims to give an answer how to organise **bottom-to-up** communication in the most natural, reasonable and flexible way.

### Images to understand the whole thing
#### View layers stack
![Symlink](http://cfs6.tistory.com/upload_control/download.blog?fhandle=YmxvZzE1NzczMkBmczYudGlzdG9yeS5jb206L2F0dGFjaC8wLzEzMDAwMDAwMDAyMi5qcGc%3D)

#### Layer id and "use" property (sym/soft link)
![Symlink](http://1.bp.blogspot.com/-gZMz1nF3GC0/UiyehOS_bWI/AAAAAAAABQI/BpYyEtadcEg/s640/profiles1.png)

### TODO:
* examples
* tests

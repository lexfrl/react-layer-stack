### Description

I've designed `react-layer-stack` to fix one of the most tricky problems React users are facing with: **bottom-top** UI communication (modals, drag'n'drops, popovers, popups, windows). The lib allows to share context (closure) of deep children components with top layers: you can both use variables from closure (which will propagate automatically if you'll provide it to `use` property of Layer), Layer info (state, index in stack), callbacks (to show and hide layers) and also you can set event data from your toggle to Layer which is controlled by.

### Real-world usage example

Public API consist 2 key components: `Layer`, `LayerStackMountPoint` and 1 additional: `LayerToggle` (sometimes toggle needs to know which popover is open now)
Set the LayerStackMountPoint somewhere on the top of the tree:

```javascript
import { LayerStackMountPoint } from 'react-layer-stack'
// ...
//  render() {
        return (
          <Container>
            <LayerStackMountPoint />
            <AppBar />
            <Container className={styles.container}>
              {children}
            </Container>
          </Container>
    )
//  }
```

Define your `Layer`. This example shows how to propagate variables from lexical context (https://developer.mozilla.org/en/docs/Web/JavaScript/Closures) to the `Layer`, which will be displayed in the `LayerStackMountPoint`. Each layer should have an `id` and `use` properties. `use` property is needed to determine if we should update the lexical context of the anonymous function which renders `Modal` into `Layer` if `Cell` is re-rendered.

```javascript
import { Layer, LayerToggle } from 'react-layer-stack'
// ... for each `object` in array of `objects`
const modalId = 'DeleteObjectConfirmation' + objects[rowIndex].id
return (
    <Cell {...props}>
        // the layer definition. The content will show up in the LayerStackMountPoint when `show(modalId)` be fired in LayerToggle
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
        <LayerToggle id={ modalId }> {({showMe}) => // showMe is alias for `show(modalId)`
          <div style={styles.iconOverlay} onClick={ (e) => showMe(e) }> // additional arguments can be passed (like event)
            <Icon type="trash" />
          </div> }
        </LayerToggle>
    </Cell>)
// ...
```

### One important thing to know

Currently we use the redux store as a backend, but that could be changed in the future. Consider it just as an initialization logic and not as the public API.
Therefore you should add the layers reducer to the store:

```javascript
import { DEFAULT_STORE_KEY as DEFAULT_LAYERS_STORE_KEY, reducer as layersReducer } from 'react-layer-stack'
// ...
const reducer = combineReducers({...reducers, [DEFAULT_LAYERS_STORE_KEY]: layersReducer})
```


### Images to understand the whole thing
#### View layers stack
![Symlink](http://cfs6.tistory.com/upload_control/download.blog?fhandle=YmxvZzE1NzczMkBmczYudGlzdG9yeS5jb206L2F0dGFjaC8wLzEzMDAwMDAwMDAyMi5qcGc%3D)

#### Layer id and "use" property (sym/soft link)
![Symlink](http://1.bp.blogspot.com/-gZMz1nF3GC0/UiyehOS_bWI/AAAAAAAABQI/BpYyEtadcEg/s640/profiles1.png)

### TODO:
* examples
* tests

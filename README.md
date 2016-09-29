### TODO:
* examples
* tests
* events support


### Real-world usage example
Currently we use the redux store as a backend, but that could be changed in the future. Consider it just as an initialization logic and not as the public API.
Therefore you should add the layers reducer to the store:

```javascript
import { DEFAULT_STORE_KEY as DEFAULT_LAYERS_STORE_KEY, reducer as layersReducer } from 'react-layer-stack'
// ...
const reducer = combineReducers({...reducers, [DEFAULT_LAYERS_STORE_KEY]: layersReducer})
```

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

Define your layer. Each layer should have an `id` and `use` properties (will be explained):

```javascript
import { Layer, LayerToggle } from 'react-layer-stack'
// ...
const modalId = 'DeleteObjectConfirmation' + objects[rowIndex].path
return (
    <Cell {...props}>
        <Layer use={[objects[rowIndex], rowIndex]}
                     id={modalId}
                     renderFn={({hide, zIndex}) =>
          <Modal onClick={ hide.bind(null, modalId) } zIndex={(zIndex + 1) * 1000}>
            <ConfirmationDialog
              title={ 'Delete' }
              message={ "You're about to delete to " + '"' + objects[rowIndex].name + '"' }
              confirmButton={ <Button type="primary">DELETE</Button> }
              onConfirm={ this.handleDeleteObject.bind(this, objects[rowIndex].name, () => hide(modalId)) }
              hideModal={ () => hide(modalId) } />
          </Modal>} />
        <LayerToggle renderFn={({show}) =>
          <div style={styles.iconOverlay} onClick={ () => show(modalId) }>
            <Icon type="trash" />
          </div>} />
    </Cell>)
// ...
```
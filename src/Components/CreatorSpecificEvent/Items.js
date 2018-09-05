import React, { Component } from 'react';



export default class Items extends Component {
        constructor(props) {
            super(props);

            this.state = {
                selectedName: props.selectedName,
            }
        }
            
    
    render() {
        // console.log('items props******************', this.props)
                    const { i, item, editing, editItem, selectedId, selectedName } = this.props;
                        console.log(selectedName)
                      
                    
                    return <div className='requested_items' key={i}>
                    <table id="t">
                        <thead>
                             <tr>
                             <th>
                             <div className='requested_items_grid'>
                             {editing ? selectedId == item.id ? <input name='selectedName' onChange={(e) => this.props.handleInput(e)}/> : <p>{item.name}</p> : <p>{item.name}</p>}
                             </div>
                             </th>
                             </tr>
                         </thead>
                         <tbody>
                             <tr>
                             <td>
                             {editing ? selectedId == item.id ? <button className='myButton' onClick={() => this.props.saveItem(item.id)}>Save</button> : <button className='myButton' onClick={() => this.props.editItem(item.id)}>Edit</button> : <button className='myButton' onClick={() => this.props.editItem(item.id)}>Edit</button>}
                             {editing && selectedId == item.id ? <button className='myButton' onClick={() => this.props.cancel(item.id)}>Cancel</button> : ''}                   
                             {this.props.deleteWarning 
                             ? <div>
                             <button className='myButton' onClick={() => this.props.deleteCancel(item.id)}>Cancel</button>
                             <button className='myButton' onClick={() => this.props.deleteItem(item.id)}>Actually Delete</button>
                             </div>
                             :<div onClick={() => this.props.deleteWarningChange()} className="myButton">Delete</div> 
                              }
                             </td>
                                
                             </tr>
                            </tbody>
                         </table>
                </div>
}
}
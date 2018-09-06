import React from 'react';

export default (props) => {
        // console.log(props)
                    const { i, item, editing, selectedId, selectedName } = props;
                    return <div className='requested_items' key={i}>
                    <table id="t">
                        <thead>
                             <tr>
                             <th>
                             <div className='requested_items_grid'>
                             {editing ? selectedId == item.id ? <input name='selectedName' value={selectedName} onChange={(e) => props.handleInput(e)}/> : <p>{item.name}</p> : <p>{item.name}</p>}
                             </div>
                             </th>
                             </tr>
                         </thead>
                         <tbody>
                             <tr>
                             <td>
                             {editing ? selectedId == item.id ? <button className='myButton' onClick={() => props.saveItem(item.id)}>Save</button> : <button className='myButton' onClick={() => props.editItem(item.id)}>Edit</button> : <button className='myButton' onClick={() => props.editItem(item.id)}>Edit</button>}
                             {editing && selectedId == item.id ? <button className='myButton' onClick={() => props.cancel(item.id)}>Cancel</button> : ''}                   
                             {props.deleteWarning 
                             ? <div>
                             <button className='myButton' onClick={() => props.deleteCancel(item.id)}>Cancel</button>
                             <button className='myButton' onClick={() => props.deleteItem(item.id)}>Actually Delete</button>
                             </div>
                             :<div onClick={() => props.deleteWarningChange()} className="myButton">Delete</div> 
                              }
                             </td>
                                
                             </tr>
                            </tbody>
                         </table>


                    {/* {editing ? selectedId == item.id ? <input name='selectedName' value={selectedName} onChange={(e) => props.handleInput(e)}/> : <p>{item.name}</p> : <p>{item.name}</p>} */}
                    {/* {editing ? selectedId == item.id ? <button className='myButton' onClick={() => this.saveItem(item.id)}>Save</button> : <button onClick={() => this.editItem(item.id)}>Edit</button> : <button onClick={() => this.editItem(item.id)}>Edit</button>}
                    {editing && selectedId == item.id ? <button className='myButton' onClick={() => this.cancel(item.id)}>Cancel</button> : ''}                   
                    <button className='myButton' onClick={() => this.deleteItem(item.id)}>Delete</button> */}
                </div>
}
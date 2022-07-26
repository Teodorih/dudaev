import { useState, useEffect, ReactNode } from "react";
import React from 'react';

interface Person{
    id: number,
    name: string,
    date_of_birth: string
}

class PersonRow extends React.Component <{person:Person}, {}>{
    render(){
        const person = this.props.person;

        return (<tr key={person.id}>
            <td>{person.id}</td>
            <td>{person.name}</td>
            <td>{person.date_of_birth}</td>
        </tr>)
    }
}


function GetTableData(){

    let [dataTablefromHook, setDataTableHook] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:5001/table/data')
        .then(response => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
        .then(data => setDataTableHook(data))
      },[])
      console.log('test3')

      console.log(dataTablefromHook)
      return (
        <div className="data">
            {/* 5. Returning an img element for each url, again with the value of our src set to the image url */}
        
        </div>
      );
}


interface SavedOrder{
    id: string,
    name: string,
    date_of_birth:string
}

class CustomTable extends React.Component 
<{}, {error: any, isLoaded: boolean, data:any[], sorted_col: string, sorted_dict: SavedOrder}>{
    constructor(props: any){
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            sorted_col: 'id',
            sorted_dict: {
                id: 'asc',
                name: 'asc',
                date_of_birth: 'asc'
            }
        }
        this.handleSortClick = this.handleSortClick.bind(this)
    }
    handleSortClick(col: keyof SavedOrder) {
        var new_order = this.state.sorted_dict[col] === 'desc' ? 'ask' : 'desc'
        let sorted_dict = { ...this.state.sorted_dict}; //create a new copy
        sorted_dict[col] = new_order //change the value of bar
        this.setState({
            sorted_col: col,
            sorted_dict
        });

      }
    componentDidMount(){
        fetch('http://127.0.0.1:5001/table/data').then(res => res.json()).then(
            (result) => {
              this.setState({
                isLoaded: true,
                data: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }
    render(){ 
        const rows: ReactNode[] = []
        //const sorted_dict = this.state.sorted_dict
        const sorted_col = this.state.sorted_col
        const { error, isLoaded, data } = this.state;
        if(error){
            return <div> Error: {error.message}</div>
        }else if(!isLoaded){
            return <div> Loading ... </div>
        }else{
            var items = [...data];
            items = items.sort((a,b) => (a[sorted_col] > b[sorted_col]) ? 1 : ((b[sorted_col] > a[sorted_col]) ? -1 : 0))

            items.forEach((person) => {
                rows.push(<PersonRow key={person.id} person={person}/>)
            })
            return (<table>
                <thead>
                    <tr><th>id</th><th>name</th><th>date of birth</th></tr>
                    <CustomSorting 
                        onSortClick = {this.handleSortClick}
                    />                
                </thead>
                <tbody>{rows}</tbody>
            </table>)
        }
    }

}

class SortButton extends React.Component<{col: keyof SavedOrder, onSortClick: Function}>{
    constructor(props: any) {
        super(props);
        this.handleSortClick = this.handleSortClick.bind(this)
    }
    handleSortClick(e:any){
        console.log("test1", this.props.col)
        this.props.onSortClick(this.props.col);
    }
    render(){
        return <th><button onClick={this.handleSortClick}>sort</button></th>
    }
}

class CustomSorting extends React.Component<{onSortClick: Function}>{
    constructor(props:any){
        super(props)
        this.handleSortClick = this.handleSortClick.bind(this)
    }
    handleSortClick(col_type: string){
        console.log("test2", col_type)
        this.props.onSortClick(col_type);
    }    
    render(){
        return (<tr>
            <SortButton col="id" onSortClick={this.handleSortClick}/>
            <SortButton col="name" onSortClick={this.handleSortClick}/>
            <SortButton col="date_of_birth" onSortClick={this.handleSortClick}/>
        </tr>)
    }
}

class FilterableCustomTable extends React.Component{
    render(){
        return (<React.Fragment>
            <CustomTable/>
            test
            <GetTableData/>
            </React.Fragment>)
    }
}

export default FilterableCustomTable;

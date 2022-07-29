import { ReactNode } from "@mdx-js/react/lib";
import React from "react";

class NewTableFilter extends React.Component<{onFilterClick: Function, categories: string[]},{}>{
  constructor(props:any){
    super(props)
    this.handleFilterClick = this.handleFilterClick.bind(this)
  }

  handleFilterClick(e:any){
     this.props.onFilterClick(e.target)
  }


  render(): React.ReactNode {
    const data = this.props.categories;

    const inputItems:JSX.Element[] = data.map((cat) =>
      <div key={cat}><label htmlFor={"checkbox_"+cat}>{cat}</label>
      <input onClick={this.handleFilterClick} type="checkbox" id={cat}/></div>
    );
    return(inputItems)
  }
}

interface Product{
  id: number,
  name: string,
  category: string,
  sum: number
}

class NewRow extends React.Component <{product:Product}, {}>{
  render(){
      const person = this.props.product;

      return (<tr key={person.id}>
          <td>{person.id}</td>
          <td>{person.name}</td>
          <td>{person.category}</td>
          <td>{person.sum}</td>

      </tr>)
  }
}



export default class NewTable extends React.Component<{}, {error: any, isLoaded: boolean, data:any[], showCategories: string[]}>{

    constructor(props:any){
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            showCategories: []
        }
        this.handleFilterClick = this.handleFilterClick.bind(this)
    }

    componentDidMount(){
        fetch('http://127.0.0.1:5001/table/newsort').then(res => res.json()).then(
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

    handleFilterClick(target:any){
        console.log(target)
        console.log(target.checked)
        const categories = this.state.showCategories
        if(target.checked){
          if(categories.indexOf(target.id) === -1){
            categories.push(target.id)
          }
        }else{
          delete categories[categories.indexOf(target.id)]          
        }
        this.setState({showCategories:categories})
    }

    render(): React.ReactNode {
      const rows: ReactNode[] = []
      const categories: string[] = []
      //const sorted_dict = this.state.sorted_dict
      const { error, isLoaded, data, showCategories} = this.state;
      if(error){
          return <div> Error: {error.message}</div>
      }else if(!isLoaded){
          return <div> Loading ... </div>
      }else{
          var items = [...data];
          items.forEach((product) => {
              if(showCategories.indexOf(product.category) != -1){
                rows.push(<NewRow key={product.id} product={product}/>)
              }
              if (categories.indexOf(product.category) === -1) {
                categories.push(product.category)
              }
          })
          return ( <div><NewTableFilter categories={categories} onFilterClick = {this.handleFilterClick}/>   
            <table id='custom_table'>
              <thead>
                  <tr><th>id</th><th>name</th><th>category</th><th>sum</th></tr>             
              </thead>
              <tbody>{rows}</tbody>
          </table></div>)
      }
    }
}

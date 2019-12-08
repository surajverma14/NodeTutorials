import React,{Component} from 'react'

class AddNinja extends Component{

state={
    name:'',
    age:'',
    belt:''
}

handleChange=(e)=>{
    this.setState({
        [e.target.id]:e.target.value
    })
}

handleSubmit=(e)=>{
    e.preventDefault();
    this.props.addNinja(this.state)
    this.setState({
        name:'',
        age:'',
        belt:''
    })
}

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" onChange={this.handleChange} value={this.state.name}/>
                    <label htmlFor="age">Age:</label>
                    <input type="text" id="age" onChange={this.handleChange} value={this.state.age}/>
                    <label htmlFor="belt">Belt:</label>
                    <input type="text" id="belt" onChange={this.handleChange} value={this.state.belt}/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddNinja;
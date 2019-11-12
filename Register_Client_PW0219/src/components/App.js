import React from "react"
import RegisterForm from './RegisterForm'
import RegisterTable from './RegisterTable'

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            student_list:[],
            id_counter:0
        }
    }

    fetchData(){
        fetch('http://localhost:3500/register/')
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            this.setState({
                student_list:data
            })
        })
        .catch(error=>{
            console.log(error);
        });
    }
    //para el el metodo get 
    componentDidMount(){
        this.fetchData();
    }

    handleSubmit(student){
        student._id = this.state.id_counter;
        student.datetime = new Date();
        //
        const init = {
            method:"POST",
            headers:{
                "Content-type":"application/json",
                Accept: "application/json"
            },
            body:JSON.stringify({
                carnet:student.carnet,
                schedule:student.schedule,
                isLate:student.isLate
            })
        }

        fetch('http://localhost:3500/register/', init)
            .then(response=>{
                return response.json()
            })
            .then(data=>{
                console.log(data)
                this.fetchData();
            })
            .catch(e=>{
                console.log(e)
            })
    }

    handleDelete(student){
        let index = this.state.student_list.find(value=>{
            return value._id === student._id;
        })
        
        const init = {
            method:"DELETE",
            headers:{
                "Content-type":"application/json",
                Accept: "application/json"
            },
            body:JSON.stringify({
                _id:index._id
            })
        };

        fetch('http://localhost:3500/register/',init)
            .then(response=>{
                return response.json()
            })
            .then(data=>{
                console.log(data)
                this.fetchData();
            })
            .catch(e=>{
                console.log(e)
            })
    }
    
    render(){
        return (
            <div className="container" style={{"marginTop":2+"em", "marginBottom":2+"em"}}>
                <RegisterForm 
                    onSubmit = {(student)=>{
                        this.handleSubmit(student);
                    }}
                />
                <RegisterTable 
                    list={this.state.student_list}
                    onDelete={(student)=>this.handleDelete(student)}
                    />
            </div>
        );
    }
}

export default App;
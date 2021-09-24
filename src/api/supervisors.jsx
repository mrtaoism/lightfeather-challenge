import React, { Component } from 'react';

// function sortSupervisors() {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         let svp = data;
//         const sorted = [...svp].sort((a, b) => b[svp.jurisdiction] - a[svp.jurisdiction]);
//         setData(sorted);
//     });
// }


class SupervisorComponent extends Component {
    constructor(props){
        super(props);

        this.state={
            supervisor:[]
        };
    }

    componentDidMount(){
        fetch("https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers").then(res=>res.json()).then(
        result=>{
            this.setState({supervisor:result})
        })
        // sortSupervisors();
        
    }

    render() { 
        return <React.Fragment>
            {this.state.supervisor.map(svp =>(
               /^[a-zA-Z]+$/i.test(svp.jurisdiction)?
                    <option value={svp.id}>
                    {svp.jurisdiction} - {svp.lastName}, {svp.firstName}
                    </option>: null
                
                
            ))};
        </React.Fragment>
            
    }
}
 
export default SupervisorComponent;
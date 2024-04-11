// @ts-ignore
import React,{useState, useEffect} from 'react';


function AssignGroupInput(props) {
    const [selectedValue, setSelectedValue] = useState(""); // State to hold the selected value
    const [groupNumbersArr, setGroupNumbersArr] = useState([])

    
    useEffect(() => {
        let numbers = [];
        console.log(props.numberOfGroups)
        for (let i = 1; i <= props.numberOfGroups; i++) {
            numbers.push(i);
        }
        setGroupNumbersArr(numbers)
        console.log("from here")
    }, [])

    

    function handleCancel(){
        props.setAssignGroup(false)
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value); // Update selected value when dropdown changes
    }

    const handleAddToGroup = (e) => {
        e.preventDefault();
        if (props.pair !== undefined){
            props.addToGroup(selectedValue, props.pair)
            props.setAssignGroup(false)

        }
        else{
            props.addToGroup(selectedValue, [props.member]); 
            props.setAssignGroup(false)
        }
    
        
    };

    

    return (
        <div>
            <form onSubmit={handleAddToGroup}>
                <select value={selectedValue} onChange={handleChange} className="appearance-none bg-gray-200 border border-gray-400 rounded px-2 py-1 text-xs font-semibold leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="" className="bg-black text-white">Group</option>
                    {groupNumbersArr.map(number => (
                        <option key={number} value={number} className="bg-black text-white"> {number} </option>
                    ))}
                </select>
                <button type="submit" className="mt-2 px-1 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">Submit</button>
                <button type="button" className = " mt-2 px-1 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 "onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default AssignGroupInput;
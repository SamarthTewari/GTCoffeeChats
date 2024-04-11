import React, {useState,useEffect} from "react";
import axios from 'axios';

function EditHistoryPage() {
    const [editHistoryArray, setEditHistoryArray] = useState([]);

    useEffect(() => {
        async function fetchEditHistory() {
            try {
                const count = await axios.get('/countDocuments')
                console.log(count.data)
            } catch (error) {
                console.error('Error fetching edit history:', error);
            }
        }

        fetchEditHistory();
    }, []);

    return (
        <>
            <h1>Hello</h1>
            {editHistoryArray.length === 690 && <h1>No Edit History</h1>}
        </>
    );
}

export default EditHistoryPage;
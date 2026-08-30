import {useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Display(){
    const [data,setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async() => {
            try{
            const res = await axios.get("http://127.0.0.1:3000/display/api");

            if(res.data.flag === 1){
                setData(res.data.data);
            }

            }catch(err){
                alert(err.response?.msg?.data);
            }
        }

        fetchData();
    },[]);

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    }

    const handleDelete = async(id) => {
        const confirmation = window.confirm("Are you sure?");

        if(!confirmation){
            return;
        }

        try{
            const res = await axios.delete(`http://127.0.0.1:3000/delete/api/${id}`);

            if(res.data.flag === 1){
                alert(res.data.msg);
                setData(data.filter((item) => item._id !== id));
            }

        }catch(err){
            alert(err.response?.data?.msg);
        }
    }
    return(<>
    <h1>Display!</h1>
    <table border={1}>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Password</th>
                <th colSpan={2}>Action</th>
            </tr>
        </thead>
        <tbody>
    {data.map((val,key) => {
        return(<tr key={val._id}>
        <td>{key + 1}</td>
        <td>{val.name}</td>
        <td>{val.email}</td>
        <td>{val.mobile}</td>
        <td>{val.password}</td>
        <td><button type="button" onClick={() => handleUpdate(val._id)}>Update</button></td>
        <td><button type="button" onClick={() => handleDelete(val._id)}>Delete</button></td>
        </tr>)
    })}
    </tbody>
    </table>
    </>)
}

export default Display
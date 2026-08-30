import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
function Update(){
    const [data,setData] = useState({
        name:"",
        email:"",
        mobile:"",
        password:""
    });
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await axios.get(`http://127.0.0.1:3000/fetch/api/${id}`);

                if(res.data.flag === 1){
                    console.log(res.data.data);
                    setData(res.data.data);
                }
            }catch(err){
                alert(err.response?.data?.msg);
            }
        }

        fetchData();
    },[id])
    
    const handleUpdate = async(e) => {
        e.preventDefault();

        try{
            const res = await axios.put(`http://127.0.0.1:3000/update/api/${id}`,data);

            if(res.data.flag === 1){
                alert(res.data.msg);
                setData({});
                navigate('/display');
            }

        }catch(err){
            alert(err.respone?.data?.msg);
        }
    }

    return(<>
    <h1>Update Form!</h1>
    <form onSubmit={handleUpdate}>
        Name:<input type="text" name="name" value={data.name} onChange={(e) => {setData({...data,name:e.target.value})}}/><br/><br/>
        Email:<input type="email" name="email" value={data.email} onChange={(e) => {setData({...data,email:e.target.value})}}/><br/><br/>
        Mobile:<input type="text" name="mobile" value={data.mobile} onChange={(e) => {setData({...data,mobile:e.target.value})}}/><br/><br/>
        Password:<input type="password" name="password" value={data.password} onChange={(e) => {setData({...data,password:e.target.value})}}/><br/><br/>
        <button type="submit">Update Form</button>
    </form>
    </>)
}

export default Update